import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './navbar.css';
import UserService from '../../services/userService';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { getTotalQuantity} from '../cart/CartLogic';
import { addListener, quitListener } from '../cart/cartListener';
import Cookies from "js-cookie";

export default function NavBar() {
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        Cookies.remove('cart');
        localStorage.removeItem('token');
        window.location.href = '/'
    }

    const handleCartUpdate = (event) => {
        const newQuantity = Number(event.detail);  
        if (!isNaN(newQuantity)) {
            setQuantity(newQuantity);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            if (token && !user) {
                try {
                    const response = await UserService.loadCurrentUser(token);
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user: ', error);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        addListener('CART_UPDATED', handleCartUpdate);
        return () => {
            quitListener('CART_UPDATED', handleCartUpdate);
        };
    }, []);

    useEffect(() => {
        setQuantity(getTotalQuantity());
    }, []); 

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <Link className="navbar-brand" to="/">
                <img
                    src="/docs/4.0/assets/brand/bootstrap-solid.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt=""
                />
                Bootstrap
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            Home <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Top selling
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/orderManager">
                            Orders manager
                        </Link>
                    </li>
                </ul>
            </div>

            {/**
             * It changes depending if user have identify or not
             */}
            <div className="d-flex">
                {user ? (
                    <div>
                        <Button
                            onClick={handleMenuClick}
                            className="white-text-button"
                        >
                            Welcome {user.name}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <Link to={"/profile"}><MenuItem>View profile</MenuItem></Link>
                            <MenuItem onClick={handleLogOut}>log out</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <div className="user_png">
                        <Link className="btn btn-link" to="/login">
                            <FontAwesomeIcon icon={faUserCircle} size="lg" className="text-white" />
                        </Link>
                    </div>
                )}
            </div>

            <div className="cart">
                <Link className="btn btn-link" to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    <span className="cart-count">{quantity}</span>
                </Link>
            </div>
        </nav>
    );
}
