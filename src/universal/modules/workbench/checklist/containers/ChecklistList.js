import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChecklistItem from './ChecklistItem';

const ListWrapper = styled.ul`
  list-style-type: none;
  background: white;
`;

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
    <ListWrapper>
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
    </ListWrapper>
  );
};

ChecklistList.defaultProps = {
  checklistDetails: [],
  checklist: [],
};

ChecklistList.propTypes = {
  checklistDetails: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.objectOf(PropTypes.array),
  ]),
  checklist: PropTypes.arrayOf(PropTypes.object),
  isFetchingDetails: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    .isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
  isUserClaimer: PropTypes.bool.isRequired,
  showChecklistDetails: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ).isRequired,
};

export default ChecklistList;
