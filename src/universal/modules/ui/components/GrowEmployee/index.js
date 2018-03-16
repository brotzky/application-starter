import { connect } from 'react-redux';
import isGrowEmployee from 'gac-utils/isGrowEmployee';

const GrowEmployee = ({ email, children }) =>
  isGrowEmployee(email) ? children : null;

const mapStateToProps = state => ({ email: state.user.email });

export default connect(mapStateToProps)(GrowEmployee);
