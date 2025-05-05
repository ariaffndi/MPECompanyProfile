import { motion, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import AppLogoIcon from '../app-logo-icon';
import ButtonInquiry from './button-inquiry';

const Navbar = () => {
   const [isScrolled, setIsScrolled] = useState(false);
   const { scrollYProgress } = useScroll();

   useEffect(() => {
      const onScroll = () => {
            setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
   }, []);

   return (
      <>
            <div
               className={`navbar fixed top-0 left-0 z-50 w-full px-5 transition-all duration-300 sm:px-10 ${
                  isScrolled ? 'bg-base-200 shadow-sm' : 'bg-black/30'
               }`}
            >
               <div className="flex-1">
                  <AppLogoIcon className="aspect-square size-16 rounded-md" />
               </div>

               <div className="flex items-center gap-5">
                  <div className="mr-5 hidden lg:flex">
                        <ul className={`menu menu-horizontal gap-5 px-1 ${isScrolled ? 'text-base-content' : 'text-white'}`}>
                           <li>
                              <a className="nav-link hover:bg-transparent">Home</a>
                           </li>
                           <li>
                              <a className="nav-link hover:bg-transparent">About Us</a>
                           </li>
                           <li>
                              <a className="nav-link hover:bg-transparent">Services</a>
                           </li>
                           <li>
                              <a className="nav-link hover:bg-transparent">Portofolio</a>
                           </li>
                           <li>
                              <a className="nav-link hover:bg-transparent">Contact</a>
                           </li>
                        </ul>
                  </div>
                  <div>
                        <ButtonInquiry />
                  </div>
               </div>

               {/* Mobile Menu */}
               <div className={`dropdown dropdown-end ml-2 lg:hidden ${isScrolled ? 'text-base-content t' : 'text-white'}`}>
                  <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                  </div>
                  <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 text-black shadow">
                        <li>
                           <a className="nav-link hover:bg-transparent">Home</a>
                        </li>
                        <li>
                           <a className="nav-link hover:bg-transparent">About Us</a>
                        </li>
                        <li>
                           <a className="nav-link hover:bg-transparent">Services</a>
                        </li>
                        <li>
                           <a className="nav-link hover:bg-transparent">Portofolio</a>
                        </li>
                        <li>
                           <a className="nav-link hover:bg-transparent">Contact</a>
                        </li>
                  </ul>
               </div>
            </div>
            <div>
               <motion.div
                  id="scroll-indicator"
                  style={{
                        scaleX: scrollYProgress,
                        position: 'fixed',
                        top: '75px',
                        left: 0,
                        right: 0,
                        height: 6,
                        originX: 0,
                  }}
                  className="z-99 bg-gradient-to-r from-white via-blue-200 to-blue-700"
               />
            </div>
      </>
   );
};

export default Navbar;
