import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./marketing.module.css";

export function ProductHeader({ name, icon, links, action }: { name: string; icon: string; links: { label: string; href: string }[]; action?: { label: string; href: string } }) {
  return <header className={styles.header}><div className={styles.headerInner}>
    <a className={styles.wordmark} href="#top"><Image src={icon} alt="" width={36} height={36} /><span>{name}</span></a>
    <nav aria-label={`${name} navigation`}>{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
    {action && <a className={styles.navAction} href={action.href}>{action.label}<ArrowUpRight size={14} /></a>}
  </div></header>;
}

export function ProductFooter({ name, app, children }: { name: string; app: string; children?: ReactNode }) {
  return <footer className={styles.footer}><div className={styles.footerInner}><a className={styles.footerBrand} href="#top">{name}</a><div>{children ?? <><a href={`https://${app}.pablogarces.dev/privacy`}>Privacy</a><a href={`https://${app}.pablogarces.dev/support`}>Support</a>{app === "trainpilot" && <a href="https://trainpilot.pablogarces.dev/delete-account">Delete account</a>}</>}<a href="https://pablogarces.dev">Made by Pablo Garces <ArrowUpRight size={12} /></a></div><span>© 2026 PGLabs</span></div></footer>;
}
