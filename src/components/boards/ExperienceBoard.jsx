import { useState } from 'react';
import Tile from '../common/Tile';
import SettingsPanel from '../experience/SettingsPanel';
import ExperienceCarousel from '../experience/ExperienceCarousel';
import { EDUCATION, EXPERIENCES, EXPERIENCE_QUOTE, UNRELATED_EXPERIENCE } from '../../constants/portfolioData';
import { getIconUrl } from '../../utils/assetLoader';

export default function ExperienceBoard({ onHome }) {
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState('normal');
  const [reverse, setReverse] = useState(false);
  const [fun, setFun] = useState(false);
  return <main className="tile-board"><div className="experience-board"><div className="experience-layout"><Tile color="#942911" className="experience-home flex flex-col justify-between p-4 text-paper" onClick={onHome}><span className="text-4xl">{'←'}</span><span className="text-3xl">Home</span></Tile><Tile color="#25424C" className="experience-block" /><div className="experience-settings"><SettingsPanel {...{ paused, setPaused, speed, setSpeed, reverse, setReverse, fun, setFun }} /></div><Tile color="#FFF0C2" className="experience-quote flex items-center justify-center p-6 text-center text-2xl text-charcoal"><span className="font-mono">{EXPERIENCE_QUOTE}</span></Tile><div className="experience-middle"><ExperienceCarousel experiences={EXPERIENCES} {...{ paused, speed, reverse, fun }} /></div><Tile color="#FFF0C2" className="experience-header board-title font-display text-4xl text-charcoal md:text-6xl">Experiences</Tile><Tile color="#942911" className="experience-education p-5 text-paper"><img src={getIconUrl('education.svg')} alt="" className="mb-10 h-12 w-12 brightness-0 invert" /><div className="mt-20"><h2 className="text-3xl">{EDUCATION.school}</h2><p className="font-mono text-xl text-lemon">{EDUCATION.program}</p><p className="mt-3">({EDUCATION.period})</p></div></Tile><Tile color="#C05640" className="experience-unrelated p-5 text-paper"><h2 className="font-mono text-2xl text-lemon">Software Unrelated Experience:</h2><h3 className="mt-5 text-xl">{'•'} {UNRELATED_EXPERIENCE.role}</h3><p className="font-mono text-sm">{UNRELATED_EXPERIENCE.company}</p><p className="font-mono text-sm">({UNRELATED_EXPERIENCE.period})</p></Tile></div></div></main>;
}
