import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Tile from '../common/Tile';
import ArrowIcon from '../common/ArrowIcon';
import ClockTile from '../common/ClockTile';
import GithubContributionTile from '../common/GithubContributionTile';
import SkillsExpandedTile from '../home/SkillsExpandedTile';
import ContactExpandedTile from '../home/ContactExpandedTile';
import { EDUCATION, PROFILE, SOCIALS } from '../../constants/portfolioData';
import { getAssetUrl, getIconUrl } from '../../utils/assetLoader';

const CANONICAL_HOME_ORDER = ['photo', 'skills', 'contact', 'hero', 'education', 'status', 'github', 'linkedin', 'cv', 'quote', 'contributions', 'clock', 'location', 'projects', 'experience'];
const MODE_TILE_KEYS = ['puzzle', 'fun'];

function ModeTile({ label, active, onClick, color }) {
  return <Tile color={color} aria-label={`${label} ${active ? 'on' : 'off'}`} className={`mode-tile flex min-h-[120px] items-center justify-center p-4 text-center text-2xl md:text-3xl ${color === '#FFF0C2' ? 'text-charcoal' : 'text-paper'}`} onClick={onClick} aria-pressed={active}>
    <span>{label}{active ? ' ON' : ''}</span>
  </Tile>;
}

export default function HomeBoard({ onNavigate }) {
  const [expandedTile, setExpandedTile] = useState(null);
  const [isPuzzleMode, setPuzzleMode] = useState(false);
  const [isFunMode, setFunMode] = useState(false);
  const [homeOrder, setHomeOrder] = useState(CANONICAL_HOME_ORDER);
  const [funOffsets, setFunOffsets] = useState({});
  const [notice, setNotice] = useState('');
  const reducedMotion = useReducedMotion();
  const boardRef = useRef(null);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setExpandedTile(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    if (!expandedTile) return undefined;
    const closeOnOutsideClick = (event) => {
      if (boardRef.current && !event.target.closest('.home-skills-expanded, .home-contact-expanded')) setExpandedTile(null);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [expandedTile]);

  useEffect(() => {
    if (!isFunMode || reducedMotion) {
      setFunOffsets({});
      return undefined;
    }
    const randomize = () => setFunOffsets(Object.fromEntries(homeOrder.map((key) => [key, { x: Math.round(Math.random() * 30 - 15), y: Math.round(Math.random() * 30 - 15), rotate: Math.round(Math.random() * 6 - 3) }])));
    randomize();
    const timer = window.setInterval(randomize, 1800);
    return () => window.clearInterval(timer);
  }, [isFunMode, reducedMotion, homeOrder]);

  const togglePuzzle = () => {
    setPuzzleMode((value) => {
      const next = !value;
      if (next) {
        setFunMode(false);
        setNotice('Puzzle mode active: drag tiles to rearrange them.');
      } else {
        setHomeOrder(CANONICAL_HOME_ORDER);
        setNotice('');
      }
      return next;
    });
  };

  const toggleFun = () => {
    setFunMode((value) => {
      const next = !value;
      if (next) {
        setPuzzleMode(false);
        setNotice(reducedMotion ? 'Fun mode is softened because reduced motion is enabled.' : 'Fun mode active.');
      } else setNotice('');
      return next;
    });
  };

  const openExpand = (tile) => setExpandedTile((current) => current === tile ? null : tile);
  const moveInOrder = (key, direction) => {
    const index = homeOrder.indexOf(key);
    const nextIndex = Math.max(0, Math.min(homeOrder.length - 1, index + direction));
    if (index === nextIndex) return;
    setHomeOrder((current) => {
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  };
  const wrap = (key, child) => {
    const funOffset = funOffsets[key] || { x: 0, y: 0, rotate: 0 };
    const isFixedModeTile = key === 'fun' || key === 'puzzle';
    const canReorder = homeOrder.includes(key);
    return <motion.div key={key} className={`home-${expandedTile === key ? `${key}-expanded` : key}`} drag={isPuzzleMode && canReorder && !isFixedModeTile} dragMomentum={false} dragSnapToOrigin dragConstraints={{ left: -160, right: 160, top: -160, bottom: 160 }} whileDrag={{ scale: 1.03, zIndex: 20 }} onDragEnd={(_event, info) => { if (!isPuzzleMode || !canReorder || isFixedModeTile) return; const distance = Math.abs(info.offset.x) > Math.abs(info.offset.y) ? info.offset.x : info.offset.y; if (Math.abs(distance) > 45) moveInOrder(key, distance > 0 ? 1 : -1); }} onKeyDown={(event) => { if (!isPuzzleMode || !canReorder || isFixedModeTile) return; if (['ArrowRight', 'ArrowDown'].includes(event.key)) { event.preventDefault(); moveInOrder(key, 1); } if (['ArrowLeft', 'ArrowUp'].includes(event.key)) { event.preventDefault(); moveInOrder(key, -1); } }} tabIndex={isPuzzleMode && canReorder && !isFixedModeTile ? 0 : undefined} animate={{ x: isFunMode && !isFixedModeTile ? funOffset.x : 0, y: isFunMode && !isFixedModeTile ? funOffset.y : 0, rotate: isFunMode && !isFixedModeTile ? funOffset.rotate : 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18, layout: { type: 'spring', stiffness: 240, damping: 28 } }} layout>{child}</motion.div>;
  };

  const tiles = {
    photo: <Tile color="#FFFBF0" className="h-full"><img src={getAssetUrl('yesto.png')} alt="Yesto Minggus" className="h-full w-full object-cover" /></Tile>,
    hero: <Tile color="#25424C" className="flex h-full flex-col justify-between p-5 text-paper"><h1 className="font-display text-4xl uppercase leading-none text-lemon md:text-6xl">Hello, I&apos;m <span className="text-coral">Yesto</span></h1><p className="font-rounded text-right text-xl md:text-3xl">{PROFILE.role}<br />{PROFILE.tagline}</p></Tile>,
    clock: <ClockTile />,
    location: <Tile color="#25424C" className="flex h-full flex-col items-center justify-center gap-4 p-3 text-center text-paper"><img src={getIconUrl('location.svg')} alt="" className="h-12" /><span className="text-xl">{PROFILE.location}</span></Tile>,
    education: <Tile color="#FFF0C2" className="flex h-full flex-col justify-between p-5 text-charcoal"><img src={getIconUrl('education.svg')} alt="" className="h-12 w-12" /><div><h2 className="text-2xl md:text-3xl">{EDUCATION.school}</h2><p className="font-mono text-base md:text-xl">{EDUCATION.program}</p></div></Tile>,
    status: <Tile color="#942911" className="flex h-full flex-col justify-between p-5 text-paper"><img src={getIconUrl('opentowork.svg')} alt="Open to work" className="h-10 w-10" /><div className="self-end text-right"><p className="text-xl">STATUS:</p><p className="font-rounded text-4xl italic text-lemon md:text-5xl">{PROFILE.status}</p></div></Tile>,
    skills: <Tile color="#25424C" aria-label="Open skills and tools" className="flex h-full flex-col justify-between p-4 text-lemon" onClick={() => openExpand('skills')}><ArrowIcon className="absolute right-4 top-4 h-10 w-10" /><span className="font-display self-start text-left text-4xl leading-[1.1] md:text-5xl">Skills &<br />Tools</span></Tile>,
    github: <Tile color="#7A3B30" className="flex h-full flex-col items-center justify-center gap-3 p-3 text-paper" onClick={() => window.open(SOCIALS.github, '_blank', 'noopener,noreferrer')}><span className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal p-4"><img src={getIconUrl('github.svg')} alt="GitHub" /></span><span className="text-xl">Github</span></Tile>,
    linkedin: <Tile color="#FD8451" className="flex h-full flex-col items-center justify-center gap-3 p-3 text-paper" onClick={() => window.open(SOCIALS.linkedin, '_blank', 'noopener,noreferrer')}><span className="text-xl">Connect with me!</span><span className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal p-3"><img src={getIconUrl('linkedin.svg')} alt="LinkedIn" /></span></Tile>,
    cv: <a href="/resume.pdf" download className="tile home-cv flex h-full flex-col justify-between bg-charcoal p-5 text-paper"><img src={getIconUrl('downloadsvg.svg')} alt="" className="h-10 w-10" /><span className="self-end text-right text-xl">Click to<br /><strong className="font-rounded text-4xl italic text-lemon">Download CV</strong></span></a>,
    projects: <Tile color="#942911" className="flex h-full flex-col justify-between p-5 text-lemon" onClick={() => onNavigate('projects')}><ArrowIcon className="absolute right-5 top-5 h-12 w-12" /><span className="font-display self-start text-left text-4xl md:text-5xl">Projects</span></Tile>,
    quote: <Tile color="#FFF0C2" className="flex h-full items-center justify-center p-5 text-center text-charcoal"><span className="font-mono text-2xl italic md:text-4xl">{PROFILE.bigTagline}</span></Tile>,
    contact: <Tile color="#772014" aria-label="Open contact" className="flex h-full flex-col justify-between p-4 text-lemon" onClick={() => openExpand('contact')}><ArrowIcon className="absolute right-4 top-4 h-10 w-10" /><span className="font-display self-start text-left text-4xl md:text-5xl">Contact</span></Tile>,
    contributions: <GithubContributionTile />,
    experience: <Tile color="#C05640" className="flex h-full flex-col justify-between p-5 text-lemon" onClick={() => onNavigate('experience')}><ArrowIcon className="absolute right-5 top-5 h-12 w-12" /><span className="font-display self-start text-left text-4xl md:text-5xl">Experience</span></Tile>,
    puzzle: <ModeTile label="Puzzle Mode" active={isPuzzleMode} onClick={togglePuzzle} color="#25424C" />,
    fun: <ModeTile label="Fun Mode" active={isFunMode} onClick={toggleFun} color="#FFF0C2" />,
  };

  const content = (key) => key === 'skills' && expandedTile === 'skills' ? <SkillsExpandedTile onClose={() => setExpandedTile(null)} /> : key === 'contact' && expandedTile === 'contact' ? <ContactExpandedTile onClose={() => setExpandedTile(null)} onNotify={setNotice} /> : tiles[key];
  const middle = homeOrder.slice(3, 11);
  const middleSlots = [<div key="middle-hero">{wrap(middle[0], content(middle[0]))}</div>, <div key="middle-education" className="home-middle-row">{wrap(middle[1], content(middle[1]))}{wrap(middle[2], content(middle[2]))}</div>, <div key="middle-social" className="home-middle-row home-social-row">{middle.slice(3, 6).map((key) => wrap(key, content(key)))}</div>, <div key="middle-quote">{wrap(middle[6], content(middle[6]))}</div>, <div key="middle-contributions">{wrap(middle[7], content(middle[7]))}</div>];
  return <main className="tile-board" ref={boardRef}><AnimatePresence>{notice && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed left-1/2 top-4 z-50 rounded-md bg-paper px-4 py-3 text-charcoal shadow-lg">{notice}</motion.div>}</AnimatePresence><div className={`home-layout ${expandedTile ? `expanded-${expandedTile}` : ''}`}><div className="home-left">{homeOrder.slice(0, 3).map((key) => wrap(key, content(key)))}</div><div className="home-middle">{middleSlots}</div><div className="home-right"><div className="home-right-row">{homeOrder.slice(11, 13).map((key) => wrap(key, content(key)))}</div>{homeOrder.slice(13).map((key) => wrap(key, content(key)))}<div className="home-right-row home-mode-row">{MODE_TILE_KEYS.map((key) => wrap(key, tiles[key]))}</div></div></div></main>;
}


