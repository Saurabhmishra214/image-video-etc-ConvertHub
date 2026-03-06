import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import style from '../../assets/JoinLive.module.css';


export const JoinPage = () => {
  return (
    <div className={style.joinPageContainer}>
      <Header />
      <main className={style.joinLiveContainer}>
        <a
          href="https://meet.google.com/fch-feks-jdn"
          className={style.liveBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          🔴 Click Here to Join Live
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default JoinPage;
