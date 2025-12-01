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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        setIsMobileMenuOpen(false); // chiudo il menu su mobile dopo logout
    };

    const renderLinks = () => (
        <>
            <LinkButton
                className={"header-button"}
                path={"/home"}
                title={"Shop"}
            />
            <LinkButton
                className={"header-button"}
                path={"/workers"}
                title={"Marchi"}
            />
            <LinkButton
                className={"header-button"}
                path={"/portfolio"}
                title={"Offerte"}
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
                        title={"Registrati"}
                    />

                    <LinkButton
                        className={"header-button"}
                        path={"/register"}
                        title={"Categorie"}
                    />
                </>
            )}
        </>
    );

    return (
        <>
            <header className="header">
                {/* Scritta centrale in alto */}
                <div className="header-bar">
                    <div className="header-brand">
                        TATTOO SUPPLY
                    </div>
                </div>

                {/* Navbar sotto (desktop, grazie al CSS) */}
                <div className="button-container">
                    {renderLinks()}
                </div>

                {/* Hamburger (solo mobile, gestito dal CSS) */}
                <div
                    className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                >
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                </div>
            </header>

            {/* Menu mobile a tendina sotto la navbar */}
            {isMobileMenuOpen && (
                <nav
                    className="mobile-menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {renderLinks()}
                </nav>
            )}
        </>
    );
};
