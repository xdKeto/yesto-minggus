import { motion } from "framer-motion";
import jason from "../assets/yesto.jpg";
import { HERO_CONTENT } from "../constants";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const imageVariants = {
  hidden: { clipPath: "inset(0 50% 0 50%" },
  visible: {
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const Hero = () => {
  return (
    <section>
      <div className="relative z-10 min-h-screen flex flex-col-reverse md:flex-row items-center justify-center text-white md:mt-6 space-y-4 md:space-y-0">
        <motion.div className="w-full md:w-1/2 px-8 py-4" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h1 className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] font-semibold  text-xl md:text-2xl lg:text-2xl my-4 md:my-8" variants={textVariants}>
            {HERO_CONTENT.greeting}
          </motion.h1>
          <motion.h1 className="text-charcoal drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.6)] font-bold text-4xl md:text-5xl lg:text-6xl my-2 md:my-4" variants={textVariants}>
            I'm Yestoya,
          </motion.h1>
          <motion.p className="text-xl text-black
           md:text-2xl lg:text-4xl lg:mb-6 md:mb-4" variants={textVariants}>
            {HERO_CONTENT.introduction}
          </motion.p>
          <motion.p className="text-xl text-black md:text-2xl lg:text-4xl" variants={textVariants}>
            currently studying Computer Science at <a href="https://www.petra.ac.id" className="text-sienna font-semibold drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.5)]">Petra Christian University</a>
          </motion.p>
          <motion.a className="bg-white font-semibold text-black p-3 lg:p-4 mt-4 md:mt-8 inline-block rounded-2xl" href={HERO_CONTENT.resumeLink} download rel="noopener noreferrer" target="_blank" variants={textVariants}>
            {HERO_CONTENT.resumeLinkText}
          </motion.a>
        </motion.div>

        <motion.div className="w-full md:w-1/2 px-8 py-4" initial="hidden" animate="visible" variants={imageVariants}>
          <img src={jason} width={650} height={650} className="rounded-3xl" alt="Hero Image" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
