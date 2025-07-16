import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Button from "./Button";

const imageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const springValues = {
  damping: 15,
  stiffness: 100,
  mass: 2,
};

const ProjectCard = ({ project, link =""}) => {
  // --- Hover effect state ---
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const rotateAmplitude = 11;
  const scaleOnHover = 1.1;

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }
  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }
  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={ref}
      className="w-full h-full [perspective:800px] flex items-center justify-center"
      style={{
        height: "100%",
        width: "100%",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-lg overflow-hidden h-[400px] w-[500px] transition transform will-change-transform"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={imageVariants}
      >
        <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
        <div className="relative z-20 p-6 flex flex-col justify-between h-full bg-black/20 text-white">
          <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
          <div className="flex flex-col justify-between">
            <p className="mb-2 flex-grow text-sm md:text-lg font-semibold">{project.description}</p>
            <div className="flex flex-row flex-wrap">
              {project.technologies.map((tech, index) => (
                <span className="mr-2 mb-3 rounded bg-stone-900/70 p-2 text-xs md:text-sm font-medium text-stone-200" key={index}>
                  {tech}
                </span>
              ))}
            </div>
            {link && <Button link={link}></Button>}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
