import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <motion.a
          href="https://www.instagram.com/yaa.its.vishwa"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
            style={styles.icon}
          />
          @yaa.its.vishwa
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/vishwanath-s27/"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            alt="LinkedIn"
            style={styles.icon}
          />
          Vishwanath S
        </motion.a>
        <motion.a
          href="https://github.com/vishwa010305"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            alt="GitHub"
            style={styles.icon}
          />
          Vishwa's Project
        </motion.a>
        <motion.p
          style={styles.text}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          &copy; valtroy 2024
        </motion.p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    borderTop: '2px solid rgba(237, 85, 101, 0.5)',
    backgroundColor: 'brown',
    color: '#F5F7FA',
    fontFamily: 'Open Sans, sans-serif',
    padding: '1rem 0',
  },
  container: {
    width: '80%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  text: {
    fontSize: '1rem',
    color: '#F5F7FA',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    color: '#F5F7FA',
    textDecoration: 'none',
    fontSize: '1rem',
    gap: '0.5rem',
    transition: 'transform 0.2s',
  },
  icon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
  },
};

export default Footer;
