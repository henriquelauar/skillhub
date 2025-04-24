// components/AnimatedPage.tsx
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div {...animations}>
    {children}
  </motion.div>
);

export default AnimatedPage;