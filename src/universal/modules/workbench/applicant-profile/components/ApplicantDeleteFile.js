import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from '../../../ui/components';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import { notificationPush } from '../../../ui/notifications/actions';
import { capitalizeString } from 'grow-utils/stringFormatting';

const ButtonGroup = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  button:first-child {
    margin-right: 5px;
  }
  button:last-child {
    margin-left: 5px;
  }
`;
const Message = styled.div`
  margin-top: 20px;
`;
const Errors = styled.div`
  position: relative;
  background: ${props => props.theme.colors.errorPink};
  box-shadow: 0 8px 30px rgba(27, 39, 51, 0.08);
  border: 1px solid rgba(245, 77, 61, 0.24);
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.red};
  ul {
    overflow: hidden;
  }
  margin-top: 20px;
`;

/**
 * Prompting user to delete a file.
 */
class ApplicantDeleteFile extends Component {
  componentWillReceiveProps(nextProps) {
    const { image, dispatch } = this.props;
    if (this.props.isSubmitting && !nextProps.isSubmitting) {
      if (nextProps.errors.length === 0) {
        dispatch(
          notificationPush({
            id: image.preview,
            kind: 'success',
            message: 'Successfully deleted the file.',
            dismissAfter: 5000,
          }),
        );
        dispatch(hideModal());
      }
    }
  }
  render() {
    const { image, isSubmitting, onConfirm, dispatch, errors } = this.props;
    return (
      <div>
        <Message>
          <div>
            Please confirm you want to delete the following file:
            <div style={{ fontWeight: '600' }}>{image.name}</div>
            {errors.length !== 0 && (
              <Errors>
                File deletion failed for the following reason(s):
                <ul>
                  {errors.map(error => (
                    <li key={error}>{capitalizeString(error, '_', ' ')}</li>
                  ))}
                </ul>
              </Errors>
            )}
          </div>
        </Message>
        <ButtonGroup>
          <Button
            text="Cancel"
            appearance="secondary"
            onClick={() => dispatch(hideModal())}
          />
          <Button
            text="Delete"
            onClick={() => onConfirm(image)}
            isSubmitting={isSubmitting}
          />
        </ButtonGroup>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isSubmitting: state.files.isDeleting,
    errors: state.files.errors,
  };
};
export default connect(mapStateToProps)(ApplicantDeleteFile);
