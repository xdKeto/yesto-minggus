import { useState } from 'react';
import Tile from '../common/Tile';
import ArrowIcon from '../common/ArrowIcon';
import { PROFILE } from '../../constants/portfolioData';

export default function ContactExpandedTile({ onClose, onNotify }) {
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); onNotify('Email copied to clipboard!'); window.setTimeout(() => setCopied(false), 1600); } catch { window.location.href = `mailto:${PROFILE.email}`; }
  }
  return <Tile color="#772014" className="home-contact-expanded h-full p-5 text-lemon"><button onClick={onClose} className="absolute right-5 top-5 z-10 p-2 focus:outline-none focus:ring-2 focus:ring-paper" aria-label="Close contact"><ArrowIcon close className="h-10 w-10" /></button><div className="flex h-full flex-col justify-between"><h2 className="font-display text-4xl uppercase md:text-5xl">Contact</h2><button onClick={copyEmail} className="font-display self-center text-center text-4xl uppercase leading-[1.1] transition hover:text-paper focus:outline-none focus:ring-2 focus:ring-paper md:text-6xl">Lets Build Something</button><a href={`mailto:${PROFILE.email}`} onClick={copyEmail} className="font-mono self-center text-sm text-paper underline-offset-4 hover:underline md:text-2xl">{copied ? 'Copied!' : PROFILE.email}</a></div></Tile>;
}
