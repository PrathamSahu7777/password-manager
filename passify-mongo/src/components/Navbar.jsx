import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <nav className='flex justify-between bg-slate-300 px-1 md:px-36 h-10 items-center '>
            <div className="logo font-bold text-2xl">Pass'
                <span className='text-green-500'>ify</span>
            </div>
            <ul className='flex gap-4'>
                <li className='flex gap-4 '>
                    <a href="/" className='hover:font-bold'>Home</a>
                    <a href="#" className='hover:font-bold'>About</a>
                    <a href="#" className='hover:font-bold'>Contact</a>
                </li>
                {
                    isAuthenticated ? <li> <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                        Log Out
                    </button></li> : <li><button onClick={() => loginWithRedirect()}>Log In</button></li>
                }


            </ul>
        </nav>
    )
}

export default Navbar
