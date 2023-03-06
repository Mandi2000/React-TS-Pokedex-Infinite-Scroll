import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FooterPokemon.module.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const FooterPokemon: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <a href="https://github.com/Mandi2000">GitHub <FaGithub className={styles.icon}/></a>
          </li>
          <li className={styles.navItem}>
          <a href="https://www.linkedin.com/in/armando-ariel-vera-lavigne/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className={styles.icon} />
          </a>
          </li>
        </ul>
      </nav>
      <p className={styles.credit}>
        Powered by <a href="https://pokeapi.co/">PokéAPI</a>
      </p>
    </footer>
  );
};

