import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
const LiveMatchPage = () => {
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
      <h1 style={{ marginBottom: '0.5rem' }}>Live Match Page</h1>
      <p style={{ color: 'var(--text-secondary)' }}>
        You are now on the live match page.
      </p>
    </div>
    <Footer />
    </div>

  );
};

export default LiveMatchPage;
