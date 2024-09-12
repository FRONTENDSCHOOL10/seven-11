import { node } from 'prop-types';
import { memo } from 'react';

EditTitle.propTypes = {
  children: node.isRequired,
};

function EditTitle({ children }) {
  return <span className="block font-semibold text-base">{children}</span>;
}

export default memo(EditTitle);
