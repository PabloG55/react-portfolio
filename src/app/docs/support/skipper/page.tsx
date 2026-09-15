import { Metadata } from 'next';
import DocPage from '../../DocPage';
import styles from '../../doc.module.css';

export const metadata: Metadata = {
  title: 'Support | Skipper Browser',
  description:
    'Support and contact information for Skipper Browser, a private web browser with built-in content blocking for iOS and Android.',
};

export const dynamic = 'force-static';

export default function SkipperSupport() {
  return (
    <DocPage appName="Skipper Browser" title="Skipper Browser Support" accentColor="#FF4E45">
      <section>
        <p>
          Skipper Browser is a web browser with built-in content blocking, for iOS and Android. Tabs,
          private browsing, separate profiles, and a player built for watching video.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>Contact</h2>
        <p>
          Email{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">
            pasebarona@gmail.com
          </a>{' '}
          with any question or bug report. We aim to reply within a few days.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>Frequently Asked Questions</h2>

        <h3 className={styles.h3}>What is &ldquo;car mode&rdquo;?</h3>
        <p>
          It is an audio/video sync correction, and the name undersells how narrow it is. Bluetooth
          and CarPlay add roughly 100&ndash;300&nbsp;ms of delay to sound and none to the screen, so
          the picture runs ahead of what you hear. Skipper holds the picture back until the sound
          catches up, using the latency your device reports plus a manual trim you can nudge yourself.
          It does not put video on a car display and has no driving-related features.
        </p>

        <h3 className={styles.h3}>What are profiles, and how are they different from private mode?</h3>
        <p>
          A profile keeps one set of website data — cookies and logins — separate from another, so
          two accounts on the same site never mix. Profiles persist until you delete them. Private
          mode is the opposite: it keeps nothing at all, and everything is discarded when you close
          it.
        </p>

        <h3 className={styles.h3}>Where did the address bar go?</h3>
        <p>
          On video sites the address bar hides so the page gets the whole screen. Pull down from the
          top of the page, or scroll up, and it comes back.
        </p>

        <h3 className={styles.h3}>How does blocking work?</h3>
        <p>
          Filter lists ship inside the app and matching happens on your device, so requests to
          trackers and ad servers are refused before they load rather than hidden after the fact. You
          can change the level, or switch it off per site, in Settings.
        </p>

        <h3 className={styles.h3}>Does Skipper collect any data about me?</h3>
        <p>
          No. There are no accounts, no analytics, and no tracking. See the{' '}
          <a className={styles.link} href="/docs/policy/skipper">
            Privacy Policy
          </a>{' '}
          for the detail, including the single optional network request the app can make and why it
          cannot identify what you are watching.
        </p>

        <h3 className={styles.h3}>How do I delete my data?</h3>
        <p>
          Delete the app. Everything it stored is local to your device and goes with it. Individual
          profiles can be deleted inside the app at any time.
        </p>
      </section>
    </DocPage>
  );
}
