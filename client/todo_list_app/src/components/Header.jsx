import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Footer from './Footer';

const Header = () => {
 
   return (
    <>
    <div className="bg-gray-100 h-20 flex flex-shrink-1 items-center justify-around box-border">
    <h1 className="text-3xl font-bold text-blue-600">My To-Do List App</h1>
    <input type="search" name="" id="" placeholder="Search your notes" className="p-2 rounded-md bg-gray-200" />
    <Link to="/registration" className="bg-orange-200 p-2 rounded-md text-sm font-medium">Login/Sign up</Link>
    </div>

  

    </>
  )
}

export default Header;