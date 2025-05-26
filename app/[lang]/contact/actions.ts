"use server";
import { determineArchitecture, CoreArchitectureResponses } from '@/lib/architecture';
import { Resend } from 'resend';
import { redirect } from 'next/navigation';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const company = formData.get('company') as string | null;
  const preferredContact = formData.get('preferredContact') as string;
  const what = formData.get('what') as string;
  const why = formData.get('why') as string;

  const responses: CoreArchitectureResponses = {
    hasComplexDomainLogic: !!formData.get('hasComplexDomainLogic'),
    hasMultipleSystemSync: !!formData.get('hasMultipleSystemSync'),
    hasCustomWorkflows: !!formData.get('hasCustomWorkflows'),
    isEventDriven: !!formData.get('isEventDriven'),
    hasExternalSourceOfTruth: !!formData.get('hasExternalSourceOfTruth'),
    needsLocalDataStore: !!formData.get('needsLocalDataStore'),
    hasComplexDataValidation: !!formData.get('hasComplexDataValidation'),
    needsFutureIntegrations: !!formData.get('needsFutureIntegrations'),
    hasCustomIntegrations: !!formData.get('hasCustomIntegrations'),
    needsHistoricalData: !!formData.get('needsHistoricalData'),
    hasComplianceRequirements: !!formData.get('hasComplianceRequirements'),
  };

  // Run architecture analysis
  const architectureDecision = determineArchitecture(responses);

  // Send email using Resend
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'danielgene.dev@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Company:</b> ${company || ''}</p>
        <p><b>Preferred Contact:</b> ${preferredContact}</p>
        <p><b>What:</b> ${what}</p>
        <p><b>Why:</b> ${why}</p>
        <h3>Architecture Decision</h3>
        <pre>${JSON.stringify(architectureDecision, null, 2)}</pre>
      `
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

  // Redirect to show success message and pass architecture result in query param
  const encodedArch = encodeURIComponent(JSON.stringify(architectureDecision));
  redirect(`/contact?success=1&arch=${encodedArch}`);
} 