// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { featureSelector } from 'gac-utils/selectors';

/**
 * <Flag />
 * A utility component that handles rendering and hiding of features. Certain
 * features are behind flags to allow for easier release schedules, testing,
 * beta testing, and configuration for our partners.
 * 
 * Usage:
 * 
 * 1. Render by children. If the flag is enabled the children will get rendered
 * <Flag name="nameOfFlag">
 *  children
 * </Flag>
 * 
 * 2. Render through components with a fallback
 * a)
 * <Flag
 *   name="nameOfFlag"
 *   componentFallback={<FallBack />}
 * >
 *  children
 * </Flag>
 * 
 * b)
 * <Flag
 *   name="nameOfFlag"
 *   component={<Feature />}
 *   componentFallback={<FallBack />}
 * />
 * 
 * 3. Render with render props
 * <Flag
 *   name="nameOfFlag"
 *   render={() => <Feature />}
 *   renderFallback={() => <FallBack />}
 * />
 * 
 */

function handleRender(props, component, render) {
  if (component) {
    return React.createElement(component, props);
  }

  if (render) {
    return render(props);
  }

  return null;
}

class Flag extends Component {
  render() {
    const {
      children,
      featureIsEnabled,
      component,
      componentFallback,
      render,
      renderFallback,
      ...rest
    } = this.props;

    /**
     * If the user hs enabled toe feature flag and we're passing children
     * we should render the children within the <Flag>children</Flag> component
     */
    if (featureIsEnabled && children) {
      return children;
    }

    /**
     * If the user has enabled the feature flag and we're passing a component or a
     * render prop we need to handle how to render that.
     */
    if (featureIsEnabled) {
      return handleRender(...rest, component, render) || null;
    }

    // Fall back, render the fallback options or just return null
    return handleRender(...rest, componentFallback, renderFallback) || null;
  }
}

Flag.defaultProps = {
  children: null,
  name: '',
  featureIsEnabled: false,
  component: null,
  componentFallback: null,
  render: null,
  renderFallback: null,
};

Flag.propTypes = {
  children: PropTypes.element,
  featureIsEnabled: PropTypes.bool.isRequired,
  component: PropTypes.element,
  componentFallback: PropTypes.element,
  render: PropTypes.func,
  renderFallback: PropTypes.func,
};

/**
 * featureSelector will check if the feature flag name provided from backend is enabled
 * and will return featureIsEnabled, a boolean, that will dictate what gets rendered.
 */
const mapStateToProps = (state, ownProps) => ({
  featureIsEnabled: featureSelector(state, ownProps.name),
});

export default connect(mapStateToProps)(Flag);
