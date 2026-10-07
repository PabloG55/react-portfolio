import type { Metadata } from 'next';
import DocPage from '../../DocPage';
import styles from '../../doc.module.css';

export const metadata: Metadata = {
  title: 'Delete Your Account | TrainPilot',
  alternates: { canonical: 'https://trainpilot.pablogarces.dev/delete-account' },
  description: 'Request permanent deletion of your TrainPilot account and account-linked data without reinstalling the app.',
};

export const dynamic = 'force-static';

const requestEmail = 'mailto:pasebarona@gmail.com?subject=TrainPilot%20account%20deletion%20request&body=Please%20delete%20my%20TrainPilot%20account%20and%20associated%20account%20data.%20I%20am%20sending%20this%20request%20from%20the%20email%20address%20registered%20with%20my%20account.';

export default function TrainPilotAccountDeletion() {
  return (
    <DocPage appName="TrainPilot" title="Delete Your TrainPilot Account" lastUpdated="October 7, 2026">
      <section className={styles.requestPanel}>
        <p>
          You can request permanent deletion of your <strong>TrainPilot</strong> account and
          account-linked data by email. You do not need to reinstall the app or sign in to this page.
        </p>
        <a className={styles.requestAction} href={requestEmail}>Request account deletion by email</a>
        <p>
          Send your request to{' '}
          <a className={styles.link} href={requestEmail}>pasebarona@gmail.com</a>{' '}
          with the subject <strong>TrainPilot account deletion request</strong>.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>How to request deletion</h2>
        <ol className={styles.ol}>
          <li className={styles.li}>Send the request from the email address registered with your TrainPilot account.</li>
          <li className={styles.li}>State that you want your TrainPilot account and account-linked data permanently deleted.</li>
          <li className={styles.li}>We must verify your identity before deleting the account. If clarification is needed, we will reply to your request.</li>
        </ol>
        <p>
          <strong>Never send your password, one-time sign-in code, payment details, or private
          authentication keys.</strong> Account deletion is permanent and cannot be undone.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>Delete your account inside the app</h2>
        <p>If you still have the app, go to <strong>Profile &rarr; Delete Account</strong> and confirm the deletion.</p>
      </section>

      <section>
        <h2 className={styles.h2}>Account-linked data deleted</h2>
        <ul className={styles.ul}>
          <li className={styles.li}><strong>Account and profile:</strong> your sign-in account, profile information, and preferences.</li>
          <li className={styles.li}><strong>Training plans:</strong> your running and gym plans and their account-linked completion records.</li>
          <li className={styles.li}><strong>Workout history:</strong> running and gym history, saved GPS routes and workout measurements, logged exercises, sets, repetitions and weights, and personal records.</li>
          <li className={styles.li}><strong>Social records:</strong> account-linked friendships, friend requests, and shared-session ownership and membership records.</li>
        </ul>
      </section>

      <section>
        <h2 className={styles.h2}>Data handled separately</h2>
        <p>The in-app account-deletion operation does not automatically erase every record stored outside the account database:</p>
        <ul className={styles.ul}>
          <li className={styles.li}><strong>Uploaded files:</strong> activity photos and avatar files stored separately may require additional cleanup.</li>
          <li className={styles.li}><strong>Diagnostic records:</strong> the account link is removed when the account is deleted, but the diagnostic records themselves may remain.</li>
          <li className={styles.li}><strong>Analytics, error reports, and backups:</strong> deleting the account does not automatically erase records held by PostHog, Sentry, or existing backups. Include these in your email request so their handling can be reviewed.</li>
          <li className={styles.li}><strong>Exported activities:</strong> workouts already copied to Apple Health, Strava, or intervals.icu are not removed by deleting your TrainPilot account. Manage those copies in the respective service.</li>
        </ul>
      </section>

      <section>
        <h2 className={styles.h2}>Retention and request processing</h2>
        {/* Do not invent fixed retention periods or processing deadlines; the owner has not supplied them. */}
        <p>
          After verifying your identity, we will explain the processing of your request. If any
          data is retained, the response will identify the data, the reason it is kept, and the
          applicable retention period. Account deletion does not imply immediate deletion from
          third-party analytics systems or backups.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>Privacy and support</h2>
        <p>Read the <a className={styles.link} href="https://trainpilot.pablogarces.dev/privacy">TrainPilot Privacy Policy</a> or visit <a className={styles.link} href="https://trainpilot.pablogarces.dev/support">TrainPilot Support</a>.</p>
      </section>
    </DocPage>
  );
}
