import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ease } from 'gac-utils/sc';
import { Button } from '../../ui/components';

const FiltersButton = styled.span`
  display: inline-block;
  border-radius: 4px;
  margin-right: 1.2rem;
  padding: 0 1.2rem;
  text-transform: uppercase;
  color: ${props => props.theme.colors.greyMidDark};
  font-weight: 500;
  cursor: pointer;
  ${ease('out')};

  &:hover {
    color: ${props => props.theme.colors.blue};
    background: ${props => props.theme.colors.greyBg};
  }

  ${props =>
    props.active
      ? `color: ${props.theme.colors.blue};
        background: ${props.theme.colors.greyBg};`
      : ''};
`;

const MemberNotesHeading = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.4rem 3rem;
`;

const MemberNotesHeader = props => {
  const {
    handleAddNoteClick,
    member,
    notes,
    updateData,
    category,
    appConfig,
  } = props;

  const mapCategoryPermissions = () => {
    switch (category) {
      case 'underwriting':
        return 'EDIT_UNDERWRITING_NOTE';
      case 'member':
        return 'EDIT_MEMBER_NOTE';
      case 'product':
        return 'EDIT_PRODUCT_NOTE';
      default:
        return 'EDIT_UNDERWRITING_NOTE';
    }
  };

  const renderNotesHeading = heading => {
    const categoryObj = {
      All: 'underwriting',
      General: 'member',
      Applications: 'underwriting',
      Products: 'product',
      Fraud: 'fraud',
    };

    const currentCategory =
      heading === 'All' ? undefined : categoryObj[heading];

    return (
      <FiltersButton
        key={heading}
        active={notes.queryParams.category === currentCategory}
        onClick={() =>
          updateData(
            {
              queryParams: { category: currentCategory },
            },
            member.member.id,
          )
        }
      >
        {heading}
      </FiltersButton>
    );
  };

  return (
    <MemberNotesHeading>
      <div style={{ marginBottom: '0.8rem' }}>
        {appConfig.notes.heading.map(heading => renderNotesHeading(heading))}
      </div>
      <Button
        onClick={handleAddNoteClick}
        text="Add note"
        permission={mapCategoryPermissions()}
        appearance="secondary"
        id="addNoteOpenModal"
      />
    </MemberNotesHeading>
  );
};

const mapStateToProps = state => ({
  category: state.notes.queryParams.category,
  appConfig: state.configs.app.config,
});

export default connect(mapStateToProps)(MemberNotesHeader);
