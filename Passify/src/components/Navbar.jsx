import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between bg-slate-300 px-1 md:px-36 h-10 items-center '>
            <div className="logo font-bold text-2xl">Pass'
                <span className='text-green-500'>ify</span>
                </div>
            <ul>
                <li className='flex gap-4 '>
                    <a href="/" className='hover:font-bold'>Home</a>
                    <a href="#" className='hover:font-bold'>About</a>
                    <a href="#" className='hover:font-bold'>Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
