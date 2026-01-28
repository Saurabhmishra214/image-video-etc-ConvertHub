import { type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './ToolLayout.module.css';

interface ToolLayoutProps {
  title: string;
  description: string;
  onBack: () => void;
  children: ReactNode;
}

export const ToolLayout = ({ title, description, onBack, children }: ToolLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          <ArrowLeft size={20} />
          Back to Tools
        </button>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
