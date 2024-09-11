import { string } from 'prop-types';

SmallText.propTypes = {
  title: string,
  color: string,
  href: string,
  font: string,
};

function SmallText({ title, color, href, font }) {
  const textStyle = `text-sm ${color} ${font}`;

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
