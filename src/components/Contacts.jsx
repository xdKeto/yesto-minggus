import { motion } from "framer-motion";
import { CONTACT_CONTENT } from "../constants";
import { RiGithubFill, RiLinkedinFill, RiTwitterXFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa6";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiLinkedin, FiTwitter } from "react-icons/fi";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay,
    },
  }),
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay,
    },
  }),
};

const Contacts = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-10" id="contact">
      <h2 className="text-charcoal text-4xl md:text-6xl font-medium tracking-tight mb-10">Contact</h2>
      <div className="h-1 w-20 bg-charcoal mb-8"></div>

      <motion.h3 className="text-falu text-5xl sm:text-6xl md:text-8xl leading-none font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" initial="hidden" whileInView="visible" custom={0.4} variants={textVariants}>
        {CONTACT_CONTENT.headline}
      </motion.h3>

      <motion.p className="text-lg md:text-2xl mt-6 max-w-3xl" initial="hidden" whileInView="visible" custom={0.6} variants={textVariants}>
        {CONTACT_CONTENT.description}
      </motion.p>

      <motion.a href={`mailto:${CONTACT_CONTENT.email}`} className="text-lg md:text-3xl font-medium mt-8" initial="hidden" whileInView="visible" custom={0.8} variants={textVariants}>
        {CONTACT_CONTENT.email}
      </motion.a>

      <div className="flex space-x-6 mt-8">
        {CONTACT_CONTENT.socialLinks.map((link, index)=>{
            const Icon =
                link.icon === "RiTwitterXFill" ? FaInstagram : link.icon === "RiGithubFill" ? FaGithub : FiLinkedin;
                return (
                    <motion.a key={link.platform} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    initial="hidden"
                    whileInView="visible"
                    custom={1.0 + index * 0.2}
                    variants={iconVariants}
                    aria-label={link.ariaLabel}>
                        <Icon size={36}/>
                    </motion.a>
                )
        })}
      </div>

      <motion.p className="text-sm text-stone-500 mt-36"
      initial="hidden"
      whileInView="visible"
      custom={1.6}
      variants={textVariants}>
        {CONTACT_CONTENT.footerText}
      </motion.p>

    </section>
  );
};

export default Contacts;
