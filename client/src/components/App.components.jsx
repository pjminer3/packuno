import React from 'react';
import Trip from '../components/Trip.component';
import Dashboard from '../components/Dashboard.component';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loggedInAsync as LoggedIn } from '../actions/login.actions';

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.LoggedIn();
  }

  renderComponents() {
    console.log(this.props.isLoggedIn);
    if (this.props.isLoggedIn === 'true') {
      return (
      <Router>
        <div>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/trip">Trip</Link></li>
        </ul>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/trip" component={Trip} />
      </div>
      </Router>
      );
    }
    return null;
  }
  render() {
    return (<div>{this.renderComponents()}</div>);
  }
}

const mapStateToProps = (state, ownProps) =>
  ({
    isLoggedIn: state.login,
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    LoggedIn: () => {
      dispatch(LoggedIn());
    },
  });

const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
export default App;

