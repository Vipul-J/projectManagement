import React from 'react'
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
        <footer className="bg-light text-center border-top text-lg-start p-3 mt-5">
            <div className="text-center rwt-txt-dark-blue ">
                &copy; 2024,
                <Link  to="#"
                    className="foot-link text-decoration-none text-danger fw-bold"> KLE Technological University
                    </Link>
            </div>
        </footer> 
        </>
    )
}

export default Footer