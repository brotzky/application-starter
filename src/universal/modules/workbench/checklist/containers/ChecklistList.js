import React from 'react';
import PropTypes from 'prop-types';
import ChecklistItem from './ChecklistItem';

const ChecklistList = props => {
  const {
    checklist,
    checklistDetails,
    isFetchingDetails,
    params,
    showChecklistDetails,
    isUserClaimer,
  } = props;

  return (
    <ul className="ChecklistList">
      {checklist
        .filter(list => list.userIds.includes(params.memberId))
        .map(item => (
          <ChecklistItem
            checklistItem={item}
            checklistDetails={checklistDetails}
            key={item.id}
            isFetchingDetails={isFetchingDetails}
            params={params}
            showChecklistDetails={showChecklistDetails}
            isUserClaimer={isUserClaimer}
          />
        ))}
    </ul>
  );
};

ChecklistList.defaultProps = {
  checklistDetails: [],
  checklist: [],
};

ChecklistList.propTypes = {
  checklistDetails: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  ),
  checklist: PropTypes.arrayOf(PropTypes.object),
  isFetchingDetails: PropTypes.PropTypes.bool.isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
  isUserClaimer: PropTypes.bool.isRequired,
  showChecklistDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChecklistList;
