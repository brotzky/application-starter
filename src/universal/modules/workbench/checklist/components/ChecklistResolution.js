import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChecklistItem } from 'grow-actions/checklist/checklist';
import ChecklistModalPlaceholder from './ChecklistModalPlaceholder';
import ChecklistResolutionForm from './ChecklistResolutionForm';
import ChecklistResolutionIncomplete from './ChecklistResolutionIncomplete';
import { FadeIn } from '../../../ui/transitions';
import { Ex } from '../../../ui/icons/';

class ChecklistResolution extends Component {
  componentWillMount() {
    const { checklistItem, dispatch, params } = this.props;
    return dispatch(
      getChecklistItem(
        params.workbenchId,
        checklistItem.id,
        checklistItem.name,
      ),
    );
  }

  render() {
    const {
      checklistDetails,
      checklistItem,
      isFetchingDetails,
      handleCloseActionMenu,
      near,
    } = this.props;
    const detailsExist = checklistDetails.hasOwnProperty(checklistItem.name);
    const checklistItemDetails =
      detailsExist && checklistDetails[checklistItem.name];

    return (
      <div className={`ChecklistResolution ChecklistResolution${near}`}>
        <Ex className="ChecklistResolution__ex" />
        <header className="ChecklistResolution__header">
          <h4 className="ChecklistResolution__header-heading">
            {checklistItem.prettyName}
          </h4>
        </header>
        {(() => {
          if (isFetchingDetails) {
            return <ChecklistModalPlaceholder />;
          } else if (checklistItemDetails && !isFetchingDetails) {
            return (
              <FadeIn>
                <ChecklistResolutionForm
                  handleCloseActionMenu={handleCloseActionMenu}
                  {...this.props}
                />
              </FadeIn>
            );
          } else if (!checklistItemDetails && !isFetchingDetails) {
            return (
              <ChecklistResolutionIncomplete
                checklistItem={checklistItem}
                handleCloseActionMenu={handleCloseActionMenu}
              />
            );
          }
        })()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  checklistDetails: state.checklist.checklistDetails,
  isFetchingDetails: state.checklist.isFetchingDetails,
  member: state.member.member,
});

export default connect(mapStateToProps)(ChecklistResolution);
