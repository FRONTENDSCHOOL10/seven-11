import { string } from 'prop-types';

EditTitle.propTypes = {
  children: string.isRequired,
};

export default function EditTitle({ children }) {
  return <span className="block font-semibold text-base">{children}</span>;
}
