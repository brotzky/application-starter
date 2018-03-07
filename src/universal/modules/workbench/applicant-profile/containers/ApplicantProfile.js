import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroy, initialize } from 'redux-form';
import ApplicantProfileSection from '../components/ApplicantProfileSection';
import metadataDeconstructor from '../../../forms/utils/metadataDeconstructor';
import { FadeIn } from '../../../ui/transitions';

class ApplicantProfile extends Component {
  state = {
    formIsInitialized: false,
  };

  componentDidMount() {
    if (this.props.workbenchConfig.isLoaded) {
      this.initializeMetadataForm();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.workbench.metadataIsLoaded !==
      prevProps.workbench.metadataIsLoaded
    ) {
      this.initializeMetadataForm();
    }

    /**
     * Required to re-initialize the form data when the application
     * is joint with 2 or more users on it.
     */
    if (this.props.member.id !== prevProps.member.id) {
      this.initializeMetadataForm();
    }
  }

  componentWillUnmount() {
    // Manually destroying the form on unmount, just in case
    this.props.dispatch(destroy('workbench'));
  }

  initializeMetadataForm() {
    const { dispatch, member, workbench } = this.props;
    const data = metadataDeconstructor(workbench.metadata, member.id);

    dispatch(initialize('workbench', data, true));
    this.setState({ formIsInitialized: true });
  }

  render() {
    const { params, workbenchConfig } = this.props;
    const config = workbenchConfig.config[params.profileSection];

    // If there's no config set yet don't both rendering anything
    if (config === undefined || !this.state.formIsInitialized) return null;

    return (
      <FadeIn>
        <ApplicantProfileSection config={config} />
      </FadeIn>
    );
  }
}

const mapStateToProps = state => ({
  workbench: state.workbench,
  member: state.member.member,
  organization: state.auth.organization,
  workbenchConfig: state.configs.workbench,
});

export default connect(mapStateToProps)(ApplicantProfile);
