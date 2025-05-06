import React from 'react'
import { Link } from '@inertiajs/react';
import sectionImage from '@/assets/images/section-contact-us.jpg';

const ContactUs = () => {
   return (
       <div className="flex w-full flex-col gap-5 md:flex-row items-start">
           <div className="card w-1/2 gap-y-4 md:place-self-center">
               <h1 className="text-3xl font-light text-sky-500">Ready to collaborate?</h1>
               <h1 className="text-3xl font-bold">Let's team up and create something incredible!</h1>
               <Link href="#" className="btn text-base-200 w-fit rounded-lg border-none bg-sky-500 shadow-lg hover:bg-sky-600 mt-4">
                  Contact Us
               </Link>
           </div>
           <div className="md:w-1/2 w-full justify-end">
               <img src={sectionImage} width={500} alt="section contact us" className="mx-auto md:aspect-square object-cover" />
           </div>
       </div>
   );
}

export default ContactUs;