import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import HomeBoard from './components/boards/HomeBoard';
import ProjectsBoard from './components/boards/ProjectsBoard';
import ExperienceBoard from './components/boards/ExperienceBoard';

function App() {
  const [currentBoard, setCurrentBoard] = useState('home');
  return <><Analytics /><AnimatePresence mode="wait" initial={false}>{currentBoard === 'home' && <motion.div key="home" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}><HomeBoard onNavigate={setCurrentBoard} /></motion.div>}{currentBoard === 'projects' && <motion.div key="projects" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}><ProjectsBoard onHome={() => setCurrentBoard('home')} /></motion.div>}{currentBoard === 'experience' && <motion.div key="experience" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}><ExperienceBoard onHome={() => setCurrentBoard('home')} /></motion.div>}</AnimatePresence></>;
}

export default App;
