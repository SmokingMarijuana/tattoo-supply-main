import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Header.css';
import { LinkButton } from '../LinkButton/LinkButton';
import { useSelector, useDispatch } from "react-redux";
import { logout, selectToken } from "../../pages/userSlice";

export const Header = () => {
    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);

    const [decodedToken, setDecodedToken] = useState(null);
    const [tokenExpired, setTokenExpired] = useState(false);

    useEffect(() => {
        if (!rdxToken) {
            setDecodedToken(null);
            setTokenExpired(false);
            return;
        }
        try {
            const decoded = jwtDecode(rdxToken);
            setDecodedToken(decoded);

            if (decoded.exp) {
                const now = Date.now() / 1000;
                setTokenExpired(decoded.exp < now);
            } else {
                setTokenExpired(false);
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setDecodedToken(null);
            setTokenExpired(true);
        }
    }, [rdxToken]);

    const logOutMe = () => {
        dispatch(logout());
    };

    return (
        <header className="header">
            {/* Scritta centrale in alto */}
            <div className="header-brand">
                TATTOO-SUPPLY
            </div>

            {/* Navbar sotto */}
            <div className="button-container">
                <LinkButton
                    className={"header-button"}
                    path={"/home"}
                    title={"Home"}
                />
                <LinkButton
                    className={"header-button"}
                    path={"/workers"}
                    title={"Workers"}
                />
                <LinkButton
                    className={"header-button"}
                    path={"/portfolio"}
                    title={"Portfolio"}
                />

                {rdxToken && tokenExpired === false ? (
                    <>
                        <LinkButton
                            className={"header-button"}
                            path={"/profile"}
                            title={"Profile"}
                        />
                        <LinkButton
                            className={"header-button"}
                            path={"/appointments"}
                            title={"Appointments"}
                        />
                        <div className='header-button' onClick={logOutMe}>
                            <LinkButton
                                classButton={"linkButtonDesign"}
                                path={"/login"}
                                title={"Log out"}
                            />
                        </div>

                        {decodedToken && decodedToken.role === "super_admin" && (
                            <>
                                <LinkButton
                                    className={"header-button"}
                                    path={"/getAllUsers"}
                                    title={"All Users"}
                                />
                                <LinkButton
                                    className={"header-button"}
                                    path={"/getAllAppointments"}
                                    title={"Get All Appointments"}
                                />
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <LinkButton
                            className={"header-button"}
                            path={"/login"}
                            title={"Login"}
                        />
                        <LinkButton
                            className={"header-button"}
                            path={"/register"}
                            title={"Register"}
                        />
                    </>
                )}
            </div>
        </header>
    );
};
