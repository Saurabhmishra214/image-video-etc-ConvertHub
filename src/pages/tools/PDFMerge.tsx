import { useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import { ToolLayout } from '../../components/ToolLayout';
import { ProcessingStatus } from '../../components/ProcessingStatus';
import styles from './ToolPage.module.css';

interface PDFMergeProps {
  onBack: () => void;
}

export const PDFMerge = ({ onBack }: PDFMergeProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(prev => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;

    setStatus('processing');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStatus('success');
      setMergedPdfUrl('merged.pdf');
    } catch (error) {
      console.error('Merge error:', error);
      setStatus('error');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <ToolLayout
      title="Merge PDF Files"
      description="Combine multiple PDF files into one document"
      onBack={onBack}
    >
      <div className={styles.content}>
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>
            <Plus size={24} />
            Add PDF Files
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {files.length > 0 && (
          <div className={styles.fileList}>
            <h3 className={styles.listTitle}>Files to Merge ({files.length})</h3>
            {files.map((file, index) => (
              <div key={index} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className={styles.removeBtn}
                  aria-label="Remove file"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {files.length >= 2 && status === 'idle' && (
          <button onClick={handleMerge} className={styles.primaryBtn}>
            Merge {files.length} PDFs
          </button>
        )}

        <ProcessingStatus status={status} />

        {status === 'success' && mergedPdfUrl && (
          <div className={styles.result}>
            <p className={styles.successMessage}>
              Successfully merged {files.length} PDF files!
            </p>
            <button className={styles.downloadBtn}>
              <Download size={20} />
              Download Merged PDF
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
