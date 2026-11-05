import type { Metadata } from 'next';
import Image from 'next/image';
import localFont from 'next/font/local';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import TrainPilotHero from '@/components/marketing/TrainPilotHero';
import { ProductHeader, ProductFooter } from '@/components/marketing/MarketingShell';
import s from '@/components/marketing/marketing.module.css';
import t from '@/components/marketing/trainpilot.module.css';
const body = localFont({ src: [{ path: '../../../public/marketing/fonts/HankenGrotesk_400Regular.ttf', weight: '400' }, { path: '../../../public/marketing/fonts/HankenGrotesk_600SemiBold.ttf', weight: '600' }], variable: '--font-body', display: 'swap' });
const display = localFont({ src: '../../../public/marketing/fonts/SchibstedGrotesk_600SemiBold.ttf', weight: '600', variable: '--font-display', display: 'swap' });
const store = 'https://apps.apple.com/us/app/trainpilot/id6788894342';
export const metadata: Metadata = { metadataBase: new URL('https://trainpilot.pablogarces.dev'), title: 'TrainPilot | Your runs. Your lifts. Your next step.', description: 'Personal running plans, spoken coaching, gym progression, and Apple Watch workouts. TrainPilot brings your training together.', alternates: { canonical: 'https://trainpilot.pablogarces.dev' }, icons: { icon: '/marketing/trainpilot-favicon.png', apple: '/images/trainpilot-icon.webp' }, openGraph: { title: 'TrainPilot — Your runs. Your lifts. Your next step.', description: 'Running and strength training, together.', url: 'https://trainpilot.pablogarces.dev', images: ['/marketing/trainpilot-run-home.webp'] } };

const runFacts = [
  { title: 'GPS pace and intervals', text: 'Follow your pace and each interval outdoors, one segment at a time.' },
  { title: 'Spoken coaching', text: 'Hear what comes next without looking down at your phone.' },
  { title: 'Treadmill sessions', text: 'Take the session indoors when the day calls for it.' },
  { title: 'Heart rate', text: 'Pair a Bluetooth heart-rate strap and see it during the run.' },
];
const gymFacts = [
  { title: 'Progression', text: 'Uses your completed lifts to suggest when to add weight and when to back off.' },
  { title: '700+ exercises', text: 'Pick from the library, or change a logged movement and keep its sets.' },
  { title: 'Say the set', text: 'Tap the mic and say your reps and weight. Add a set, adjust rest or undo by voice.' },
  { title: 'Supersets and rest timers', text: 'Warm-ups, supersets and rest timers keep the session together.' },
];
const tools = [
  { name: 'Apple Health', text: 'Imports your completed runs and their routes.' },
  { name: 'intervals.icu', text: 'Connect your account to import completed runs.' },
  { name: 'Heart-rate straps', text: 'Pair a strap over Bluetooth for live heart rate.' },
];
const questions = [
  { q: 'Can I use it for running and the gym?', a: <>Yes. Switch between running and gym modes in the same app. Each has its own plans, workout tools, and history.</> },
  { q: 'Does it work with Apple Watch?', a: <>Yes. TrainPilot has an Apple Watch companion for running and gym sessions.</> },
  { q: 'Can I train indoors?', a: <>Yes. Treadmill sessions and gym logging are part of TrainPilot.</> },
  { q: 'How much does it cost?', a: <>TrainPilot is free to download, with no ads. It is available in English and Spanish.</> },
  { q: 'Where can I manage my account?', a: <>Visit <a href="https://trainpilot.pablogarces.dev/support">support</a> for help, or the <a href="https://trainpilot.pablogarces.dev/delete-account">account deletion page</a> to request deletion.</> },
];

function Facts({ items }: { items: { title: string; text: string }[] }) {
  return <ul className={t.facts}>{items.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ul>;
}

function Shot({ src, alt, caption, side }: { src: string; alt: string; caption: string; side: 'run' | 'gym' }) {
  return <div className={`${t.shot} ${side === 'run' ? t.runShot : t.gymShot}`}><Reveal className={t.shotWrap}><div className={t.shotPhone}><Image src={src} alt={alt} width={1080} height={2341} sizes="(max-width: 860px) 280px, 340px" /></div><p className={t.shotCaption}>{caption}</p></Reveal></div>;
}

export default function TrainPilotHome() { return <div id="top" className={`${s.page} ${t.page} ${body.variable} ${display.variable}`}>
<ProductHeader name="TrainPilot" icon="/images/trainpilot-icon.webp" links={[{ label: 'Run', href: '#run' }, { label: 'Gym', href: '#gym' }, { label: 'Questions', href: '#questions' }]} action={{ label: 'Get the app', href: store }} />
<main>
<TrainPilotHero store={store} />
<section id="run" className={t.section}><div className={`${t.container} ${t.grid}`}>
  <Reveal className={t.runText}><span className={`${t.label} ${t.labelRun}`}>Run</span><h2 className={`${t.display} ${t.h2}`}>Run toward a goal.</h2><p className={t.lead}>A plan built around your race, your current times, and the days you have. Know what today asks of you, and see the weeks ahead.</p><Facts items={runFacts} /></Reveal>
  <Shot side="run" src="/marketing/trainpilot-run-plan.webp" alt="TrainPilot plan screen: a 6-week 5K progression with race day on October 25 and the month's training days" caption="Your plan, week by week" />
</div></section>
<section id="gym" className={t.section}><div className={`${t.container} ${t.grid}`}>
  <Shot side="gym" src="/marketing/trainpilot-gym-history.webp" alt="TrainPilot gym history: Push, Leg and Pull days with time, sets and volume" caption="Every session, with its volume" />
  <Reveal className={t.gymText}><span className={`${t.label} ${t.labelGym}`}>Gym</span><h2 className={`${t.display} ${t.h2}`}>Lift with a next step.</h2><p className={t.lead}>Log sets, reps, weight, and rest. Your next session starts with your last one.</p><Facts items={gymFacts} /></Reveal>
</div></section>
<section id="watch" className={`${t.section} ${t.band}`}><div className={`${t.container} ${t.grid}`}>
  <Reveal className={t.bandText}><span className={`${t.label} ${t.labelWatch}`}>Apple Watch</span><h2 className={`${t.display} ${t.h2}`}>Keep your phone in your pocket.</h2><p className={t.lead}>Pause a run and check your pace and heart rate on Apple Watch. In the gym, log the set from your wrist, or tap Voice and say it. Your iPhone fills it in.</p></Reveal>
  <Reveal className={t.watches}>
    <figure className={`${t.watch} ${t.watchRun}`}><div className={t.watchCase}><Image src="/marketing/trainpilot-watch-run.webp" alt="TrainPilot on Apple Watch during a run: 5:00 per km pace, 2.45 km, 12:34 and a heart rate of 142, with a Pause button" width={208} height={248} /></div><figcaption>Running</figcaption></figure>
    <figure className={`${t.watch} ${t.watchGym}`}><div className={t.watchCase}><Image src="/marketing/trainpilot-watch-gym.webp" alt="TrainPilot on Apple Watch in the gym: set 1 of 3 of dumbbell bench press, 8 reps, with Log Set and Voice buttons" width={162} height={197} /></div><figcaption>Gym</figcaption></figure>
  </Reveal>
  <div className={t.toolsRow}><h3 className={t.toolsHead}>Works with</h3><ul className={t.tools}>{tools.map(tool => <li key={tool.name}><strong>{tool.name}</strong><p>{tool.text}</p></li>)}</ul></div>
</div></section>
<section id="questions" className={t.section}><div className={`${t.container} ${t.grid}`}>
  <div className={t.faqHead}><h2 className={`${t.display} ${t.h2}`}>A few things to know.</h2><a className={t.supportLink} href="https://trainpilot.pablogarces.dev/support">Get support <ArrowUpRight size={16} /></a></div>
  <div className={t.faqList}>{questions.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
</div></section>
<section className={t.closing}><div className={t.field} aria-hidden="true"><span /><span /></div><Reveal className={t.container}>
  <Image src="/images/trainpilot-icon.webp" alt="" width={96} height={96} />
  <h2 className={`${t.display} ${t.h2}`}>Make today a training day.</h2>
  <a className={t.button} href={store}>Download on the App Store</a>
  <p className={t.note}>Free for iPhone and Apple Watch. No ads. English and Spanish.</p>
</Reveal></section>
</main><ProductFooter name="TrainPilot" app="trainpilot" /></div>; }
