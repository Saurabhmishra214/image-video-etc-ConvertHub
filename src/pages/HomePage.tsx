import { Image, Video, FileText, Music, Search, Zap, Shield, Clock } from 'lucide-react';
import { ToolCard } from '../components/ToolCard';
import styles from './HomePage.module.css';

interface HomePageProps {
  onToolSelect: (tool: string) => void;
}

export const HomePage = ({ onToolSelect }: HomePageProps) => {
  const imageTools = [
    { icon: Image, title: 'Compress Images', description: 'Reduce image file size without losing quality', id: 'image-compress' },
    { icon: Image, title: 'Resize Images', description: 'Change image dimensions with aspect ratio lock', id: 'image-resize' },
    { icon: Image, title: 'Convert Images', description: 'Convert between PNG, JPG, WebP, and GIF', id: 'image-convert' },
  ];

  const videoTools = [
    { icon: Video, title: 'Compress Video', description: 'Reduce video file size with quality presets', id: 'video-compress' },
    { icon: Video, title: 'Convert Video', description: 'Convert between MP4, AVI, MOV, WebM, MKV', id: 'video-convert' },
    { icon: Video, title: 'Trim Video', description: 'Cut and trim video clips easily', id: 'video-trim' },
  ];

  const pdfTools = [
    { icon: FileText, title: 'Compress PDF', description: 'Reduce PDF file size efficiently', id: 'pdf-compress' },
    { icon: FileText, title: 'Merge PDF', description: 'Combine multiple PDFs into one', id: 'pdf-merge' },
    { icon: FileText, title: 'Split PDF', description: 'Extract pages from PDF files', id: 'pdf-split' },
  ];

  const audioTools = [
    { icon: Music, title: 'Trim Audio', description: 'Cut and trim audio files', id: 'audio-trim' },
    { icon: Music, title: 'Convert Audio', description: 'Convert between MP3, WAV, OGG, M4A, FLAC', id: 'audio-convert' },
    { icon: Music, title: 'Compress Audio', description: 'Reduce audio file size', id: 'audio-compress' },
  ];

  const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'Process files in seconds with our optimized algorithms' },
    { icon: Shield, title: 'Secure & Private', description: 'Files are automatically deleted after 24 hours' },
    { icon: Clock, title: 'No Registration', description: 'Start converting files immediately, no sign-up needed' },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Free Online <span className="gradient-text">File Converter</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Convert, compress, and edit your images, videos, PDFs, and audio files. Fast, secure, and completely free.
          </p>
          <div className={styles.searchBox}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for a tool..."
              className={styles.searchInput}
            />
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <feature.icon size={24} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tools" className={styles.toolsSection}>
        <div className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>
            <Image size={28} className={styles.categoryIcon} />
            Image Tools
          </h2>
          <div className={styles.toolGrid}>
            {imageTools.map((tool) => (
              <ToolCard
                key={tool.id}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                onClick={() => onToolSelect(tool.id)}
              />
            ))}
          </div>
        </div>

        <div className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>
            <Video size={28} className={styles.categoryIcon} />
            Video Tools
          </h2>
          <div className={styles.toolGrid}>
            {videoTools.map((tool) => (
              <ToolCard
                key={tool.id}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                onClick={() => onToolSelect(tool.id)}
              />
            ))}
          </div>
        </div>

        <div className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>
            <FileText size={28} className={styles.categoryIcon} />
            PDF Tools
          </h2>
          <div className={styles.toolGrid}>
            {pdfTools.map((tool) => (
              <ToolCard
                key={tool.id}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                onClick={() => onToolSelect(tool.id)}
              />
            ))}
          </div>
        </div>

        <div className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>
            <Music size={28} className={styles.categoryIcon} />
            Audio Tools
          </h2>
          <div className={styles.toolGrid}>
            {audioTools.map((tool) => (
              <ToolCard
                key={tool.id}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                onClick={() => onToolSelect(tool.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
