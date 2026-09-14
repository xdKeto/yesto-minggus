import { motion } from 'framer-motion';

export default function Tile({ children, className = '', color = 'charcoal', onClick, ...props }) {
  const Component = onClick ? motion.button : motion.div;
  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`tile relative text-left ${className}`}
      style={{ backgroundColor: color }}
      tabIndex={onClick ? 0 : props.tabIndex}
      whileHover={onClick ? { scale: 0.985, filter: 'brightness(1.05)' } : undefined}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </Component>
  );
}
