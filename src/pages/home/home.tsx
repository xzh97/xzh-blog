import defaultAvatar from '@/assets/images/avatar.jpg';
import './home.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/blog');
  };
  return (
    <div className="home-container">
      <div className="main">
        <div className="avatar-wrapper">
          <img className="avatar" src={defaultAvatar} alt="avatar" onClick={handleClick} />
        </div>
        <div className="nickname">夕至</div>
        <p className="slogan">何须仰望他人，自己亦是风景</p>
        <div className="external-link">暂无</div>
      </div>
    </div>
  );
};
export default Home;
