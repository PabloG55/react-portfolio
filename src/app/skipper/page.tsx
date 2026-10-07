import type { Metadata } from 'next';
import DocPage from '../docs/DocPage';
import styles from '../docs/doc.module.css';

export const metadata: Metadata = {
  title: 'Skipper | Video Browser',
  description: 'A video browser with built-in ad blocking, automatic skipping of supported video ads, personal libraries, and separate profiles.',
  alternates: { canonical: 'https://skipper.pablogarces.dev' },
};

export const dynamic = 'force-static';

export default function SkipperHome() {
  return (
    <DocPage appName="Skipper" title="Skipper" logoSrc="/images/skipper-icon.webp" accentColor="#FF4E45">
      <section>
        <h2 className={styles.h2}>Watch videos with fewer ads</h2>
        <p>
          Skipper blocks ads and trackers by default and automatically skips supported video ads.
          Save videos to your library, build a queue, and continue where you left off.
          Separate profiles keep your libraries and website sign-ins apart.
        </p>
      </section>
      <section>
        <h2 className={styles.h2}>Help and privacy</h2>
        <ul className={styles.ul}>
          <li className={styles.li}><a className={styles.link} href="https://skipper.pablogarces.dev/support">Skipper Support</a></li>
          <li className={styles.li}><a className={styles.link} href="https://skipper.pablogarces.dev/privacy">Privacy Policy</a></li>
        </ul>
        <p>Questions? Email <a className={styles.link} href="mailto:pasebarona@gmail.com">pasebarona@gmail.com</a>.</p>
      </section>
      <section>
        <p><a className={styles.link} href="https://pablogarces.dev">Pablo Garces</a> &middot; Software engineer and Skipper developer.</p>
      </section>
    </DocPage>
  );
}
