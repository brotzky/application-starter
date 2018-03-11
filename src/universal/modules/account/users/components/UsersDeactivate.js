import React from 'react';
import { dispatchPropType } from 'gac-utils/proptypes';
import { showModal } from '../../../ui/modal/actions/actions-modal';
import { Button } from '../../../ui/components';

const UsersDeactivate = ({ dispatch, currentUser, size }) => (
  <Button
    onClick={() => dispatch(showModal('USERS_DELETE_MODAL', { currentUser }))}
    permission="EDIT_PROFILE"
    text="Deactivate"
    size={size || 'large'}
    appearance="default"
  />
);

UsersDeactivate.propTypes = {
  dispatch: dispatchPropType.isRequired,
};

export default UsersDeactivate;
