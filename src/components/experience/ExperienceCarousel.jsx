import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const speedMap = { slow: 14, normal: 28, fast: 48 };

function ExperienceCard({ experience, fun, index, tick }) {
  const dark = experience.color === '#25424C' || experience.color === '#942911';
  const tilt = fun ? (((index + tick) % 3) - 1) * 0.7 : 0;
  return <motion.article className="experience-card" data-theme={dark ? 'dark' : 'light'} style={{ backgroundColor: experience.color }} animate={{ rotate: tilt }} transition={{ type:'spring', stiffness:90, damping:18 }}><p className="experience-period font-mono text-right">{experience.period}</p><h2 className="experience-role">{experience.role}</h2><p className="experience-company font-mono">{experience.company}</p><ul className="experience-bullets list-disc space-y-1 pl-6">{experience.bullets.slice(0, 3).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></motion.article>;
}

export default function ExperienceCarousel({ experiences, paused, speed, reverse, fun }) {
  const reducedMotion = useReducedMotion(); const viewportRef = useRef(null); const groupRef = useRef(null); const [groupHeight, setGroupHeight] = useState(0); const [offset, setOffset] = useState(0); const [hoverPaused, setHoverPaused] = useState(false); const [tick, setTick] = useState(0);
  useLayoutEffect(() => { const measure = () => setGroupHeight(groupRef.current?.getBoundingClientRect().height || 0); measure(); const observer = new ResizeObserver(measure); if (groupRef.current) observer.observe(groupRef.current); return () => observer.disconnect(); }, [experiences.length]);
  useEffect(() => { if (!fun || reducedMotion) return undefined; const timer = window.setInterval(() => setTick((value) => value + 1), 1800); return () => window.clearInterval(timer); }, [fun, reducedMotion]);
  useEffect(() => { if (reducedMotion || paused || hoverPaused || !groupHeight) return undefined; let last = performance.now(); let frame; const step = (time) => { const delta = time - last; last = time; const distance = (delta / 1000) * speedMap[speed] * (reverse ? 1 : -1); setOffset((value) => { let next = value + distance; if (next <= -groupHeight) next += groupHeight; if (next >= 0) next -= groupHeight; return next; }); frame = requestAnimationFrame(step); }; frame = requestAnimationFrame(step); return () => cancelAnimationFrame(frame); }, [reducedMotion, paused, hoverPaused, groupHeight, speed, reverse]);
  const stableOffset = reducedMotion ? -Math.min(groupHeight * .08, 90) : offset;
  return <div ref={viewportRef} className="experience-carousel" aria-label="Experience carousel" onMouseEnter={() => setHoverPaused(true)} onMouseLeave={() => setHoverPaused(false)} onTouchStart={() => setHoverPaused(true)} onTouchEnd={() => setHoverPaused(false)}><div className="experience-track" style={{ transform:`translate3d(0, ${stableOffset}px, 0)` }}><div ref={groupRef} className="flex flex-col gap-2">{experiences.map((experience, index) => <ExperienceCard key={`${experience.id}-a`} experience={experience} fun={fun && !reducedMotion} index={index} tick={tick} />)}</div><div className="flex flex-col gap-2" aria-hidden="true">{experiences.map((experience, index) => <ExperienceCard key={`${experience.id}-b`} experience={experience} fun={fun && !reducedMotion} index={index + experiences.length} tick={tick} />)}</div></div></div>;
}
