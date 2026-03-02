import { Link } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';

export const Joinpage = () => {
  return (
    <div>
      <Header />
       <div className="join-live-container">
      <a 
        href="https://meet.google.com/fch-feks-jdn" 
        className="live-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        🔴 Click Here to Join Live
      </a>
    </div>
      <Footer />
    </div>
  );
};


export default Joinpage;