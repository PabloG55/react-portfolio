import { Metadata } from 'next';
import DocPage from '../../DocPage';
import styles from '../../doc.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service | TrainPilot',
  alternates: { canonical: 'https://trainpilot.pablogarces.dev/terms' },
  description:
    'Terms of Service for TrainPilot, a running and gym training app for iOS and Android published by Pablo Garces.',
};

export const dynamic = 'force-static';

export default function TrainPilotTerms() {
  return (
    <DocPage appName="TrainPilot" title="Terms of Service" lastUpdated="November 12, 2026">
      <section>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of{' '}
          <strong>TrainPilot</strong> (application identifier{' '}
          <strong>com.pglabs.trainpilot</strong>), a running and gym training app for iOS
          published by Pablo Garces (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By
          downloading, installing, or using TrainPilot, you agree to these Terms. If you do not
          agree, do not use the app.
        </p>
        <p>
          Our{' '}
          <a className={styles.link} href="https://pablogarces.vercel.app/docs/policy/trainpilot">
            Privacy Policy
          </a>{' '}
          explains how we collect and use your data and is incorporated into these Terms by
          reference.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>1. Eligibility</h2>
        <p>
          TrainPilot is intended for users aged 16 and older. By using the app you confirm that
          you are at least 16 years old.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>2. Pricing, Free Access, and Future Changes</h2>
        <p>
          TrainPilot is currently offered <strong>free of charge</strong> during an introductory
          launch period. All features are unlocked at no cost during this period.
        </p>
        <p>
          <strong>
            Free access during the introductory period does not create an entitlement to
            continued free access.
          </strong>{' '}
          We reserve the right to introduce paid subscription tiers, in-app purchases, advertising,
          or other monetization at any time.
        </p>
        <p>When we introduce paid features:</p>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <strong>You will never be charged without your explicit consent.</strong> Any purchase
            or subscription requires your affirmative action through the App Store payment flow
            (e.g., Face ID, Touch ID, or password confirmation).
          </li>
          <li className={styles.li}>
            We will make reasonable efforts to notify you in advance of material pricing changes,
            including through in-app notices or push notifications.
          </li>
          <li className={styles.li}>
            Some features that are currently free may move behind a paid tier. Core functionality
            may remain available for free, but we do not guarantee that any specific feature will
            remain free indefinitely.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={styles.h2}>3. Subscriptions and Billing</h2>
        <p>
          If and when subscriptions are offered, they will be processed through Apple&apos;s
          App Store in-app purchase system. The following will apply:
        </p>
        <ul className={styles.ul}>
          <li className={styles.li}>
            Subscription prices, durations, and renewal terms will be clearly displayed before
            you subscribe.
          </li>
          <li className={styles.li}>
            Payment will be charged to your Apple ID account upon confirmation of purchase.
          </li>
          <li className={styles.li}>
            Subscriptions auto-renew unless you cancel at least 24 hours before the end of the
            current billing period.
          </li>
          <li className={styles.li}>
            You can manage or cancel subscriptions in your Apple ID account settings at any time.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={styles.h2}>4. Your Account</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and
          for all activity that occurs under your account. You may delete your account at any time
          from <strong>Profile &rarr; Delete Account</strong> inside the app, or by emailing{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">pasebarona@gmail.com</a>.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>5. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className={styles.ul}>
          <li className={styles.li}>
            Use TrainPilot for any unlawful purpose or in violation of any applicable law.
          </li>
          <li className={styles.li}>
            Reverse-engineer, decompile, or disassemble the app, except as permitted by law.
          </li>
          <li className={styles.li}>
            Attempt to gain unauthorized access to our servers, databases, or other
            users&apos; accounts.
          </li>
          <li className={styles.li}>
            Use the app to harass, abuse, or harm others through social features.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={styles.h2}>6. AI-Generated Training Plans</h2>
        <p>
          TrainPilot uses artificial intelligence to generate running and gym training plans.
          These plans are provided for <strong>informational and general fitness purposes
          only</strong> and do not constitute medical advice, professional coaching, or a
          substitute for consultation with a qualified healthcare provider or certified trainer.
        </p>
        <p>
          You use AI-generated plans at your own risk. Always consult a physician before starting
          any new exercise program, especially if you have pre-existing health conditions.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>7. Intellectual Property</h2>
        <p>
          TrainPilot, including its design, code, content, and branding, is owned by Pablo Garces
          and protected by applicable intellectual property laws. These Terms do not grant you any
          rights to our trademarks, logos, or other brand features.
        </p>
        <p>
          Content you create within the app (workout logs, photos, posts) remains yours. By using
          social and sharing features, you grant us a limited license to display and transmit that
          content as necessary to provide the service.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>8. Third-Party Services</h2>
        <p>
          TrainPilot integrates with optional third-party services including Strava, Apple Health,
          and intervals.icu. Your use of those services is governed by their own terms and privacy
          policies. We are not responsible for the availability or conduct of third-party services.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>9. Disclaimers</h2>
        <p>
          TrainPilot is provided <strong>&quot;as is&quot;</strong> and{' '}
          <strong>&quot;as available&quot;</strong> without warranties of any kind, whether express
          or implied, including but not limited to implied warranties of merchantability, fitness
          for a particular purpose, and non-infringement.
        </p>
        <p>
          We do not guarantee that the app will be uninterrupted, error-free, or free of harmful
          components. GPS accuracy, heart rate readings, calorie estimates, and pace calculations
          are approximations and should not be relied upon for medical or safety-critical decisions.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>10. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Pablo Garces and PGLabs shall not be
          liable for any indirect, incidental, special, consequential, or punitive damages, or any
          loss of profits or revenues, whether incurred directly or indirectly, or any loss of
          data, use, goodwill, or other intangible losses resulting from your use of TrainPilot.
        </p>
        <p>
          Our total aggregate liability for any claims arising from or related to these Terms or
          the app shall not exceed the amount you have paid us in the twelve (12) months preceding
          the claim, or fifty US dollars (US $50), whichever is greater.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>11. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Pablo Garces and PGLabs from any claims,
          damages, losses, or expenses (including reasonable attorney&apos;s fees) arising from
          your use of TrainPilot or your violation of these Terms.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>12. Termination</h2>
        <p>
          We may suspend or terminate your access to TrainPilot at any time for conduct that we
          believe violates these Terms or is harmful to other users or us. You may stop using the
          app and delete your account at any time.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>13. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. When we make material changes, we will
          update the &quot;Last updated&quot; date at the top of this page and make reasonable
          efforts to notify you through the app. Your continued use of TrainPilot after any
          changes constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>14. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State
          of Florida, United States, without regard to its conflict-of-law provisions. Any disputes
          arising from these Terms or your use of TrainPilot shall be resolved in the courts
          located in Miami-Dade County, Florida.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>15. Contact</h2>
        <p>
          If you have questions about these Terms, contact us at{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">pasebarona@gmail.com</a>.
        </p>
      </section>
    </DocPage>
  );
}
