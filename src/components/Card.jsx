import { motion } from "framer-motion"; // Importamos motion de framer-motion
function Card({ value, flipped, onClick }) {
  return (
    <motion.div
    className={`card ${flipped ? "flipped" : ""}`}
    onClick={onClick}
    animate={{ rotateY: flipped ? 0 : 180 }}
    initial={{ rotateY: 180 }}
    transition={{duration:0.6, ease: "easeInOut"}}
    >
      {flipped ? <span className="blr">{value}</span> : <span>❓</span>}
    </motion.div>
  );
};
export default Card;
