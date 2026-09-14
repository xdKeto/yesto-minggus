import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getProjectMedia } from '../../utils/assetLoader';

export default function ProjectMediaCarousel({ project }) {
  const media = getProjectMedia(project.media);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || media.length < 2) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % media.length), 3500);
    return () => window.clearInterval(timer);
  }, [media.length, paused]);
  if (!media.length) return <div className="flex h-full items-center justify-center p-6 text-center"><span className="font-display text-3xl text-lemon">You are exploring it right now.</span></div>;
  return <div className="relative h-full overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}><AnimatePresence mode="wait"><motion.img key={media[index]} src={media[index]} alt={`${project.name} screenshot ${index + 1}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="h-full w-full object-contain" /></AnimatePresence><span className="absolute bottom-4 right-4 rounded bg-ink/80 px-2 py-1 font-mono text-xs text-paper">{index + 1} / {media.length}{paused ? ' paused' : ''}</span></div>;
}
