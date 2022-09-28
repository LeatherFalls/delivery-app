import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
  labelName,
  labelText,
  inputType,
  dataTestId,
  placeHolder,
  inputValue,
  setter,
}) {
  return (
    <label htmlFor={ labelName }>
      { labelText }
      <input
        type={ inputType }
        data-testid={ dataTestId }
        placeholder={ placeHolder }
        value={ inputValue }
        onChange={ ({ target }) => setter(target.value) }
      />
    </label>
  );
}

Input.propTypes = {
  labelName: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  setter: PropTypes.func.isRequired,
};
