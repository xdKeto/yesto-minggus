import { motion } from "framer-motion";
import { PROJECTS } from "../constants";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  // const projectVariants = {
  //   hidden: {
  //     opacity: 0,
  //     scale: 0.8,
  //     rotate: -40,
  //     y: 50,
  //   },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     rotate: 0,
  //     y: 0,
  //     transition: {
  //       duration: 0.3,
  //       ease: "easeOut",
  //       type: "spring",
  //       bounce: 0.2,
  //     },
  //   },
  // };
  return (
    <section className="px-6 py-10" id="projects">
      <h1 className="text-charcoal text-4xl md:text-6xl font-medium tracking-tight mb-10"> Projects</h1>
      <div className="h-1 w-20 mb-8 bg-charcoal"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} link={project.link || ""} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
