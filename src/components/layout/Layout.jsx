import React from "react";
import Footer from '../footer/Footer'
import NavigationBar from '../navigationBar/NavigationBar'


const Layout = ({ children }) => {
    return (
        <div>
            <NavigationBar/>
            <div className='main-content'>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout