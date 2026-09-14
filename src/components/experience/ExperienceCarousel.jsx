import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const speedMap = { slow: 42, normal: 28, fast: 17 };

export default function ExperienceCarousel({ experiences, paused, speed, reverse, fun }) {
  const entries = [...experiences, ...experiences];
  const [hoverPaused, setHoverPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const shouldPause = paused || hoverPaused || reducedMotion;
  const [funTick, setFunTick] = useState(0);
  useEffect(() => { if (!fun || reducedMotion) return undefined; const timer = window.setInterval(() => setFunTick((value) => value + 1), 1800); return () => window.clearInterval(timer); }, [fun, reducedMotion]);
  return <div className="experience-carousel" aria-label="Experience carousel" onMouseEnter={() => setHoverPaused(true)} onMouseLeave={() => setHoverPaused(false)} onTouchStart={() => setHoverPaused(true)} onTouchEnd={() => setHoverPaused(false)}><motion.div key={`${speed}-${reverse}`} animate={shouldPause ? false : { y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration: speedMap[speed], repeat: Infinity, ease: 'linear' }} className="flex flex-col gap-2">{entries.map((experience, index) => { const dark = experience.color === '#25424C' || experience.color === '#942911'; const tilt = fun && !reducedMotion ? (((index + funTick) % 3) - 1) * 0.7 : 0; return <motion.article key={`${experience.id}-${index}`} className="experience-card" data-theme={dark ? 'dark' : 'light'} style={{ backgroundColor: experience.color }} animate={{ rotate: tilt }} transition={{ type: 'spring', stiffness: 90, damping: 18 }}><p className="experience-period font-mono text-right text-xl">{experience.period}</p><h2 className="experience-role mt-28 text-2xl md:text-3xl">{experience.role}</h2><p className="experience-company font-mono text-lg">{experience.company}</p><ul className="experience-bullets mt-8 list-disc space-y-1 pl-6 text-lg">{experience.bullets.slice(0, 3).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></motion.article>; })}</motion.div></div>;
}

