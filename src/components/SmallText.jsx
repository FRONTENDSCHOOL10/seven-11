import { string } from 'prop-types';

SmallText.propTypes = {
  title: string,
  color: string,
  href: string,
  font: string,
};

function SmallText({ title, color, href, font = 'text-sm' }) {
  const textStyle = ` ${color} ${font}`;

  if (href) {
    return (
      <a href={href} className={textStyle}>
        {title}
      </a>
    );
  }

  return <div className={textStyle}>{title}</div>;
}

export default SmallText;
