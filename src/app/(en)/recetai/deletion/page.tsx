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
          <p>Last updated: November 16, 2026</p>
        </header>

        <section>
          <h2 className={styles.h2}>Delete your account in the app</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            Open recetAI, go to <strong>Profile &rarr; Delete account</strong> and confirm. Your account is
            deleted immediately.
          </p>

          <h2 className={styles.h2}>Or ask us by email</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            Email <strong>pgarcesb1@gmail.com</strong> with the subject{' '}
            <strong>&apos;Account Deletion Request&apos;</strong> from the email address you signed up with.
            We delete the account within 30 days and reply to confirm.
          </p>

          <h2 className={styles.h2}>What is deleted</h2>
          <p style={{ marginBottom: '12px' }}>Everything stored with your recetAI account:</p>
          <ul style={{ marginBottom: '20px', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
            <li>your account: email address, name and sign-in details</li>
            <li>your recipes, personal notes, ratings and cookbooks</li>
            <li>your meal plans, meal prep sessions, portions and grocery list</li>
            <li>every share link you created (they stop working)</li>
            <li>any connection to Claude you set up</li>
          </ul>

          <h2 className={styles.h2}>What is kept, and for how long</h2>
          <p style={{ marginBottom: '20px' }}>
            Nothing is kept on purpose. Copies of the deleted data can remain in our database
            provider&apos;s automatic backups until those backups expire, which happens within 30 days.
            A recipe somebody else already saved from a link you shared is their copy, and stays in their
            account.
          </p>
        </section>

        <footer className={styles.footer}>
          <p>&copy; 2026 PGLabs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
