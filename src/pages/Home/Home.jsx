import React, { useState, useEffect } from "react";
import "./Home.css"
import { LinkButton } from "../../common/LinkButton/LinkButton";

export const Home = () => {
    return (
        <div className="home-body">
            <div className="home-justify">
                <div className="logo"><img src="" alt="" /></div>
                <div className="title">Tattoo <br></br> Supply Shop</div>
                <LinkButton
                    className={"landing-button"}
                    path={"/createAppointment"}
                    title={"Book Now"}
                />

            </div>
        </div>
    )
}