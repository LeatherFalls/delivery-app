import PropTypes from 'prop-types';
import globalContext from './globalContext';

function Provider({ children }) {
  return (
    <globalContext.Provider value={ test }>
      {children}
    </globalContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
