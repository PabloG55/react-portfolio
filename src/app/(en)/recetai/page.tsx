import { Metadata } from 'next';
import Image from 'next/image';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | recetAI',
};

export default function RecetaiPrivacy() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
            <Image
              src="/images/recetai-logo.png"
              alt="recetAI Logo"
              width={64}
              height={64}
              style={{ objectFit: 'contain', borderRadius: '14px' }}
            />
            <h1 className={styles.h1}>Privacy Policy</h1>
          </div>
          <p>Last updated: July 18, 2026</p>
        </header>

        <section>
          <p>Welcome to <strong>recetAI</strong>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share information when you use our mobile application, which lets you save cooking recipes shared from Instagram and TikTok.</p>
        </section>

        <section>
          <h2 className={styles.h2}>1. Information We Collect</h2>
          <ul className={styles.ul}>
            <li className={styles.li}><strong>Account Information:</strong> When you sign up via Supabase, we collect your email address and display name.</li>
            <li className={styles.li}><strong>Shared Content:</strong> When you share a post from Instagram or TikTok, we process the post&apos;s caption and link so we can extract a structured recipe.</li>
            <li className={styles.li}><strong>Your Recipes &amp; Content:</strong> We store the recipes, cookbooks, grocery lists, meal plans, and tags you create in the app.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.h2}>2. How We Use Your Information</h2>
          <p>We use the collected data to:</p>
          <ul className={styles.ul}>
            <li className={styles.li}>Extract structured recipes — ingredients, steps, nutrition, and tags — from the content you share.</li>
            <li className={styles.li}>Store and organize your recipes into cookbooks.</li>
            <li className={styles.li}>Generate grocery lists, meal plans, and step-by-step cook mode.</li>
            <li className={styles.li}>Sync your data across your devices.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.h2}>3. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal data. We share information only with the following services necessary for app functionality:</p>
          <ul className={styles.ul}>
            <li className={styles.li}><strong>Supabase:</strong> For secure authentication and database storage.</li>
            <li className={styles.li}><strong>OpenAI:</strong> Captions from the posts you share are sent to OpenAI (gpt-4o-mini) to generate structured recipes. This processing happens server-side through Supabase Edge Functions.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.h2}>4. Data Retention and Deletion</h2>
          <p>We retain your data as long as your account is active. You can delete your account and all associated data at any time through the &quot;Delete Account&quot; button in the Profile settings of the app. Alternatively, you can visit our <a href="/recetai/deletion" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Data Deletion Request</a> page for manual deletion options.</p>
        </section>

        <section>
          <h2 className={styles.h2}>5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p><strong>Email:</strong> pgarcesb1@gmail.com</p>
        </section>

        <footer className={styles.footer}>
          <p>&copy; 2026 PGLabs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
