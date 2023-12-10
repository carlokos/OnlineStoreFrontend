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
import { getTotalQuantity } from '../cart/CartLogic';
import { addListener, quitListener } from '../cart/cartListener';
import Dropdown from 'react-bootstrap/Dropdown';
import Cookies from "js-cookie";
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import BarChartIcon from '@mui/icons-material/BarChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function NavBar() {
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [roles, setRoles] = useState([]);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        Cookies.remove('cart');
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
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
                    setRoles(localStorage.getItem('roles'));
                    setUser(response.data);
                } catch (error) {
                    console.log("no user authentificated");
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
                    src="src\imgs\icono.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="logo"
                />
            </Link>

            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    <span className="navbar-toggler-icon"></span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Link className="dropdown-item" to="/">
                        Home
                    </Link>
                    <Link className="dropdown-item" to="/productList">
                        Products
                    </Link>
                    <Link className="dropdown-item" to="/topProducts">
                        Top selling
                    </Link>
                    {roles.includes(1) && (
                        <Link className="dropdown-item" to="/orderManager">
                            Order manager
                        </Link>
                    )}
                    {roles.includes(1) && (
                        <Link className="dropdown-item" to="/statistics">
                            Statistics
                        </Link>
                    )}
                </Dropdown.Menu>
            </Dropdown>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            <HomeIcon/>Home<span className="sr-only">(actual)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/productList">
                            <LocalMallIcon/>Products 
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/topProducts">
                            <StarIcon/>Top selling 
                        </Link>
                    </li>
                    {roles.includes(1) && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/orderManager">
                                <AdminPanelSettingsIcon/>Order manager 
                            </Link>
                        </li>
                    )}
                    {roles.includes(1) && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/statistics">
                                <BarChartIcon/>Statistics 
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {/**
             * Changes depending if user is authentificated or not
             */}
            <div className="d-flex">
                {user ? (
                    <div className="user-dropdown">
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
                            <MenuItem onClick={handleLogOut}>Log out</MenuItem>
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
