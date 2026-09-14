import { motion } from 'framer-motion';
import Tile from '../common/Tile';
import ArrowIcon from '../common/ArrowIcon';
import { SKILLS, UNRELATED_SKILLS } from '../../constants/portfolioData';
import { getIconUrl } from '../../utils/assetLoader';

export default function SkillsExpandedTile({ onClose }) {
  return <Tile color="#25424C" className="home-skills-expanded h-full p-5 text-lemon" onClick={undefined}><button onClick={onClose} className="absolute right-5 top-5 z-10 p-2 focus:outline-none focus:ring-2 focus:ring-paper" aria-label="Close skills and tools"><ArrowIcon close className="h-10 w-10" /></button><div className="flex h-full flex-col gap-4 md:flex-row"><h2 className="font-display w-full text-4xl leading-[1.1] md:w-[330px] md:text-5xl">Skills &<br />Tools</h2><div className="flex flex-1 flex-wrap content-start gap-2 pr-16">{SKILLS.map((skill, index) => <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.035 }} className={`skill-logo flex h-[72px] w-[72px] items-center justify-center rounded-md p-1 ${['JavaScript', 'TypeScript', 'PHP', 'Next.js'].includes(skill.name) ? '' : 'bg-paper'}`} title={skill.name}><img src={getIconUrl(skill.icon)} alt={skill.name} className="h-full w-full object-contain" /></motion.div>)}<div className="ml-auto mt-3 w-full max-w-[390px] font-mono text-sm text-lemon"><h3 className="mb-2 text-base">Software Unrelated Skills:</h3>{UNRELATED_SKILLS.map((skill) => <p key={skill} className="mb-1">• {skill}</p>)}</div></div></div></Tile>;
}
