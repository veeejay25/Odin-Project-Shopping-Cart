import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.text}>
            Built with 🤖 by{' '}
            <a 
              href="https://github.com/veeejay25" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              @veeejay25
            </a>
          </p>
          <div className={styles.divider}>|</div>
          <p className={styles.project}>
            <a 
              href="https://github.com/veeejay25/Odin-Project-Shopping-Cart#" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              View on GitHub
            </a>
          </p>
        </div>
        <p className={styles.copyright}>
          © 2024 ShopHub. Part of The Odin Project
        </p>
      </div>
    </footer>
  );
};

export default Footer;