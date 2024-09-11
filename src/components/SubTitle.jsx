import { string } from 'prop-types';

SubTitle.propTypes = {
  title: string,
};

function SubTitle({ title }) {
  return <div className=" text-[20px] font-bold  ">{title}</div>;
}

export default SubTitle;
