import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ImageCompress } from './pages/tools/ImageCompress';
import { PDFMerge } from './pages/tools/PDFMerge';

function App() {
  const [currentTool, setCurrentTool] = useState<string | null>(null);

  const handleToolSelect = (toolId: string) => {
    setCurrentTool(toolId);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentTool(null);
    window.scrollTo(0, 0);
  };

  const renderTool = () => {
    switch (currentTool) {
      case 'image-compress':
        return <ImageCompress onBack={handleBackToHome} />;
      case 'pdf-merge':
        return <PDFMerge onBack={handleBackToHome} />;
      default:
        return <HomePage onToolSelect={handleToolSelect} />;
    }
  };

  return (
    <ThemeProvider>
      <Header />
      <main>
        {renderTool()}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
