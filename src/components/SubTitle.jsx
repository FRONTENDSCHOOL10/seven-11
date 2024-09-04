import { string } from 'prop-types';

SubTitle.propTypes = {
  title: string,
};

function SubTitle({ title }) {
  return (
    <section className="flex flex-col pl-3">
      <h2 className="text-lg font-semibold">{title}</h2>
    </section>
  );
}

export default SubTitle;
