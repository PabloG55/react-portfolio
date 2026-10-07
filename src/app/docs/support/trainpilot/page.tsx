import { Metadata } from 'next';
import DocPage from '../../DocPage';
import styles from '../../doc.module.css';

export const metadata: Metadata = {
  title: 'Support | TrainPilot',
  alternates: { canonical: 'https://trainpilot.pablogarces.dev/support' },
  description: 'Support and contact information for TrainPilot, a running and gym training app for iOS and Android.',
};

export const dynamic = 'force-static';

export default function TrainPilotSupport() {
  return (
    <DocPage appName="TrainPilot" title="TrainPilot Support">
      <section>
        <p>TrainPilot is a running and gym training app for iOS and Android, for ages 13 and older.</p>
      </section>

      <section>
        <h2 className={styles.h2}>Contact</h2>
        <p>
          Email{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">pasebarona@gmail.com</a> with
          any question, bug report or account request.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>Frequently Asked Questions</h2>

        <h3 className={styles.h3}>How do I delete my account and my data?</h3>
        <p>
          In the app, go to <strong>Profile &rarr; Delete Account</strong>. Account deletion is
          permanent. For account requests, email{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">pasebarona@gmail.com</a>.
        </p>

        <h3 className={styles.h3}>Why does TrainPilot need background location?</h3>
        <p>
          Only to record your outdoor run while your phone is locked or the app is in the background.
          It is used only while a run is actively being recorded.
        </p>

        <h3 className={styles.h3}>Why does it ask for Apple Health access?</h3>
        <p>
          So that runs recorded by other apps or watches (Garmin, Strava, Nike) can be imported, and so
          that your TrainPilot runs are written back to Health. Health data is never used for
          advertising.
        </p>

        <h3 className={styles.h3}>My Apple Watch shows -- BPM</h3>
        <p>
          Make sure the TrainPilot watch app is installed and that you allowed heart rate access on the
          watch. Starting the workout on the phone launches the watch app automatically.
        </p>

        <h3 className={styles.h3}>Is TrainPilot free?</h3>
        <p>
          Yes — free for a limited time. Every feature is unlocked and there is no subscription at this
          time. Ads and paywalls are currently disabled.
        </p>

        <h3 className={styles.h3}>Does voice set logging upload my recording?</h3>
        <p>
          No. Voice set logging uses optional microphone permission and on-device speech recognition.
          TrainPilot does not upload or retain the audio recording. Workout values you confirm,
          such as repetitions and weight, can be saved in your workout history.
        </p>

        <h3 className={styles.h3}>How do I connect a heart-rate strap?</h3>
        <p>
          Bluetooth strap support is in the run screen. Pair from inside the app, not from device
          Settings.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>Privacy</h2>
        <p>
          Read the{' '}
          <a className={styles.link} href="https://trainpilot.pablogarces.dev/privacy">TrainPilot Privacy Policy</a>.
        </p>
      </section>
    </DocPage>
  );
}
