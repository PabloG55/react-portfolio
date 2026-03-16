import { Metadata } from 'next';
import Image from 'next/image';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | PacePilot',
};

export default function PacePilotPrivacy() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
            <Image
              src="/images/pacepilot-logo.png"
              alt="PacePilot Logo"
              width={64}
              height={64}
              style={{ objectFit: 'contain' }}
            />
            <h1 className={styles.h1}>Privacy Policy</h1>
          </div>
          <p>Last updated: March 16, 2026</p>
        </header>

        <section>
          <p>Welcome to <strong>PacePilot</strong>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share information when you use our mobile application.</p>
        </section>

        <section>
          <h2 className={styles.h2}>1. Information We Collect</h2>
          <ul className={styles.ul}>
            <li className={styles.li}><strong>Account Information:</strong> When you sign up via Supabase, we collect your email address and display name.</li>
            <li className={styles.li}><strong>Location Data:</strong> To track your runs and provide real-time coaching, we collect precise GPS location data. This data is collected only while the app is actively tracking a workout.</li>
            <li className={styles.li}><strong>Fitness Data:</strong> We collect workout statistics such as distance, duration, heart rate (if a monitor is connected), and pace.</li>
            <li className={styles.li}><strong>Third-Party Data:</strong> If you connect your Strava account, we receive authorization tokens to upload your workouts to your Strava profile.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.h2}>2. How We Use Your Information</h2>
          <p>We use the collected data to:</p>
          <ul className={styles.ul}>
            <li className={styles.li}>Provide AI-generated running plans.</li>
            <li className={styles.li}>Display your workout history and performance analytics.</li>
            <li className={styles.li}>Sync your activities with Strava.</li>
            <li className={styles.li}>Show personalized advertisements via Google AdMob.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.h2}>3. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal data. We share information only with the following services necessary for app functionality:</p>
          <ul className={styles.ul}>
            <li className={styles.li}><strong>Supabase:</strong> For secure authentication and database storage.</li>
            <li className={styles.li}><strong>Strava:</strong> Only if you explicitly choose to connect and sync your runs.</li>
            <li className={styles.li}><strong>Google AdMob:</strong> To serve advertisements within the app.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.h2}>4. Data Retention and Deletion</h2>
          <p>We retain your data as long as your account is active. You can delete your account and all associated data at any time through the &quot;Delete Account&quot; button in the Profile settings of the app. Alternatively, you can visit our <a href="/pacepilot/deletion" style={{ color: '#00D1FF', textDecoration: 'underline' }}>Data Deletion Request</a> page for manual deletion options.</p>
        </section>

        <section>
          <h2 className={styles.h2}>5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p><strong>Email:</strong> support@pglabs.com</p>
        </section>

        <footer className={styles.footer}>
          <p>&copy; 2026 PGLabs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
