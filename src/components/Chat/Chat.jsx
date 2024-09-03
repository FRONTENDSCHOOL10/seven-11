import LocationTime from './LocationTime';
import S from './Chat.module.css';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

Chat.propTypes = {
  imgURL: string.isRequired,
  roomName: string.isRequired,
  text: string.isRequired,
  updateTime: string.isRequired,
};

export default function Chat({ imgURL, roomName, text, updateTime, id }) {
  return (
    <div className={S.component}>
      <li className={S.listItem}>
        <Link to={`/home/chat/${id}}`}>
          <div className={S.container}>
            <img src={imgURL} alt="" className={S.logo} />
            <div className={S.textContainer}>
              <div className={S.titleContainer}>
                <h3 className={S.title}>{roomName}</h3>
                <LocationTime time={updateTime} />
              </div>
              <div className={S.message}>{text}</div>
            </div>
          </div>
        </Link>
      </li>
    </div>
  );
}
