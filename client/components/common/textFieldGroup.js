import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ icon, value, onChange, id, type, name, label, error }) => {
  return (
    <div className="row">
      <div className="input-field s12">
        <i className="material-icons prefix">{icon}</i>
        <input 
          value={value}
          onChange={onChange}
          id={id} 
          type={type} 
          className="validate"
          name={name}
         
        />
        <label className={classnames('', {'red-text': error})} htmlFor={id}>{label}</label>
      </div>
      {error && <span className="red-text">{error}</span>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;