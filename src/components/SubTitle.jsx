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
  font = '20px',
  color = 'black',
  fontFamily,
  fontWeight,
}) {
  return (
    <div
      className=" font-bold  "
      style={{
        fontSize: font,
        color: color,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
      }}
    >
      {title}
    </div>
  );
}

export default SubTitle;
