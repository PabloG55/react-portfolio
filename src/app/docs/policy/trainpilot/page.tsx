import { Metadata } from 'next';
import DocPage from '../../DocPage';
import styles from '../../doc.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | TrainPilot',
  description:
    'Privacy Policy for TrainPilot, a running and gym training app for iOS published by Pablo Garces.',
};

export const dynamic = 'force-static';

export default function TrainPilotPrivacy() {
  return (
    <DocPage appName="TrainPilot" title="Privacy Policy" lastUpdated="September 14, 2026">
      <section>
        <p>
          <strong>TrainPilot</strong> is a running and gym training app for iOS (bundle identifier{' '}
          <strong>com.pglabs.trainpilot</strong>), published by Pablo Garces. This Privacy Policy
          explains what data the app collects, why it collects it, who it is shared with, and the
          choices you have.
        </p>
        <p>
          For any privacy question or request, contact{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">pasebarona@gmail.com</a>.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>1. Data We Collect</h2>

        <h3 className={styles.h3}>Account data</h3>
        <p>
          Your email address, display name, an optional username, and an account identifier (UUID).
          Authentication is by email and password or by a one-time code sent to your email. TrainPilot
          does not use any third-party or social login.
        </p>

        <h3 className={styles.h3}>Profile data you enter</h3>
        <p>
          Age, sex, body weight, and your preferences: distance units (km/mi), weight unit (kg/lb),
          language, voice-cue settings, auto-pause, training level, effort scale, and gym progression
          scheme.
        </p>

        <h3 className={styles.h3}>Precise location (GPS)</h3>
        <p>
          When you record an outdoor run, the app records your full GPS route — latitude, longitude,
          altitude and timestamps — <strong>including while the app is in the background or your phone
          is locked</strong>. This is used to measure distance and pace and to draw your route map.
          Background location is used <strong>only while a run is actively being recorded</strong>.
        </p>

        <h3 className={styles.h3}>Health and fitness data</h3>
        <p>
          Distance, pace, duration, heart rate, running power, cadence, running form metrics (ground
          contact time, vertical oscillation, stride length), active calories, and gym training logs
          (exercises, sets, reps, weights lifted, and personal records).
        </p>

        <h3 className={styles.h3}>Apple Health (HealthKit)</h3>
        <p>
          With your permission, TrainPilot <strong>reads</strong> completed workouts and their GPS
          routes from Apple Health so that runs recorded by other apps or watches can be imported, and{' '}
          <strong>writes</strong> your TrainPilot runs back to Apple Health as workouts. TrainPilot
          never reads Apple Health data for advertising, and never shares Apple Health data with third
          parties for advertising or data mining.
        </p>

        <h3 className={styles.h3}>Apple Watch</h3>
        <p>
          When you use the companion watch app, it streams heart rate, running power, active calories
          and running-form metrics to your phone during a workout.
        </p>

        <h3 className={styles.h3}>Bluetooth</h3>
        <p>
          The app connects to an optional heart-rate chest strap to read your heart rate. No other
          Bluetooth data is accessed.
        </p>

        <h3 className={styles.h3}>Photos</h3>
        <p>
          You may attach photos from your camera or photo library to an activity log entry or to a
          shared post. These photos are stored in the app&apos;s backend storage.
        </p>

        <h3 className={styles.h3}>Motion data</h3>
        <p>Motion data is used to measure your running cadence.</p>

        <h3 className={styles.h3}>Social features</h3>
        <p>
          Friends, friend requests, shared &quot;train together&quot; sessions, and any posts you
          choose to create.
        </p>

        <h3 className={styles.h3}>Usage and diagnostic data</h3>
        <p>In-app events and crash reports.</p>
      </section>

      <section>
        <h2 className={styles.h2}>2. Who We Share Data With</h2>
        <p>
          We do <strong>not</strong> sell your personal data. Your health and fitness data is{' '}
          <strong>not</strong> used for advertising, marketing, or data mining. We share data with the
          following services:
        </p>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <strong>Supabase</strong> — backend, authentication, database and file storage. Supabase
            hosts essentially all of the data described above and is our primary processor.
          </li>
          <li className={styles.li}>
            <strong>PostHog</strong> — product analytics. PostHog receives your account identifier{' '}
            <strong>and your email address</strong>, plus non-identifying workout summary events (for
            example: run started or completed, with distance, duration, average pace, and whether a
            planned workout was attached). Session replay is <strong>disabled</strong>. PostHog does
            not receive GPS coordinates or heart-rate data.
          </li>
          <li className={styles.li}>
            <strong>Sentry</strong> — crash and error reporting. Sentry receives your opaque account
            UUID only; no email address. Payloads are scrubbed against a deny-list covering GPS, heart
            rate, power, calories, body metrics and credentials.
          </li>
          <li className={styles.li}>
            <strong>An LLM provider (Google Gemini or OpenAI, server-side)</strong> — used to generate
            your training plans. It receives the training-relevant profile you supplied, such as your
            goal, experience level and available days. API keys are held server-side and are never
            exposed to the app.
          </li>
          <li className={styles.li}>
            <strong>RevenueCat</strong> — subscription management. RevenueCat is present in the app
            but is <strong>not currently active</strong>. The app is free at this time and no purchases
            are processed.
          </li>
          <li className={styles.li}>
            <strong>Strava</strong> — <strong>optional</strong>. Only if you explicitly connect your
            Strava account, your completed activities are uploaded there.
          </li>
          <li className={styles.li}>
            <strong>intervals.icu</strong> — <strong>optional</strong>. Only if you explicitly connect
            it.
          </li>
          <li className={styles.li}>
            <strong>Google AdMob</strong> — an advertising SDK is present in the codebase but is{' '}
            <strong>currently disabled</strong>. No ads are served and no advertising identifier is
            collected at this time.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={styles.h2}>3. Your Rights and Choices</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <strong>Delete your account and all associated data from inside the app:</strong> go to the{' '}
            <strong>Profile screen &rarr; Delete Account</strong>. This is a permanent erasure, not a
            deactivation.
          </li>
          <li className={styles.li}>
            You can export and review your data, and you can disconnect Apple Health, Strava and
            intervals.icu at any time.
          </li>
          <li className={styles.li}>
            You can revoke location, health, photo, motion, Bluetooth and notification permissions in
            iOS Settings at any time. The app degrades gracefully when a permission is withheld.
          </li>
          <li className={styles.li}>
            For any privacy request, contact{' '}
            <a className={styles.link} href="mailto:pasebarona@gmail.com">pasebarona@gmail.com</a>.
          </li>
        </ul>

        <h3 className={styles.h3}>GDPR and UK GDPR</h3>
        <p>
          If you are in the European Economic Area or the United Kingdom, our lawful basis for
          processing is <strong>performance of the contract</strong> for the core training features you
          ask us to provide, and <strong>consent</strong> for optional integrations and analytics. You
          have the rights of access, rectification, erasure, data portability, and objection. Exercise
          any of these by emailing{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">pasebarona@gmail.com</a>, or by
          deleting your account in the app.
        </p>

        <h3 className={styles.h3}>California (CCPA/CPRA)</h3>
        <p>
          We do not sell your personal information. If you are a California resident, you have the
          right to know what personal information we collect, the right to request its deletion, and
          the right not to be discriminated against for exercising these rights.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>4. Children</h2>
        <p>
          TrainPilot is not directed to children under 13 and we do not knowingly collect data from
          them.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>5. Security</h2>
        <p>
          Data is transmitted over HTTPS/TLS. Database access is protected by row-level security, so
          you can only read your own rows.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the
          top of this page reflects the current version.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>7. Contact</h2>
        <p>
          <strong>Email:</strong>{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">pasebarona@gmail.com</a>
        </p>
      </section>
    </DocPage>
  );
}
