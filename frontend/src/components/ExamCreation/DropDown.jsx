/* eslint-disable react/prop-types */
import {motion, AnimatePresence} from "framer-motion";
const accordionVariants = {
  open: {height: "auto", opacity: 1},
  closed: {height: 0, opacity: 0},
};

function DropDown({open = true, show, children}) {
  return (
    <AnimatePresence>
      {open && show ? (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={accordionVariants}
          transition={{duration: 0.3}}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
}

export default DropDown;
