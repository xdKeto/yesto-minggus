import { motion } from "framer-motion";
import Button from "./Button";

const ProjectCard = ({ project, projectVariants, link = "" }) => {
  console.log(link);
  return (
    <motion.div
      className="relative rounded-lg
            overflow-hidden h-[500px] transition transform will-change-transform"
      // initial="hidden"
      // whileInView="visible"
      // viewport={{ once: true, amount: 0.3 }}
      // variants={projectVariants}
    >
      <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />

      <div className="relative z-20 p-6 flex flex-col justify-between h-full bg-black/20 text-white">
        <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
        <div className="flex flex-col justify-between">
          <p className="mb-2 flex-grow text-xl font-semibold">{project.description}</p>
          <div className="flex flex-row flex-wrap">
            {project.technologies.map((tech, index) => (
              <span className="mr-2 mb-3 rounded bg-stone-900/70 p-2 text-sm font-medium text-stone-200" key={index}>
                {tech}
              </span>
            ))}
          </div>
          {link && <Button link={link}></Button>}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
