import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import LiveMatchPage from './pages/LiveMatch/live';
import { JoinPage } from './pages/LiveMatch/join';

type DefaultPage = 'home' | 'landing';
const DEFAULT_PAGE: DefaultPage = 'landing';

function App() {
  const defaultPageElement = DEFAULT_PAGE === 'home' ? <HomePage /> : <LandingPage />;

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={defaultPageElement} />
          <Route path="/" element={<HomePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/live" element={<LiveMatchPage />} />
          <Route path="/join" element={<JoinPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
