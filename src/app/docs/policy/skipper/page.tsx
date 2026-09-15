import { Metadata } from 'next';
import DocPage from '../../DocPage';
import styles from '../../doc.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | Skipper Browser',
  description:
    'Privacy Policy for Skipper Browser, a private web browser with built-in content blocking for iOS and Android, published by Pablo Garces.',
};

export const dynamic = 'force-static';

export default function SkipperPrivacy() {
  return (
    <DocPage
      appName="Skipper Browser"
      title="Privacy Policy"
      lastUpdated="September 14, 2026"
      accentColor="#FF4E45"
    >
      <section>
        <p>
          <strong>Skipper Browser</strong> is a web browser with built-in content blocking, for iOS
          (bundle identifier <strong>com.pglabs.skipper</strong>) and Android (package{' '}
          <strong>com.pgarces.skipper</strong>), published by Pablo Garces. This Privacy Policy
          explains what the app does with your data.
        </p>
        <p>
          <strong>
            Skipper does not collect, transmit, or sell any personal data. There are no accounts, no
            analytics, and no tracking.
          </strong>{' '}
          What follows is the detail behind that sentence, including the one network request the app
          makes on its own behalf.
        </p>
        <p>
          For any privacy question, contact{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">
            pasebarona@gmail.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>1. Data We Collect</h2>
        <p>
          <strong>None.</strong> Skipper has no user accounts, no sign-up, and no login. It contains
          no analytics SDK, no advertising SDK, no crash-reporting service, and no tracking software
          of any kind. No usage data, device identifier, advertising identifier, or diagnostic report
          is sent anywhere.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>2. What Is Stored On Your Device</h2>
        <p>
          The app saves your settings and browsing state locally so the app works the way you left
          it. This data stays on your device, is never transmitted to us or to anyone else, and is
          removed when you delete the app.
        </p>

        <h3 className={styles.h3}>Settings and browsing state</h3>
        <p>
          Your open tabs and their addresses, your browsing profiles, the blocking and protection
          level you chose, your audio-sync preference, and your ad-skip preference.
        </p>

        <h3 className={styles.h3}>Website data</h3>
        <p>
          When you sign in to a website, that site&apos;s cookies and local storage are kept by the
          browser so you stay signed in — exactly as in Safari, Chrome, or any other browser. This
          lives in the operating system&apos;s own website-data store on your device. Skipper does
          not read it, does not copy it, and does not send it anywhere.
        </p>

        <h3 className={styles.h3}>Profiles and private mode</h3>
        <p>
          Profiles keep website data separated, so signing in to two accounts does not mix them.
          Private mode uses a non-persistent store that is discarded when you close it, keeping no
          cookies, no history and no cache.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>3. The One Network Request Skipper Makes</h2>
        <p>
          Skipper contacts exactly one service of its own accord, and only when the optional
          sponsor-segment feature is switched on: the community-run{' '}
          <strong>SponsorBlock</strong> API, which reports where sponsor reads occur in a video so
          they can be skipped.
        </p>
        <p>
          <strong>It is not told which video you are watching.</strong> The request carries only the
          first four hexadecimal characters of a SHA-256 hash of the video identifier. That prefix
          matches roughly forty different videos, and the answer covers all of them; the app then
          works out which one applies <em>on your device</em>. The service therefore cannot determine
          what you are watching. The identifier itself never leaves your device.
        </p>
        <p>
          Turn the feature off in the app&apos;s settings and no request is made at all.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>4. Content Blocking</h2>
        <p>
          Blocking uses filter lists (EasyList and EasyPrivacy) that ship inside the app. Matching
          happens entirely on your device, against rules already present in the download. No page you
          visit is sent to us or to any filter-list service in order to decide whether to block
          something.
        </p>
        <p>
          Because trackers are refused before they load, using Skipper generally means{' '}
          <em>fewer</em> third parties receive data about you than in an ordinary browser.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>5. Websites You Visit</h2>
        <p>
          Skipper is a browser, so it displays websites operated by other people. Those sites have
          their own privacy policies and their own data practices, and this policy does not cover
          them. Anything you type into a website, and any account you sign in to, is between you and
          that site.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>6. Children</h2>
        <p>
          Skipper provides unrestricted access to the open web and is rated accordingly. It is not
          directed at children, and it collects no data from anyone, including children.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>7. Security</h2>
        <p>
          Because nothing is collected or transmitted, there is no server-side store of your data to
          breach. Data on your device is protected by the operating system&apos;s own app sandbox and
          by whatever device encryption you have enabled.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>8. Your Rights</h2>
        <p>
          There is no account to delete and no data held about you to request, correct, or export.
          Deleting the app removes everything it stored. Individual profiles, along with their
          website data, can be deleted inside the app at any time.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>9. Changes</h2>
        <p>
          If the app&apos;s data handling ever changes, this page changes with it, and the date at the
          top is updated.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>10. Contact</h2>
        <p>
          <a className={styles.link} href="mailto:pasebarona@gmail.com">
            pasebarona@gmail.com
          </a>
        </p>
      </section>
    </DocPage>
  );
}
