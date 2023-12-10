import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';
import TablePagination from '@mui/material/TablePagination';
import UpdateOrderStatus from './UpdateOrderStatus';
import OrderService from '../../services/OrderService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OrderDetailsListDialog from './orderDetailsList/OrderDetailsListDialog';

const OrderTable = ({ orders }) => {
  const [filtroStatus, setFiltroStatus] = useState('all');
  const [filtroPaymentStatus, setFiltroPaymentStatus] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updateDetailsOpen, setUpdateDetailsOpen] = useState(false);
  const [orderAnchorEl, setOrderAnchorEl] = useState(null);
  const [paymentAnchorEl, setPaymentAnchorEl] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);


  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const handleUpdateOrder = async (order) => {
    await OrderService.updateOrder(order);
    window.location.reload();
  };

  const orderStatus = ['all', 'pending payment', 'pending shipment', 'shipped', 'delivered'];
  const paymentStatus = ['all', 'paid', 'pending'];

  const handleIconClick = (event, anchorSetter) => {
    anchorSetter(event.currentTarget);
  };

  const handleMenuClose = (anchorSetter) => {
    anchorSetter(null);
  };

  const viewDetails = (order) => {
    setSelectedOrder(order);
    setUpdateDialogOpen(false);
    setUpdateDetailsOpen(true);
    setForceUpdate((prev) => !prev);
  }

  const ordersFiltrados =
    filtroStatus === 'all'
      ? orders
      : orders.filter((order) => order.orderStatus === filtroStatus);

  const paymentFiltrados =
    filtroPaymentStatus === 'all'
      ? ordersFiltrados
      : ordersFiltrados.filter((order) => order.paymentStatus === filtroPaymentStatus);

  return (
    <>
      <Box id="orderTable">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption>Order list</caption>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID Order</TableCell>
                <TableCell align="center">
                  OrderStatus{' '}
                  <IconButton onClick={(event) => handleIconClick(event, setOrderAnchorEl)}>
                    <FilterListIcon />
                  </IconButton>
                  <Menu
                    anchorEl={orderAnchorEl}
                    open={Boolean(orderAnchorEl)}
                    onClose={() => handleMenuClose(setOrderAnchorEl)}
                  >
                    {orderStatus.map((estado) => (
                      <MenuItem key={estado} onClick={() => { setFiltroStatus(estado); handleMenuClose(setOrderAnchorEl); }}>
                        {estado === 'all' ? 'no filter' : estado}
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
                <TableCell align="center">
                  PaymentStatus{' '}
                  <IconButton onClick={(event) => handleIconClick(event, setPaymentAnchorEl)}>
                    <FilterListIcon />
                  </IconButton>
                  <Menu
                    anchorEl={paymentAnchorEl}
                    open={Boolean(paymentAnchorEl)}
                    onClose={() => handleMenuClose(setPaymentAnchorEl)}
                  >
                    {paymentStatus.map((estado) => (
                      <MenuItem key={estado} onClick={() => { setFiltroPaymentStatus(estado); handleMenuClose(setPaymentAnchorEl); }}>
                        {estado === 'all' ? 'no filter' : estado}
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
                <TableCell align="center">View Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentFiltrados
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order.id} style={{ cursor: 'pointer' }}>
                    <TableCell align="center" onClick={() => handleRowClick(order)}>{order.id}</TableCell>
                    <TableCell align="center" onClick={() => handleRowClick(order)}>{order.orderStatus}</TableCell>
                    <TableCell align="center" onClick={() => handleRowClick(order)}>{order.paymentStatus}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => viewDetails(order)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={paymentFiltrados.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      {selectedOrder && (
        <UpdateOrderStatus
          open={updateDialogOpen}
          onClose={handleCloseUpdateDialog}
          order={selectedOrder}
          onUpdateOrder={handleUpdateOrder}
        />
      )}

      {selectedOrder && (
        <OrderDetailsListDialog
          key={forceUpdate}
          order={selectedOrder}
          IsOpen={updateDetailsOpen}
          onClose={() => setUpdateDetailsOpen(false)}
        />
      )}
    </>
  );
};

export default OrderTable;
