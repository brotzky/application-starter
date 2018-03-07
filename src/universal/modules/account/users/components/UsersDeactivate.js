import React from 'react';
import { dispatchPropType } from 'gac-utils/proptypes';
import { showModal } from '../../../ui/modal/actions/actions-modal';
import { Button } from '../../../ui/components';

const UsersDeactivate = ({ dispatch }) => (
  <Button
    onClick={() => dispatch(showModal('USERS_DELETE_MODAL'))}
    permission="EDIT_PROFILE"
    text="Deactivate"
    size="large"
    appearance="default"
  />
);

UsersDeactivate.propTypes = {
  dispatch: dispatchPropType.isRequired,
};

export default UsersDeactivate;
