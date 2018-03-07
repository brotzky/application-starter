import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ExclamationCircle } from '../../../ui/icons/index';

const AutoDeclineWrapper = styled.div`
  border-radius: 3px;
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.grey};
  box-sizing: border-box;
  margin-bottom: 2.5rem;
`;

const Heading = styled.h6`
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Subheading = styled.p`
  padding-left: 1.5rem;
  margin-bottom: 1rem;
`;

const StyledExclamationCircle = styled(ExclamationCircle)`
  margin-right: 1rem;
  circle {
    stroke: ${props => props.theme.colors.red};
  }
  line {
    stroke: ${props => props.theme.colors.red};
  }
`;

const Ul = styled.ul`
  list-style-position: outside;
  list-style: none;
  padding-left: 3.5rem;
  > li::before {
    position: absolute;
    left: -2rem;
    content: '-';
  }
`;

const List = styled.li`
  position: relative;
  padding: 0 1rem;
`;

class AccountSettingsAutoDeclined extends PureComponent {
  render() {
    const { autoDeclineReasons, complianceDeclineReasons } = this.props;
    return (
      <AutoDeclineWrapper>
        <Heading>
          <StyledExclamationCircle />Auto-declined
        </Heading>
        <Subheading>
          This application has been auto-declined due to the following reasons:
        </Subheading>
        <Ul>
          {autoDeclineReasons.map(reason => (
            <List key={reason.autoDeclinePrettyString}>
              {reason.autoDeclinePrettyString}
            </List>
          ))}
          {complianceDeclineReasons.map(reason => (
            <List key={reason}>{reason}</List>
          ))}
        </Ul>
      </AutoDeclineWrapper>
    );
  }
}
AccountSettingsAutoDeclined.propTypes = {
  autoDeclineReasons: PropTypes.arrayOf(PropTypes.object).isRequired,
  complianceDeclineReasons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  autoDeclineReasons: state.workbench.autoDeclineReasons || [],
  complianceDeclineReasons:
    state.workbench.quote.complianceDeclineReasons || [],
});

export default connect(mapStateToProps)(AccountSettingsAutoDeclined);
