import { Metadata } from 'next';
import Image from 'next/image';
import styles from '../privacy.module.css';

export const metadata: Metadata = {
  title: 'Data Deletion Request | recetAI',
};

export default function RecetaiDeletion() {
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
            <h1 className={styles.h1}>Data Deletion Request</h1>
          </div>
          <p>Last updated: July 18, 2026</p>
        </header>

        <section>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            To request deletion of your recetAI account and all associated data, please email <strong>pgarcesb1@gmail.com</strong> with the subject <strong>&apos;Account Deletion Request&apos;</strong> from the email address associated with your account.
          </p>
          <p style={{ fontSize: '1.1rem' }}>
            Alternatively, you can instantly delete your account inside the app by going to <strong>Profile -&gt; Delete Account</strong>.
          </p>
        </section>

        <footer className={styles.footer}>
          <p>&copy; 2026 PGLabs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
