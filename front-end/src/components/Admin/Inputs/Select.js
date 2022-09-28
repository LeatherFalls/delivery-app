import React from 'react';
import PropTypes from 'prop-types';

export default function Select({ setter }) {
  return (
    <label htmlFor="role">
      Role
      <select
        name="role"
        id="role"
        data-testid="admin_manage__select-role"
        onChange={ ({ target }) => setter(target.value) }
      >
        <option>administrator</option>
        <option>customer</option>
        <option>seller</option>
      </select>
    </label>
  );
}

Select.propTypes = {
  setter: PropTypes.func.isRequired,
};
