import styles from '../../styles/components/Button.module.css'
import { motion } from 'framer-motion';

export default function Button({ title, icon, onClick, href }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}

            className={styles.button}
            onClick={onClick}
        >
            {title && <a href={href}> {title} {icon && <i className={icon} />}</a>}
        </motion.div>
    );

}

export function FloatingButton({ hoverTitle, title, icon, onClick }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}

            className={styles.floatingButton}
            onClick={onClick}
            title={hoverTitle}
        >
            <a><i className={icon} /> {title}</a>
        </motion.div>
    );
}