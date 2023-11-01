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

export default function NavBar() {
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            UserService.loadCurrentUser(token)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error al cargar al usuario');
                })
        }
    })

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

            {/* Navbar Toggler Button for Small Screens */}
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
                            Brands
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Top selling
                        </Link>
                    </li>
                </ul>
            </div>

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
                            <MenuItem>View profile</MenuItem>
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
                <Link className="btn btn-link" to="/">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </Link>
            </div>
        </nav>
    );
}
