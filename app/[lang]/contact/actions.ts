'use server';
import {
  determineArchitecture,
  CoreArchitectureResponses,
} from '@/lib/architecture';
import { Resend } from 'resend';
import { redirect } from 'next/navigation';

export async function submitContactForm(formData: FormData) {
  const lang = (formData.get('lang') as string) || 'en';

  const name = formData.get('name') as string;
  const company = formData.get('company') as string | null;
  const preferredContact = formData.get('preferredContact') as string;
  const what = formData.get('what') as string;
  const why = formData.get('why') as string;

  const responses: CoreArchitectureResponses = {
    // Core Business Requirements (8 questions)
    hasComplexDomainLogic: !!formData.get('hasComplexDomainLogic'),
    hasMultipleSystemSync: !!formData.get('hasMultipleSystemSync'),
    hasCustomWorkflows: !!formData.get('hasCustomWorkflows'),
    isEventDriven: !!formData.get('isEventDriven'),
    hasExternalSourceOfTruth: !!formData.get('hasExternalSourceOfTruth'),
    hasComplexDataValidation: !!formData.get('hasComplexDataValidation'),
    needsFutureIntegrations: !!formData.get('needsFutureIntegrations'),
    needsMaintainability: !!formData.get('needsMaintainability'),

    // Platform (3 questions)
    isMobileApp: !!formData.get('isMobileApp'),
    needsCrossPlatform: !!formData.get('needsCrossPlatform'),
    isWebsite: !!formData.get('isWebsite'),

    // Scale (3 questions)
    expectsHighTraffic: !!formData.get('expectsHighTraffic'),
    hasLargeDatasets: !!formData.get('hasLargeDatasets'),
    hasGlobalUsers: !!formData.get('hasGlobalUsers'),

    // User Experience (2 questions)
    needsOfflineSupport: !!formData.get('needsOfflineSupport'),
    hasRealtimeFeatures: !!formData.get('hasRealtimeFeatures'),

    // Development (2 questions)
    hasSmallTeam: !!formData.get('hasSmallTeam'),
    needsRapidDevelopment: !!formData.get('needsRapidDevelopment'),
  };

  // Run architecture analysis
  const architectureDecision = determineArchitecture(responses);

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'danielgene.dev@gmail.com',
      subject: 'New Architecture Analysis Submission',
      html: `
        <h2>Architecture Analysis Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Company:</b> ${company || ''}</p>
        <p><b>Preferred Contact:</b> ${preferredContact}</p>
        <p><b>What:</b> ${what}</p>
        <p><b>Why:</b> ${why}</p>
        
        <h3>Architecture Recommendation</h3>
        <p><b>Architecture:</b> ${architectureDecision.architecture}</p>
        <p><b>Platform:</b> ${architectureDecision.platform}</p>
        <p><b>Confidence:</b> ${architectureDecision.confidence}</p>
        
        <h4>Tech Stack:</h4>
        <ul>
          ${
            architectureDecision.techStack
              ?.map(tech => `<li>${tech}</li>`)
              .join('') || '<li>Not specified</li>'
          }
        </ul>
        
        <h4>Reasons:</h4>
        <ul>
          ${architectureDecision.reasons
            .map(reason => `<li>${reason}</li>`)
            .join('')}
        </ul>
        
        <h4>Complexity Score:</h4>
        <p>${architectureDecision.complexityScore || 'Not calculated'}</p>
        
        <h4>Full Response Data:</h4>
        <pre>${JSON.stringify(responses, null, 2)}</pre>
      `,
    });
    console.log('Resend email result:', result);
    if (result.error) {
      console.error('Resend email error:', result.error);
      throw new Error(`Failed to send email: ${result.error.message}`);
    }
  } catch (error) {
    console.error('Resend email error:', error);
    throw error;
  }

  const encodedArch = encodeURIComponent(JSON.stringify(architectureDecision));
  redirect(`/${lang}/contact?success=1&arch=${encodedArch}`);
}
