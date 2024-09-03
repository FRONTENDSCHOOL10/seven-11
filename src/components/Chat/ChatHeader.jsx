import { number, string } from 'prop-types';
import BackIcon from './backIcon';
import HamburgerIcon from './HamburgerIcon';

ChatHeader.propType = {
  title: string.isRequired,
  people: number.isRequired,
};

export default function ChatHeader({ title, people }) {
  return (
    <header className="flex flex-row justify-between px-3 py-2">
      <BackIcon to={'/home/chat'} />
      <div className="flex flex-row gap-1 items-center">
        <h2 className="text-base">{title}</h2>
        <span className="font-semibold">{people}</span>
      </div>
      <HamburgerIcon />
    </header>
  );
}
