import Image from 'next/image';
import styles from './doc.module.css';

type DocPageProps = {
  /** Display name of the app the document belongs to, e.g. "TrainPilot". */
  appName: string;
  /** Document title, e.g. "Privacy Policy" or "Support". */
  title: string;
  /** Human-readable date shown under the title. Omitted on pages that don't need one. */
  lastUpdated?: string;
  /** Brand accent used for the H1. Defaults to the site primary. */
  accentColor?: string;
  /** Optional logo in /public/images. Omitted when the app has no asset yet. */
  logoSrc?: string;
  children: React.ReactNode;
};

/**
 * Shared shell for the static app documents under /docs (policy, support, ...)
 * so every app renders with the same layout. Add a new one by creating
 * src/app/docs/<kind>/<app>/page.tsx and wrapping its content in this.
 */
export default function DocPage({
  appName,
  title,
  lastUpdated,
  accentColor = '#3b82f6',
  logoSrc,
  children,
}: DocPageProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
            {logoSrc && (
              <Image
                src={logoSrc}
                alt={`${appName} Logo`}
                width={64}
                height={64}
                style={{ objectFit: 'contain', borderRadius: '14px' }}
              />
            )}
            <h1 className={styles.h1} style={{ color: accentColor }}>{title}</h1>
          </div>
          <p><strong>{appName}</strong></p>
          {lastUpdated && <p>Last updated: {lastUpdated}</p>}
        </header>

        {children}

        <footer className={styles.footer}>
          <p>&copy; 2026 PGLabs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
