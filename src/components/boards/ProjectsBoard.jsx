import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Tile from '../common/Tile';
import ArrowIcon from '../common/ArrowIcon';
import ProjectDetailView from '../projects/ProjectDetailView';
import { CATEGORY_DESCRIPTIONS, CURRENTLY_WORKING_ON, PROJECTS, PROJECT_CATEGORIES } from '../../constants/portfolioData';
import { getAssetUrl, getIconUrl } from '../../utils/assetLoader';

const tabColors = { ALL: '#FFF0C2', WEB: '#FD8451', MOBILE: '#942911', PERSONAL: '#772014' };

function ProjectCard({ project, onOpen }) {
  return <Tile color={project.themeColor} aria-label={`Open project ${project.name}`} className="group h-full p-4 text-paper" onClick={() => onOpen(project)}><img src={getAssetUrl(project.cover)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-300 group-hover:opacity-75" /><ArrowIcon className="absolute right-4 top-4 z-10 h-10 w-10" /><div className="absolute inset-x-4 bottom-4 z-10"><div className="mb-2 flex gap-2">{project.tags.map((tag) => <span key={tag} className="bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase">{tag}</span>)}</div><h2 className="text-2xl leading-none md:text-3xl">{project.name}</h2></div></Tile>;
}

function ProjectGrid({ visible, category, working }) {
  const isAll = category === 'ALL';
  return <div className={`project-grid ${isAll ? 'project-grid-all' : 'project-grid-filtered'}`}><AnimatePresence>{visible.map((project) => <motion.div key={project.id} layout className={`${project.featured && isAll ? 'project-featured' : 'project-square'} project-id-${project.id}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}><ProjectCard project={project} onOpen={working.onOpen} /></motion.div>)}<Tile color="#FFF0C2" aria-label="Open GitHub profile" className="project-square project-github flex flex-col justify-between p-4 text-charcoal" onClick={() => window.open('https://github.com/xdKeto', '_blank', 'noopener,noreferrer')}><span className="flex h-14 w-14 items-center justify-center rounded-full bg-charcoal p-3"><img src={getIconUrl('github.svg')} alt="GitHub" /></span><span className="flex items-center justify-between text-2xl">Open Github <ArrowIcon className="h-10 w-10" /></span></Tile><Tile color="#772014" aria-label="Open GuitarCable project" className="project-square project-working flex flex-col justify-between p-5 text-right text-paper" onClick={() => working.onOpen(working.project)}><img src={getIconUrl('opentowork.svg')} alt="Open to work" className="h-10 w-10" /><span className="self-end text-lg">{working.label}<br /><strong className="font-rounded text-3xl italic text-lemon">{working.name}</strong></span></Tile><div className="project-strip rounded-md bg-coral" /></AnimatePresence></div>;
}

export default function ProjectsBoard({ onHome }) {
  const [category, setCategory] = useState('ALL');
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);
  const visible = useMemo(() => PROJECTS.filter((project) => category === 'ALL' || project.category.toUpperCase() === category), [category]);
  const projectWorking = PROJECTS.find((project) => project.id === CURRENTLY_WORKING_ON.projectId);
  const working = { label: CURRENTLY_WORKING_ON.label, name: projectWorking?.name, project: projectWorking, onOpen: setSelected };
  return <main className="tile-board"><div className="projects-board"><div className="board-header"><Tile color="#942911" className="flex flex-col justify-between p-4 text-paper" onClick={onHome}><span className="text-4xl">{'←'}</span><span className="text-3xl">Home</span></Tile><Tile color="#25424C" /><Tile color="#FFF0C2" className="board-title font-display text-5xl text-charcoal md:text-7xl">Projects</Tile><Tile color="#7A3B30" /></div><AnimatePresence mode="wait">{selected ? <ProjectDetailView project={selected} onClose={() => setSelected(null)} /> : <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-0 flex-1 flex-col gap-2"><div className="project-filter">{PROJECT_CATEGORIES.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className="px-3 text-2xl font-bold transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-paper" style={{ backgroundColor: category === item ? tabColors[item] : '#16262B', color: category === item && (item === 'ALL' || item === 'WEB') ? '#25424C' : '#FFFBF0' }} aria-pressed={category === item}>{item}</button>)}<div className="flex items-center rounded-md bg-charcoal px-4 text-lg text-paper md:text-2xl">{CATEGORY_DESCRIPTIONS[category]}</div></div><div className="project-scroll"><ProjectGrid visible={visible} category={category} working={working} /></div></motion.div>}</AnimatePresence></div></main>;
}

