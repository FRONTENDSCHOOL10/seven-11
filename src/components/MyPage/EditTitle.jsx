import { node } from 'prop-types';

EditTitle.propTypes = {
  children: node.isRequired,
};

export default function EditTitle({ children }) {
  return <span className="block font-semibold text-base">{children}</span>;
}
