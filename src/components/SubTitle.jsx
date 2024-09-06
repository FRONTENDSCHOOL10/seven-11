import { string } from 'prop-types';

SubTitle.propTypes = {
  title: string,
};

function SubTitle({ title }) {
  return <h2 className=" text-lg font-semibold">{title}</h2>;
}

export default SubTitle;
