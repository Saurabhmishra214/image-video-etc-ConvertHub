import { type LucideIcon } from 'lucide-react';
import styles from './ToolCard.module.css';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export const ToolCard = ({ icon: Icon, title, description, onClick }: ToolCardProps) => {
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <Icon size={28} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </button>
  );
};
