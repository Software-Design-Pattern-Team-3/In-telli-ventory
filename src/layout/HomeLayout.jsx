import Footer from '@/components/Shared/Footer'
import Navbar from '@/components/Shared/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {

    return (
        <>
            <div className='h-screen w-screen overflow-x-hidden m-0 p-0 flex flex-col overflow-y-auto'>
                <Navbar />
                <Outlet />
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default HomeLayout