import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { getDictionary } from "../dictionaries"; 
import classes from "./page.module.css";
import Link from "next/link";
import { revalidatePath } from 'next/cache';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { determineArchitecture, CoreArchitectureResponses } from '@/lib/architecture';
import { cookies as getCookies } from 'next/headers';
import { Resend } from 'resend';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.contact.title,
  };
}


export async function submitContactForm(formData: FormData) {
  'use server';
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
    throw error; // Re-throw to handle in the UI
  }

  const encodedArch = encodeURIComponent(JSON.stringify(architectureDecision));
  redirect(`/contact?success=1&arch=${encodedArch}`);
}

export default async function ContactPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const showSuccess = (await searchParams)?.success === '1';
  let architectureResult = null;
  if (showSuccess && (await searchParams)?.arch) {
    try {
      const archParam = (await searchParams)!.arch;
      if (typeof archParam === 'string') {
        architectureResult = JSON.parse(decodeURIComponent(archParam));
      }
    } catch {}
  }

  return (
    <div className={classes.contact}>
      <header className={classes.header}>
        <h1>{dict.contact.title}</h1>
        <p>
          {dict.contact.intro}
        </p>
      </header>
      <main className={classes.info}>
        <p><span className={classes.highlight}>{dict.contact.email}</span>{" "}
          <a href="mailto:danielgene.dev@gmail.com" className={classes.link}>
            danielgene.dev@gmail.com
          </a>
        </p>
        <p><span className={classes.highlight}>{dict.contact.linkedin}</span>{" "}
          <Link href="https://www.linkedin.com/in/danicodes01/" className={classes.link}>
            {dict.contact.linkedinLink}
          </Link>
        </p>
        <p><span className={classes.highlight}>{dict.contact.github}</span>{" "}
          <Link href="https://github.com/danicodes01" className={classes.link}>
            {dict.contact.githubLink}
          </Link>
        </p>
        <p><span className={classes.highlight}>{dict.contact.resume}</span>{" "}
          <Link href={`/${lang}/resume`} className={classes.link}>
            {dict.contact.resumeLink}
          </Link>
        </p>
        {showSuccess ? (
          <div className={classes.successMessage}>
            <h2>{dict.contact.successTitle}</h2>
            {architectureResult && (
              <div className={classes.architectureResult}>
                <h3>{dict.contact.architectureHeading}: {architectureResult.architecture}</h3>
                <p>{dict.contact.confidence}: {architectureResult.confidence}</p>
                <ul>
                  {architectureResult.reasons.map((reason: string, idx: number) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
                {architectureResult.complexityScore !== undefined && (
                  <p>{dict.contact.complexityScore}: {architectureResult.complexityScore}</p>
                )}
              </div>
            )}
          </div>
        ) : (
        <form action={submitContactForm} className={classes.form} style={{marginTop: '2rem'}}>
          <label htmlFor="name" className={classes.label}>{dict.contact.nameLabel}</label>
          <input id="name" name="name" required className={classes.input} />

          <label htmlFor="company" className={classes.label}>{dict.contact.companyLabel}</label>
          <input id="company" name="company" className={classes.input} />

          <label htmlFor="preferredContact" className={classes.label}>{dict.contact.preferredContactLabel}</label>
          <input id="preferredContact" name="preferredContact" required className={classes.input} />

          <label htmlFor="what" className={classes.label}>{dict.contact.whatLabel}</label>
          <textarea id="what" name="what" required className={classes.textarea} rows={2} />

          <label htmlFor="why" className={classes.label}>{dict.contact.whyLabel}</label>
          <textarea id="why" name="why" required className={classes.textarea} rows={2} />

          <fieldset className={classes.architectureSection} style={{marginTop: '1.5rem'}}>
            <legend>{dict.contact.architectureSectionLegend}</legend>
            <div className={classes.architectureQuestions}>
              <label><input type="checkbox" name="hasComplexDomainLogic" /> {dict.contact.archQ1}</label>
              <label><input type="checkbox" name="hasMultipleSystemSync" /> {dict.contact.archQ2}</label>
              <label><input type="checkbox" name="hasCustomWorkflows" /> {dict.contact.archQ3}</label>
              <label><input type="checkbox" name="isEventDriven" /> {dict.contact.archQ4}</label>
              <label><input type="checkbox" name="hasExternalSourceOfTruth" /> {dict.contact.archQ5}</label>
              <label><input type="checkbox" name="needsLocalDataStore" /> {dict.contact.archQ6}</label>
              <label><input type="checkbox" name="hasComplexDataValidation" /> {dict.contact.archQ7}</label>
              <label><input type="checkbox" name="needsFutureIntegrations" /> {dict.contact.archQ8}</label>
              <label><input type="checkbox" name="hasCustomIntegrations" /> {dict.contact.archQ9}</label>
              <label><input type="checkbox" name="needsHistoricalData" /> {dict.contact.archQ10}</label>
              <label><input type="checkbox" name="hasComplianceRequirements" /> {dict.contact.archQ11}</label>
            </div>
          </fieldset>

          <button type="submit" className={classes.button}>{dict.contact.submitButton}</button>
        </form>
        )}
      </main>
    </div>
  );
}