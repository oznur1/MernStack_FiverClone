import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import User from '../user';
import Links from '../links';
import { AuthContext } from '../../context/authContext';



const Header = () => {
  
  const {user}=useContext(AuthContext);
  console.log("Header user:", user);
  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center gap-4 md:gap-8">
        {/* Logo */}
        <Link to="/">
          <img 
            src="/fiverr.png" 
            className="w-[100px]" alt="logo" 
          />
        </Link>

        {/* Form */}
        <form className="flex flex-1 border border-gray-400 rounded overflow-hidden max-w-[600px]">
          <input 
            type="text" 
            placeholder="Hizmetleri Ara.." 
            className="flex-1 p-2 outline-none"
          />
          <button className="bg-black p-2 text-white text-xl max-md:hidden">
            <IoSearch />
          </button>
        </form>

        {/* User */}
         
      <div>
        {!user ? <User/> :<Links/>}
      </div>
      </div>
    </header>
  )
}

export default Header;
