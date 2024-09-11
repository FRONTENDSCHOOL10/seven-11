import { string } from 'prop-types';

SubTitle.propTypes = {
  title: string,
  font: string,
  color: string,
  fontFamily: string,
  fontWeight: string,
};

function SubTitle({
  title,
  font = 'text-[20px]',
  color = 'text-black',
  fontFamily,
  fontWeight,
}) {
  return (
    <div className={`font-bold ${font} ${color} ${fontFamily} ${fontWeight}`}>
      {title}
    </div>
  );
}

export default SubTitle;
