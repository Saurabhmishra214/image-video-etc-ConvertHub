import { Link } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';

export const LandingPage = () => {
  return (
    <div>
      <Header />
      <div
      style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '3rem 1.5rem',
        }}
        >
      <h1 style={{ marginBottom: '0.5rem' }}>Welcome to ConvertHub</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Choose a tool below to continue.
      </p>

      <Link
        to="/live"
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          padding: '1.25rem',
          boxShadow: 'var(--shadow-md)',
          transition: 'transform 0.15s ease',
          backgroundColor: 'var(--bg-secondary)',
          maxWidth: 360,
        }}
      >
        <h2 style={{ margin: '0 0 0.5rem 0' }}>Live Match</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Open live match page
        </p>
      </Link>
      </div>
      <Footer />
    </div>
  );
};
