import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  userPropType,
  orgPropType,
  workbenchPropType,
  dispatchPropType,
  paramsPropType,
} from 'gac-utils/proptypes';
import { productApplication } from 'grow-utils/productApplicationUtils';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { showModal } from '../../../ui/modal/actions/actions-modal';
import { FadeIn } from '../../../ui/transitions/';
import { Button } from '../../../ui/components';
import { ChevronDown } from '../../../ui/icons';
import {
  handleClaimClick,
  handleUnclaimClick,
} from '../../../../utils/claim-unclaim';
import WorkbenchShellOverview from '../components/WorkbenchShellOverview';

const ButtonSpacer = styled.div`
  display: inline-block;
  margin-left: 6px;
`;

const ChevronContainer = styled.span`
  display: inline-block;
  margin-left: 1rem;
  transform: rotate(${props => (props.show ? '180' : '0')}deg);
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  background: #fff;
  padding: 1.7rem 2.8125rem;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  font-size: 2.2rem;
  font-weight: 600;
  cursor: pointer;
`;
class WorkbenchShellHeader extends PureComponent {
  state = {
    showOverview: false,
  };

  toggleDetails = () => {
    this.setState({ showOverview: !this.state.showOverview });
  };

  render() {
    const { dispatch, member, params, workbench, user, org } = this.props;
    const { showOverview } = this.state;
    const Application = productApplication(org, this.props.workbench);
    const userHasClaimedApplication = workbench.primaryRep.email === user.email;

    return (
      <div>
        <HeaderContainer>
          <Header onClick={this.toggleDetails}>
            {capitalizeString(params.workbenchProduct, '-', ' ')} Application{' '}
            <ChevronContainer
              id="WorkbenchShellHeaderChevron"
              show={showOverview}
            >
              <ChevronDown width="12" height="12" />
            </ChevronContainer>
          </Header>
          <FadeIn>
            {!workbench.isFetching && (
              <div style={{ display: 'flex' }}>
                <Button
                  onClick={() =>
                    dispatch(
                      showModal('QUEUE_ASSIGN_APPLICATION_MODAL', {
                        application: Application,
                      }),
                    )
                  }
                  text="Assign"
                  id="Assign"
                  appearance="transparent"
                  permission="CLAIM_UNCLAIM_APPLICATION"
                />
                <ButtonSpacer>
                  <Button
                    onClick={() =>
                      userHasClaimedApplication
                        ? handleUnclaimClick(dispatch, Application)
                        : handleClaimClick(dispatch, Application, user.email)
                    }
                    appearance={
                      userHasClaimedApplication ? 'secondary' : 'primary'
                    }
                    isSubmitting={member.isUpdating}
                    text={userHasClaimedApplication ? 'Unclaim' : 'Claim'}
                    id={userHasClaimedApplication ? 'Unclaim' : 'Claim'}
                    permission="CLAIM_UNCLAIM_APPLICATION"
                  />
                </ButtonSpacer>
              </div>
            )}
          </FadeIn>
        </HeaderContainer>
        {showOverview && <WorkbenchShellOverview params={params} />}
      </div>
    );
  }
}

WorkbenchShellHeader.propTypes = {
  dispatch: dispatchPropType.isRequired,
  user: userPropType.isRequired,
  org: orgPropType.isRequired,
  workbench: workbenchPropType.isRequired,
  params: paramsPropType.isRequired,
};

const mapStateToProps = state => ({
  workbench: state.workbench,
  user: state.user,
  org: state.auth.organization,
  member: state.member,
});

export default connect(mapStateToProps)(WorkbenchShellHeader);
