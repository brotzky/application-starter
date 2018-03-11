import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_APP_CONFIG_SUCCESS } from '../../../configs/constants';
/**
 * AppConfig
 * Responsible for dynamically loading partner app configs that are
 * loaded through the redux store at state.configs.app
 */
class AppConfig extends Component {
  state = {
    loaded: false,
  };

  componentDidMount() {
    this.importAppConfig();
  }

  handleSuccessfulImport = response => {
    if (response.default) {
      this.props.dispatch({
        type: GET_APP_CONFIG_SUCCESS,
        payload: response.default,
      });
      this.setState({ loaded: true });
    }
  };

  handleFailedImport = async () => {
    try {
      const defaultConfig = await import('../../../configs/default/app.config.js');
      this.handleSuccessfulImport(defaultConfig);
    } catch (error) {
      throw new Error(
        `${error}. Failed to load default app config for ${this.props.org}`,
      );
    }
  };

  importAppConfig = async () => {
    try {
      const config = await import(`../../../configs/organizations/${this.props.org.toLowerCase()}/app/index.js`);
      this.handleSuccessfulImport(config);
    } catch (error) {
      console.error(`Could not load ${this.props.org} app config. ${error}`); // eslint-disable-line
      this.handleFailedImport(error);
    }
  };

  render() {
    return this.props.render(this.state);
  }
}

const mapStateToProps = state => ({
  workbench: state.workbench,
  // tailor made for 1st choice until we have a better solution
  org:
    state.auth.organization === '_1STCHOICE'
      ? '1stchoice'
      : state.auth.organization,
});

export default connect(mapStateToProps)(AppConfig);
