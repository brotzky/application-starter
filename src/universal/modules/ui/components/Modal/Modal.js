import styled from 'styled-components';
import { cover } from 'gac-utils/sc';

export const ModalLoading = styled.div`
  ${cover};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalLoadingText = styled.span`
  position: relative;
  top: 6px;
  font-size: ${props => props.theme.font.size4};
`;

export const ModalActions = styled.div`
  position: absolute;
  opacity: 0.7;
  height: 36px;
  width: 36px;
  top: -36px;
  right: -20px;
  line-height: 1;
  color: #585858;
  font-size: 3.2rem;
  border-radius: 50%;
  cursor: pointer;
  -webkit-text-fill-color: white;
`;

export const ModalBackground = styled.div`
  ${cover};
  position: fixed;
  z-index: -1;
  background: rgba(27, 40, 62, 0.64);
`;
