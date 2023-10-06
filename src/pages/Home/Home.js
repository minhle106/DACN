import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className="container mx-auto px-[4.5rem] mt-[7.5rem]">
                <Outlet/>
            </div>
        </div>
    )
}

export default Home;