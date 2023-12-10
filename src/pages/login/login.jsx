import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Checkbox, Button } from "@mui/material";
import UserService from "../../services/userService";
import AlertMessageComponent from "../../components/AlertMessageComponent/AlertMessageComponent";
import { useNavigate } from 'react-router-dom';
import { asignCartToCurrentUser } from "../../components/cart/CartLogic";
import LoginIcon from '@mui/icons-material/Login';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('Default message');
    const [severity, setSeverity] = useState('info');
    const [emailError, setEmailError] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await UserService.login(email, password);

            if (response.status === 200) {
                const token = response.data.accessToken;
                localStorage.setItem("token", token);

                const userRoles = await UserService.loadUserRoles(response.data.accessToken);
                console.log(userRoles);
                localStorage.setItem('roles', JSON.stringify(userRoles));
                await asignCartToCurrentUser();

                setMessage("Login successfully");
                setSeverity("success");
                setShowAlert(true);

                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            setMessage("Email or password incorrect");
            setSeverity("error");
            setShowAlert(true);
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleEmailChange = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        setEmailError(!validateEmail(inputValue));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateEmail(email)) {
            await handleLogin();
        } else {
            setMessage("Invalid email format");
            setSeverity("error");
            setShowAlert(true);
        }
    };

    return (
        <div className="login template d-flex justify-content-center align-items-center vw-100 vh-100">
            <div>
                <AlertMessageComponent message={message} severity={severity} open={showAlert} onClose={() => setShowAlert(false)} />
            </div>

            <div className="form_container p-5 rounded b bg-white">
                <form>
                    <h3 className="text-center">Sign In</h3>
                    <div className="mb-2">
                        <TextField
                            type="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                            helperText={emailError ? "Invalid email format" : ""}
                        />
                    </div>
                    <div className="mb-2">
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Sign in<LoginIcon/>
                        </Button>
                    </div>
                    <p className="text-end mt-2">
                        Need to register? <Link className="ms-2 link-dark" to={"/signup"}>Sign-up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
