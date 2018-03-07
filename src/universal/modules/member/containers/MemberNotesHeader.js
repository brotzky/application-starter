import React from 'react';
import { connect } from 'react-redux';
import { addClassNameIf } from 'grow-utils/addClassNameIf';
import { Button } from '../../ui/components';

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
      <span
        className={`MemberNotes__filters-button ${addClassNameIf(
          !notes.queryParams.category ||
            notes.queryParams.category === currentCategory,
          'MemberNotes__filters-button--active',
        )}`}
        onClick={() =>
          updateData(
            {
              queryParams: { category: currentCategory },
            },
            member.member.id,
          )}
      >
        {heading}
      </span>
    );
  };

  return (
    <header className="MemberNotes__header">
      <div className="MemberNotes__filters">
        {appConfig.notes.heading.map(heading => {
          return renderNotesHeading(heading);
        })}
      </div>
      <Button
        onClick={handleAddNoteClick}
        text="Add note"
        permission={mapCategoryPermissions()}
        appearance="secondary"
        id="addNoteOpenModal"
      />
    </header>
  );
};

const mapStateToProps = state => ({
  category: state.notes.queryParams.category,
  appConfig: state.configs.app.config,
});

export default connect(mapStateToProps)(MemberNotesHeader);
