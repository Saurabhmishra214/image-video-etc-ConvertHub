import { Github, Twitter, Mail } from 'lucide-react';
import styles from '../../assets/Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3 className="gradient-text">FileConvert Pro</h3>
            <p className={styles.description}>
              Free online tools for file conversion and editing. Fast, secure, and easy to use.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Tools</h4>
            <ul className={styles.links}>
              <li><a href="#image">Image Tools</a></li>
              <li><a href="#video">Video Tools</a></li>
              <li><a href="#pdf">PDF Tools</a></li>
              <li><a href="#audio">Audio Tools</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Company</h4>
            <ul className={styles.links}>
              <li><a href="#about">About Us</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Legal</h4>
            <ul className={styles.links}>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2024 FileConvert Pro. All rights reserved.</p>
          <p className={styles.security}>
            All files are processed securely and deleted after 24 hours
          </p>
        </div>
      </div>
    </footer>
  );
};
