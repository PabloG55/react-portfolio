import type { Metadata } from 'next';
import DocPage from '../docs/DocPage';
import styles from '../docs/doc.module.css';

export const metadata: Metadata = {
  title: 'TrainPilot | Running and Gym Training',
  description: 'Running plans, live coaching, and gym progression. TrainPilot support and privacy information.',
  alternates: { canonical: 'https://trainpilot.pablogarces.dev' },
};

export const dynamic = 'force-static';

export default function TrainPilotHome() {
  return (
    <DocPage appName="TrainPilot" title="TrainPilot" logoSrc="/images/trainpilot-icon.webp">
      <section>
        <h2 className={styles.h2}>Running plans and gym progression</h2>
        <p>
          Plan your runs, follow live coaching cues, and track your lifting. TrainPilot brings
          running and gym training into one app, with an Apple Watch companion.
        </p>
        <a className={styles.requestAction} href="https://apps.apple.com/us/app/trainpilot/id6788894342" target="_blank" rel="noopener noreferrer">Get TrainPilot on the App Store</a>
      </section>
      <section>
        <h2 className={styles.h2}>Help and privacy</h2>
        <ul className={styles.ul}>
          <li className={styles.li}><a className={styles.link} href="https://trainpilot.pablogarces.dev/support">TrainPilot Support</a></li>
          <li className={styles.li}><a className={styles.link} href="https://trainpilot.pablogarces.dev/privacy">Privacy Policy</a></li>
        </ul>
        <p>Questions? Email <a className={styles.link} href="mailto:pasebarona@gmail.com">pasebarona@gmail.com</a>.</p>
      </section>
      <section>
        <p><a className={styles.link} href="https://pablogarces.dev">Pablo Garces</a> &middot; Software engineer and TrainPilot developer.</p>
      </section>
    </DocPage>
  );
}
