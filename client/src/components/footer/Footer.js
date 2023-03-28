import React from 'react'
import {MdChevronRight } from 'react-icons/md'
import {Twitter,Instagram,Facebook} from '@mui/icons-material'


function Footer() {
  return (
    <footer className='mt-20'>
        <div className='p-10 bg-[#060B2B] text-gray-200'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                    <div className="mb-5">
                        <h4 className='text-2xl pb-4'>Company</h4>
                        <p className='text-gray-500'>
                            A123 Lost Street <br />
                            Kochi , Kerala <br />
                            India <br /> <br />
                            <strong>Phone:</strong>+91 8956459854 <br />
                            <strong>Email:</strong>something@gmail.com <br />
                        </p>
                    </div>
                    <div className="mb-5">
                        <h4 className='pb-4'>Useful Links</h4>
                            <ul className='text-gray-500'>
                                <li className='pb-4 cursor-pointer hover:text-yellow-500'>Home</li>
                                <li className='pb-4 cursor-pointer hover:text-yellow-500'>About Us</li>
                                <li className='pb-4 cursor-pointer hover:text-yellow-500'>Services</li>
                                <li className='pb-4 cursor-pointer hover:text-yellow-500'>Terms of services</li>
                                <li className='pb-4 cursor-pointer hover:text-yellow-500'>Privacy policy</li>
                            </ul>
                    </div>
                    <div className="mb-5">
                        <h4 className='pb-4'>Our Services</h4>
                            <ul className='text-gray-500'>
                                <li className='pb-4 cursor-pointer hover:text-yellow-500'>Top Consultants</li>
                                <li className='pb-4 cursor-pointer hover:text-yellow-500'>Communication</li>
                                <li className='pb-4 cursor-pointer hover:text-yellow-500'>Chat with consultant</li>
                                <li className='pb-4 cursor-pointer hover:text-yellow-500'>Video call</li>
                                <li className='pb-4 cursor-pointer hover:text-yellow-500'>Community</li>  
                            </ul>
                    </div>
                    <div className="mb-5">
                    <h4 className='pb-4'>join our newsletter</h4>
                    <p className='text-gray-500 pb-2'>Join our newsletter</p>
                    {/* <form className='flex flex-rowflex-wrap'>
                        <input type="text" className='text-gray-500 w-2/3 p-2  focus:border-yellow-500' placeholder='example@gmail.com' />
                        <button className='p-2 w-1/3  bg-yellow-500 text-white hover:bg-yellow-600'>Subscribe</button>
                    </form> */}
                    <div className='p-4  text-2xl'>
                    <Twitter className='w-10 h-[100px] text-xl text-black rounded-full bg-yellow-500 hover:bg-yellow-600 mx-1 inline-block pt-1'/>
                    <Instagram className='w-10 h-10 text-black rounded-full bg-yellow-500 hover:bg-yellow-600 mx-1 inline-block pt-1'/>
                    <Facebook className='  text-black rounded-full bg-yellow-500 hover:bg-yellow-600 mx-1 inline-block pt-1'/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full bg-gray-900 text-gray-500 px-10 py-5'>
            <div>
                <div className='text-center'>
                    <div>
                        Copyright <strong><span>company</span></strong>.All rights Reserved
                    </div>
                    <div>
                        Designed by <span className='cursor-pointer text-yellow-500'>company</span>.All rights Reserved
                    </div>
                </div>
                
            </div>
        </div>
    </footer>
  )
}

export default Footer
