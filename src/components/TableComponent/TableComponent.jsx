import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';

function TableComponent({ data, columns, onRowClick }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    if (onRowClick) {
      onRowClick(item);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ margin: 'auto' }}>
      <Table  sx={{ minWidth: 650, margin:`auto` }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((column) => (
                <TableCell key={column.id}>{item[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;