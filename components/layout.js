import React from 'react'

function Layout({children}) {
    return (
        <>
        <header>
            <h1>Not Another Blogsite</h1>
        </header>
        <main>{children}</main>
        <footer>
            © Jef Ceuppens 2021
        </footer>   
        </>
    )
}

export default Layout
