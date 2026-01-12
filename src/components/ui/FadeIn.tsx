import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  delay?: number;
  className?: string;
}

export const FadeIn = ({
  children,
  delay = 0,
  className,
}: PropsWithChildren<FadeInProps>) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};
