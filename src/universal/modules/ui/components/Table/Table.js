import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';
import TableCell from './TableCell';
import TableBody from './TableBody';

const Container = styled.table`
  border-radius: 2px;
  border-collapse: separate;
  border-spacing: 0;
  width: ${props => (props.width ? props.width : '100%')};
  max-height: 100%;
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  padding: 1rem 3rem 3rem;
  background: #fff;
  color: #111;
  border: 1px solid #dee4e7;
`;

class Table extends React.Component {
  getChildContext = () => {
    const { gutters, divided, celled, striped } = this.props;
    return {
      gutters: gutters ? gutters : false,
      divided: divided ? divided : false,
      celled: celled ? celled : false,
      striped: striped ? striped : false,
    };
  };

  render() {
    const { children } = this.props;
    const rest = Object.assign({}, this.props, { children: null });
    return <Container {...rest}>{children}</Container>;
  }
}

Table.Header = TableHeader;
Table.HeaderCell = TableHeaderCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

Table.childContextTypes = {
  gutters: PropTypes.bool, //row content should be padded on left and right
  divided: PropTypes.bool, //rows divided
  celled: PropTypes.bool, //columns divided
  striped: PropTypes.bool, //rows striped
};

export default Table;
