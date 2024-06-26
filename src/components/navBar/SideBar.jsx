import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  open: {
    x: 0,
    opacity: 1,
  },
  close: {
    x: -50,
    opacity: 0,
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  close: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const SideBar = ({
  handleDpp,
  handleNcert,
  handleNotes,
  handlePyqs,
  handleSyllabus,
  state,
  setOpen,
}) => {
  return (
    <motion.div
      className="link"
      variants={variants}
      animate={state ? "open" : "close"}
    >
      <motion.button
        onClick={() => {
          handleNotes();
          setOpen((prev) => !prev);
        }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        variants={itemVariants}
      >
        Notes
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          handleSyllabus();
          setOpen((prev) => !prev);
        }}
        variants={itemVariants}
      >
        Download Syllabus
      </motion.button>

      <motion.button
        onClick={() => {
          handleNcert();
          setOpen((prev) => !prev);
        }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        variants={itemVariants}
      >
        Ncert
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          handleDpp();
          setOpen((prev) => !prev);
        }}
        variants={itemVariants}
      >
        Daily Practice Problem(DPP)
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          handlePyqs();
          setOpen((prev) => !prev);
        }}
        variants={itemVariants}
      >
        Pyqs
      </motion.button>
    </motion.div>
  );
};

export default SideBar;
