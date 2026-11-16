import { Metadata } from 'next';
import DocPage from '../docs/DocPage';
import styles from '../docs/doc.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | recetAI',
  alternates: { canonical: 'https://pablogarces.vercel.app/recetai' },
  description:
    'Privacy Policy for recetAI, the recipe app for iOS and Android that saves recipes shared from Instagram and TikTok, published by Pablo Garces.',
};

export const dynamic = 'force-static';

const CONTACT = 'pgarcesb1@gmail.com';

export default function RecetaiPrivacy() {
  return (
    <DocPage
      appName="recetAI"
      title="Privacy Policy"
      lastUpdated="November 16, 2026"
      accentColor="#2F6BFF"
      logoSrc="/images/recetai-logo.png"
    >
      <section>
        <p>
          <strong>recetAI</strong> is a recipe app for iOS (bundle identifier{' '}
          <strong>com.pglabs.recetai</strong>) and Android (package <strong>com.pglabs.recetai</strong>),
          published by Pablo Garces. It turns recipes shared on Instagram and TikTok into structured
          recipes you can cook from, and keeps your cookbooks, notes, meal prep, week plan and grocery
          list. This policy explains what the app does with your data.
        </p>
        <p>
          <strong>
            We do not sell your data, show ads, or track you across apps or websites. recetAI contains
            no analytics, advertising or crash-reporting software.
          </strong>
        </p>
        <p>
          For any privacy question, contact{' '}
          <a className={styles.link} href={`mailto:${CONTACT}`}>
            {CONTACT}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>1. Data We Collect</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <strong>Account:</strong> your email address, a password (stored only as a hash by our
            authentication provider), the display name you choose, and an internal account ID.
          </li>
          <li className={styles.li}>
            <strong>What you save in the app:</strong> recipes (imported or typed), the links you import
            them from, your personal notes on a recipe, cookbooks, tags, meal-prep sessions and portions,
            your inventory, week plan and grocery list.
          </li>
          <li className={styles.li}>
            <strong>Questions you ask:</strong> the text you type into &ldquo;Ask recetAI&rdquo; on a
            recipe.
          </li>
          <li className={styles.li}>
            <strong>Share links you create:</strong> when you share a recipe, a link is created along
            with a count of how many times it was opened and when.
          </li>
        </ul>
        <p>
          All of this is linked to your account and used only to make the app work. None of it is used
          for advertising or tracking. Cook-timer alerts are scheduled on your device and do not send
          anything to us.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>2. How Importing a Recipe Works</h2>
        <p>
          When you share or paste an Instagram or TikTok link, our server fetches that public post&apos;s
          caption and the address of its cover image, and sends the caption text to <strong>OpenAI</strong>{' '}
          to turn it into a structured recipe (ingredients, steps, times, tags). We store the recipe and
          the post&apos;s link. The cover image is not copied to our servers: the app loads it from
          Instagram or TikTok when you view the recipe, so those services see that your device requested
          the image, as they would if you opened the post yourself.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>3. AI Features</h2>
        <p>
          Three features send data to <strong>OpenAI</strong>, which processes it to produce an answer
          and returns it to us:
        </p>
        <ul className={styles.ul}>
          <li className={styles.li}>Importing a recipe: the caption of the post you imported.</li>
          <li className={styles.li}>
            Nutrition estimates: the recipe&apos;s title, servings and ingredient list.
          </li>
          <li className={styles.li}>
            Ask recetAI: your question, the conversation so far, and the recipe&apos;s title, description,
            ingredients, steps and tags. The app asks for your permission the first time, and nothing is
            sent if you decline.
          </li>
        </ul>
        <p>
          <strong>Your personal notes are never sent to OpenAI</strong>, and neither are your email
          address or name. OpenAI handles this data under its API terms, which do not use API data to
          train its models.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>4. Sharing a Recipe</h2>
        <p>
          A share link is created only when you tap Share on a recipe. Someone who opens it in the
          recetAI app sees that recipe&apos;s title, description, photo, ingredients, steps, nutrition and
          tags, and your display name as the person who shared it, and can save a copy to their own
          cookbook. <strong>Your notes are included only if you choose &ldquo;Share link with my
          notes&rdquo;.</strong> In a web browser the link shows only an invitation to open the app, never
          the recipe. You can stop a link working at any time; a copy someone already saved stays in their
          cookbook.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>5. Connecting Claude (Optional)</h2>
        <p>
          recetAI can be connected to Anthropic&apos;s Claude as a connector. This happens only if you add
          it in Claude and sign in to approve it. Once connected, Claude can read and change your recetAI
          recipes, inventory, week plan and grocery list on your behalf, and what you discuss with Claude is
          governed by Anthropic&apos;s privacy policy. You can disconnect it from the app&apos;s settings or
          from Claude at any time.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>6. Who Processes Your Data</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <strong>Supabase</strong> — authentication, database and the server functions that run the
            app. Everything in section 1 is stored there.
          </li>
          <li className={styles.li}>
            <strong>OpenAI</strong> — the AI processing described in section 3.
          </li>
          <li className={styles.li}>
            <strong>Vercel</strong> — hosts the share-link address (recetai.pablogarces.dev) and the
            Claude connector address. It passes requests through and stores no recipe data.
          </li>
          <li className={styles.li}>
            <strong>Instagram and TikTok</strong> — our server requests the public post you chose to
            import, and the app loads its cover image from them. They do not receive your recetAI
            account details.
          </li>
        </ul>
        <p>We do not sell or rent personal data, and we do not share it with anyone else.</p>
      </section>

      <section>
        <h2 className={styles.h2}>7. Retention and Deletion</h2>
        <p>
          We keep your data while your account exists. You can delete your account at any time in the
          app: <strong>Profile &rarr; Delete account</strong>. This permanently deletes your account and
          everything stored with it — recipes, notes, cookbooks, meal prep, plans, grocery list and share
          links — and it cannot be undone. You can also request deletion without the app on our{' '}
          <a className={styles.link} href="/recetai/deletion">
            data deletion page
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>8. Your Rights</h2>
        <p>
          You can see and edit everything you saved inside the app, export a recipe, and delete your
          account. Wherever you live, you may also ask us for a copy of your data, a correction, or
          deletion by emailing us; residents of the EU, UK and California have these rights by law, and
          we honour them for everyone.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>9. Children</h2>
        <p>
          recetAI is not directed at children under 13, and we do not knowingly collect data from them.
          If you believe a child has created an account, contact us and we will delete it.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>10. Security</h2>
        <p>
          Data travels over encrypted connections. Each account can reach only its own rows in the
          database, enforced by the database itself, and share links use random tokens rather than recipe
          IDs.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>11. Changes</h2>
        <p>
          If the app&apos;s data handling changes, this page changes with it and the date at the top is
          updated.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>12. Contact</h2>
        <p>
          <a className={styles.link} href={`mailto:${CONTACT}`}>
            {CONTACT}
          </a>
        </p>
      </section>
    </DocPage>
  );
}
