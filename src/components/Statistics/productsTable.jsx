import React, { useEffect, useState } from 'react';
import StatisticsService from '../../services/StatisticsService';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography,
} from '@mui/material';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await StatisticsService.getTopSellingProducts();
                setProducts(result.data);
                /**
                 * Database returns a objets without atributes names, but it goes like this:
                 * [0] = productId
                 * [1] = product title
                 * [2] = brand
                 * [3] = category name
                 * [4] = total item sold
                 */
            } catch (error) {
                console.log("error fetching producst: ", error);
            }
        }

        fetchProducts();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Typography variant="h4" component="div" gutterBottom>
                Top Selling Products
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Total item sold</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product[0]}>
                                <TableCell>{product[0]}</TableCell>
                                <TableCell>{product[1]}</TableCell>
                                <TableCell>{product[2]}</TableCell>
                                <TableCell>{product[3]}</TableCell>
                                <TableCell>{product[4]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default ProductTable;