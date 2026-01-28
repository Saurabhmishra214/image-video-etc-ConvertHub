import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import styles from './ProcessingStatus.module.css';

interface ProcessingStatusProps {
  status: 'idle' | 'processing' | 'success' | 'error';
  progress?: number;
  message?: string;
}

export const ProcessingStatus = ({ status, progress = 0, message }: ProcessingStatusProps) => {
  if (status === 'idle') return null;

  return (
    <div className={styles.container}>
      {status === 'processing' && (
        <div className={styles.processing}>
          <Loader size={32} className={styles.spinner} />
          <h3 className={styles.title}>Processing your file...</h3>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className={styles.progress}>{progress}%</p>
        </div>
      )}

      {status === 'success' && (
        <div className={styles.success}>
          <CheckCircle size={48} className={styles.successIcon} />
          <h3 className={styles.title}>Success!</h3>
          <p className={styles.message}>{message || 'Your file is ready'}</p>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.error}>
          <AlertCircle size={48} className={styles.errorIcon} />
          <h3 className={styles.title}>Error</h3>
          <p className={styles.message}>{message || 'Something went wrong'}</p>
        </div>
      )}
    </div>
  );
};
