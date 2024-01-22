/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const FadeAnimations = ({ direction, children, delay, once, duration }) => {
  //   console.log(direction);

  const variants = {
    initial: {
      x: direction === "right" ? -100 : direction === "left" ? 100 : 0,
      y: direction === "down" ? -100 : direction === "up" ? 100 : 0,
      opacity: 0,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: duration, delay: delay },
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: once }}
    >
      {children}
    </motion.div>
  );
};

export default FadeAnimations;
