   import React from 'react'

   const navbar = () => {
      return (
         <div className="navbar bg-base-100 px-5 shadow-sm sm:px-10">
            <div className="flex-1">
                  <div className="dropdown lg:hidden">
                     <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                     </div>
                     <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                              <a className='nav-link hover:bg-transparent '>Home</a>
                        </li>
                        <li>
                              <a className='nav-link hover:bg-transparent'>About Us</a>
                        </li>
                        <li>
                              <a className='nav-link hover:bg-transparent'>Services</a>
                        </li>
                        <li>
                              <a className='nav-link hover:bg-transparent'>Portofolio</a>
                        </li>
                        <li>
                              <a className='nav-link hover:bg-transparent'>Contact</a>
                        </li>
                     </ul>
                  </div>
                  <a className="btn btn-ghost text-xl">LOGO</a>
            </div>

            <div className="flex items-center gap-5">
                  <div className="hidden lg:flex mr-5">
                     <ul className="menu menu-horizontal gap-5 px-1 font-semibold">
                        <li>
                              <a className='nav-link hover:bg-transparent'>Home</a>
                        </li>
                        <li>
                              <a className='nav-link hover:bg-transparent'>About Us</a>
                        </li>
                        <li>
                              <a className='nav-link hover:bg-transparent'>Services</a>
                        </li>
                        <li>
                              <a className='nav-link hover:bg-transparent'>Portofolio</a>
                        </li>
                        <li>
                              <a className='nav-link hover:bg-transparent'>Contact</a>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <a className="btn">Button</a>
                  </div>
            </div>
         </div>
      );
   }

   export default navbar