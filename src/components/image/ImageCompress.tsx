import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Download } from 'lucide-react';
import { ToolLayout } from '../common/ToolLayout';
import { FileUpload } from '../common/FileUpload';
import { ProcessingStatus } from '../common/ProcessingStatus';
import styles from '../../assets/ToolPage.module.css';

interface ImageCompressProps {
  onBack: () => void;
}

export const ImageCompress = ({ onBack }: ImageCompressProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setCompressedFile(null);
    setStatus('idle');
  };

  const handleCompress = async () => {
    if (!file) return;

    setStatus('processing');
    setProgress(0);

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        quality: quality / 100,
        onProgress: (p: number) => setProgress(p),
      };

      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
      setCompressedSize(compressed.size);
      setStatus('success');
      setProgress(100);
    } catch (error) {
      console.error('Compression error:', error);
      setStatus('error');
    }
  };

  const handleDownload = () => {
    if (!compressedFile) return;

    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-${file?.name || 'image'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const compressionRatio = originalSize && compressedSize
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <ToolLayout
      title="Compress Images"
      description="Reduce image file size without losing quality"
      onBack={onBack}
    >
      <div className={styles.content}>
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedFormats="image/*"
          maxSizeMB={50}
        />

        {file && status === 'idle' && (
          <div className={styles.options}>
            <div className={styles.option}>
              <label className={styles.label}>
                Quality: {quality}%
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className={styles.slider}
                />
              </label>
            </div>

            <button onClick={handleCompress} className={styles.primaryBtn}>
              Compress Image
            </button>
          </div>
        )}

        <ProcessingStatus status={status} progress={progress} />

        {status === 'success' && compressedFile && (
          <div className={styles.result}>
            <div className={styles.comparison}>
              <div className={styles.sizeInfo}>
                <span className={styles.label}>Original:</span>
                <span className={styles.value}>{formatFileSize(originalSize)}</span>
              </div>
              <div className={styles.sizeInfo}>
                <span className={styles.label}>Compressed:</span>
                <span className={styles.value}>{formatFileSize(compressedSize)}</span>
              </div>
              <div className={styles.savings}>
                Saved {compressionRatio}%
              </div>
            </div>

            <button onClick={handleDownload} className={styles.downloadBtn}>
              <Download size={20} />
              Download Compressed Image
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
