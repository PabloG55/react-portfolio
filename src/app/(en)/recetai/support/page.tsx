import { Metadata } from 'next';
import DocPage from '../../docs/DocPage';
import styles from '../../docs/doc.module.css';

export const metadata: Metadata = {
  title: 'Support | recetAI',
  alternates: { canonical: 'https://pablogarces.vercel.app/recetai/support' },
  description:
    'Support and contact information for recetAI, the recipe app that saves recipes shared from Instagram and TikTok.',
};

export const dynamic = 'force-static';

const CONTACT = 'pgarcesb1@gmail.com';

export default function RecetaiSupport() {
  return (
    <DocPage appName="recetAI" title="recetAI Support" accentColor="#2F6BFF" logoSrc="/images/recetai-logo.png">
      <section>
        <p>
          recetAI saves recipes you find on Instagram and TikTok as real recipes — ingredients, steps
          and times — and keeps them in cookbooks you can cook from with your phone on the counter. It
          also plans meal prep, tracks portions in your fridge, builds a week plan and a grocery list.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>Contact</h2>
        <p>
          Email{' '}
          <a className={styles.link} href={`mailto:${CONTACT}`}>
            {CONTACT}
          </a>{' '}
          with any question or bug report. We aim to reply within a few days.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>Frequently Asked Questions</h2>

        <h3 className={styles.h3}>How do I save a recipe from Instagram or TikTok?</h3>
        <p>
          In Instagram or TikTok, tap Share on the post and choose recetAI. Or copy the post&apos;s link,
          open recetAI and paste it on the Import screen. The recipe appears in your cookbook a few
          seconds later.
        </p>

        <h3 className={styles.h3}>The import got something wrong. What now?</h3>
        <p>
          Open the recipe and edit it — every field can be changed. Captions that do not contain the
          recipe itself (for example &ldquo;recipe in my bio&rdquo;) cannot be imported, because the
          app only reads what the post says.
        </p>

        <h3 className={styles.h3}>I imported the same post twice.</h3>
        <p>
          recetAI recognises a link it has already imported and gives you the recipe you already have
          instead of making a second copy.
        </p>

        <h3 className={styles.h3}>How do I share a recipe with someone?</h3>
        <p>
          Open the recipe and tap Share. The other person opens the link in recetAI and can save a copy.
          Your notes go with it only if you choose to include them, and you can stop the link working at
          any time.
        </p>

        <h3 className={styles.h3}>How do I delete my account?</h3>
        <p>
          In the app, go to Profile &rarr; Delete account. This permanently deletes your account and all
          your recipes. You can also request deletion on the{' '}
          <a className={styles.link} href="/recetai/deletion">
            data deletion page
          </a>
          .
        </p>

        <h3 className={styles.h3}>What happens to my data?</h3>
        <p>
          See the{' '}
          <a className={styles.link} href="/recetai">
            Privacy Policy
          </a>{' '}
          for exactly what is stored, what is sent to OpenAI to read a recipe, and what is never sent.
        </p>
      </section>
    </DocPage>
  );
}
