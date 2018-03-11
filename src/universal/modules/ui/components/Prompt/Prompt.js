import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '../';
import { hideModal } from '../../modal/actions/actions-modal';
import ModalContent from '../../modal/components/ModalContent';

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
const CompactModalContent = styled(ModalContent)`
  div.Modal__dialog {
    min-height: 210px;
  }
`;
const Message = styled.div`
  margin-top: 20px;
`;
class Prompt extends Component {
  render() {
    const {
      header,
      message = 'Confirm message',
      confirmButtonPrompt = 'Confirm',
      onConfirm,
      dispatch,
      component,
    } = this.props;

    return (
      <CompactModalContent
        modalAction={() => dispatch(hideModal())}
        modalFullscreen={false}
      >
        <h4>{header}</h4>

        {component ? (
          component
        ) : (
          <div>
            <Message>{message}</Message>
            <ButtonGroup>
              <Button
                text="Cancel"
                appearance="secondary"
                onClick={() => dispatch(hideModal())}
              />
              <Button
                text={confirmButtonPrompt ? confirmButtonPrompt : 'Confirm'}
                onClick={onConfirm}
              />
            </ButtonGroup>
          </div>
        )}
      </CompactModalContent>
    );
  }
}

Prompt.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.array,
  ]),
  confirmButtonPrompt: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default connect()(Prompt);
