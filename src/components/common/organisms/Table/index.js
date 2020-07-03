import React, {memo} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import './style.css';

const Table = memo((props) => {
  return <ReactTable {...props} />;
});

Table.displayName = 'Table';
export default Table;
