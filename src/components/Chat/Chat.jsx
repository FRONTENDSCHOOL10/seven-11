import LocationTime from './LocationTime';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

Chat.propTypes = {
  imgURL: string.isRequired,
  roomName: string.isRequired,
  text: string.isRequired,
  updateTime: string.isRequired,
  id: string.isRequired,
};

export default function Chat({ imgURL, roomName, text, updateTime, id }) {
  return (
    <div className="chat">
      <li>
        <Link to={`/home/chat/${id}}`}>
          <div className="container">
            <img src={imgURL} alt="" />
            <div className="textContainer">
              <div className="titleContainer">
                <h3>{roomName}</h3>
                <LocationTime time={updateTime} />
              </div>
              <div className="message">{text}</div>
            </div>
          </div>
        </Link>
      </li>
    </div>
  );
}
