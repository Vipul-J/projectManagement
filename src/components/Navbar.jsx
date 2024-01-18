import React from 'react'
import navlogo from "../assets/logoOne.png"
// import "../assets/style/core.css"

function Navbar() {
    return (
        <>
            <nav class="navbar custom-nav navbar-expand-lg  bg-transparent shadow-sm ">
                <div class="container">
                    <a class="navbar-brand" href="https://www.kletech.ac.in/">
                        <img src={navlogo} height="70" className='p-2'></img> 
                     </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0"> 
                            <li class="nav-item px-3">
                                <a class="nav-link text-dark fw-bold" href="/projectOne">Completed Projects</a>
                            </li>
                            <li class="nav-item px-3">
                                <a class="nav-link text-dark fw-bold" href="/projectTwo">OnGoing Projects</a>
                            </li> 
                            <li class="nav-item px-3">
                                <a class="nav-link text-dark fw-bold" href="/">Log Out</a>
                            </li> 
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar