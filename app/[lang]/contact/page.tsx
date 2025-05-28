import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { getDictionary } from '../dictionaries';
import classes from './page.module.css';
import Link from 'next/link';
import { submitContactForm } from './actions';
import SubmitButton from './submit-button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.contact.title,
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  const showSuccess = resolvedSearchParams?.success === '1';
  let architectureResult = null;
  if (showSuccess && resolvedSearchParams?.arch) {
    try {
      const archParam = resolvedSearchParams.arch;
      if (typeof archParam === 'string') {
        architectureResult = JSON.parse(decodeURIComponent(archParam));
      }
    } catch {}
  }

  return (
    <div className={classes.contact}>
      <header className={classes.header}>
        <h1>{dict.contact.title}</h1>
        <p>{dict.contact.intro}</p>
      </header>
      <main className={classes.info}>
        <p>
          <span className={classes.highlight}>{dict.contact.email}</span>{' '}
          <a href='mailto:danielgene.dev@gmail.com' className={classes.link}>
            danielgene.dev@gmail.com
          </a>
        </p>
        <p>
          <span className={classes.highlight}>{dict.contact.linkedin}</span>{' '}
          <Link
            href='https://www.linkedin.com/in/danicodes01/'
            className={classes.link}
          >
            {dict.contact.linkedinLink}
          </Link>
        </p>
        <p>
          <span className={classes.highlight}>{dict.contact.github}</span>{' '}
          <Link href='https://github.com/danicodes01' className={classes.link}>
            {dict.contact.githubLink}
          </Link>
        </p>
        <p>
          <span className={classes.highlight}>{dict.contact.resume}</span>{' '}
          <Link href={`/${lang}/resume`} className={classes.link}>
            {dict.contact.resumeLink}
          </Link>
        </p>
        {showSuccess ? (
          <div className={classes.successMessage}>
            <h2>{dict.contact.successTitle}</h2>
            {architectureResult && (
              <div className={classes.architectureResult}>
                <h3>
                  {dict.contact.architectureHeading}:{' '}
                  {architectureResult.architecture}
                </h3>
                {architectureResult.platform && (
                  <p>
                    {dict.contact.platform}: {architectureResult.platform}
                  </p>
                )}
                <p>
                  {dict.contact.confidence}:{' '}
                  {architectureResult.confidence === 'High'
                    ? dict.contact.confidenceHigh
                    : architectureResult.confidence === 'Medium'
                    ? dict.contact.confidenceMedium
                    : dict.contact.confidenceLow}
                </p>
                {architectureResult.techStack &&
                  architectureResult.techStack.length > 0 && (
                    <div className={classes.techStackSection}>
                      <p>{dict.contact.techStack}:</p>
                      <div className={classes.techStack}>
                        {architectureResult.techStack.map(
                          (tech: string, idx: number) => (
                            <span key={idx} className={classes.techBadge}>
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                <ul>
                  {architectureResult.reasons.map(
                    (reason: string, idx: number) => (
                      <li key={idx}>
                      {(dict.architectureBullets as Record<string, string>)[reason] || reason}
                    </li>
                    ),
                  )}
                </ul>
                {architectureResult.complexityScore !== undefined && (
                  <p>
                    {dict.contact.complexityScore}:{' '}
                    {architectureResult.complexityScore}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <form
            action={submitContactForm}
            className={classes.form}
            style={{ marginTop: '2rem' }}
          >
            {/* Add this line */}
            <input type='hidden' name='lang' value={lang} />

            <label htmlFor='name' className={classes.label}>
              {dict.contact.nameLabel}
            </label>
            <input id='name' name='name' required className={classes.input} />

            <label htmlFor='company' className={classes.label}>
              {dict.contact.companyLabel}
            </label>
            <input id='company' name='company' className={classes.input} />

            <label htmlFor='preferredContact' className={classes.label}>
              {dict.contact.preferredContactLabel}
            </label>
            <input
              id='preferredContact'
              name='preferredContact'
              required
              className={classes.input}
            />

            <label htmlFor='what' className={classes.label}>
              {dict.contact.whatLabel}
            </label>
            <textarea
              id='what'
              name='what'
              required
              className={classes.textarea}
              rows={2}
            />

            <label htmlFor='why' className={classes.label}>
              {dict.contact.whyLabel}
            </label>
            <textarea
              id='why'
              name='why'
              required
              className={classes.textarea}
              rows={2}
            />

            <fieldset
              className={classes.architectureSection}
              style={{ marginTop: '1.5rem' }}
            >
              <div className={classes.legend}>{dict.contact.architectureSectionLegend}</div>

              {/* Business Requirements */}
              <details className={classes.questionGroup}>
                <summary className={classes.groupHeader}>
                  {dict.contact.businessRequirementsGroup}
                </summary>
                <div className={classes.architectureQuestions}>
                  <label>
                    <input type='checkbox' name='hasComplexDomainLogic' />{' '}
                    {dict.contact.archQ1}
                  </label>
                  <label>
                    <input type='checkbox' name='hasMultipleSystemSync' />{' '}
                    {dict.contact.archQ2}
                  </label>
                  <label>
                    <input type='checkbox' name='hasCustomWorkflows' />{' '}
                    {dict.contact.archQ3}
                  </label>
                  <label>
                    <input type='checkbox' name='isEventDriven' />{' '}
                    {dict.contact.archQ4}
                  </label>
                  <label>
                    <input type='checkbox' name='hasExternalSourceOfTruth' />{' '}
                    {dict.contact.archQ5}
                  </label>
                  <label>
                    <input type='checkbox' name='hasComplexDataValidation' />{' '}
                    {dict.contact.archQ6}
                  </label>
                  <label>
                    <input type='checkbox' name='needsFutureIntegrations' />{' '}
                    {dict.contact.archQ7}
                  </label>
                  <label>
                    <input type='checkbox' name='needsMaintainability' />{' '}
                    {dict.contact.archQ8}
                  </label>
                </div>
              </details>

              {/* Platform Type */}
              <details className={classes.questionGroup}>
                <summary className={classes.groupHeader}>
                  {dict.contact.platformGroup}
                </summary>
                <div className={classes.architectureQuestions}>
                  <label>
                    <input type='checkbox' name='isWebsite' />{' '}
                    {dict.contact.archQ9}
                  </label>
                  <label>
                    <input type='checkbox' name='isMobileApp' />{' '}
                    {dict.contact.archQ10}
                  </label>
                  <label>
                    <input type='checkbox' name='needsCrossPlatform' />{' '}
                    {dict.contact.archQ11}
                  </label>
                </div>
              </details>

              {/* User Experience */}
              <details className={classes.questionGroup}>
                <summary className={classes.groupHeader}>
                  {dict.contact.userExperienceGroup}
                </summary>
                <div className={classes.architectureQuestions}>
                  <label>
                    <input type='checkbox' name='needsOfflineSupport' />{' '}
                    {dict.contact.archQ12}
                  </label>
                  <label>
                    <input type='checkbox' name='hasRealtimeFeatures' />{' '}
                    {dict.contact.archQ13}
                  </label>
                </div>
              </details>

              {/* Scale */}
              <details className={classes.questionGroup}>
                <summary className={classes.groupHeader}>
                  {dict.contact.scaleGroup}
                </summary>
                <div className={classes.architectureQuestions}>
                  <label>
                    <input type='checkbox' name='expectsHighTraffic' />{' '}
                    {dict.contact.archQ14}
                  </label>
                  <label>
                    <input type='checkbox' name='hasLargeDatasets' />{' '}
                    {dict.contact.archQ15}
                  </label>
                  <label>
                    <input type='checkbox' name='hasGlobalUsers' />{' '}
                    {dict.contact.archQ16}
                  </label>
                </div>
              </details>

              {/* Development */}
              <details className={classes.questionGroup}>
                <summary className={classes.groupHeader}>
                  {dict.contact.developmentGroup}
                </summary>
                <div className={classes.architectureQuestions}>
                  <label>
                    <input type='checkbox' name='hasSmallTeam' />{' '}
                    {dict.contact.archQ17}
                  </label>
                  <label>
                    <input type='checkbox' name='needsRapidDevelopment' />{' '}
                    {dict.contact.archQ18}
                  </label>
                </div>
              </details>
            </fieldset>

            <SubmitButton submittingText={dict.contact.submittingButton}>
              {dict.contact.submitButton}
            </SubmitButton>
          </form>
        )}
      </main>
    </div>
  );
}
