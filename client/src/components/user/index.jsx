import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../../context/authContext"
import { IoLogInOutline } from "react-icons/io5";
import api from "../../api";

const User = () => {
    const { user, setUser } = useContext(AuthContext);
  
   const handleLogout = async () => {

    api
      .post('/auth/logout')

      .then((res) => {
        // önce geçici(şuanki hafızada contextte tutulan) kullanıcıyı siliyoruz
        setUser(null)
        // sonra kalıcı (localstorage'da tutulan ve sayfayı yenilediğimizde tekrar giriş yapılan) kullanıcıyı siliyoruz.
        localStorage.removeItem('user');
      })

      .catch(err => console.error(err))
  }
  
    return (
      <div className="flex items-center justify-center gap-2">
     <img src={user?.photo} className="w-8 h-8 rounded-full" />
      <button onClick={handleLogout} className="cursor-pointer inline-flex items-center bg-red-500 p-1 rounded-md text-white">
        <IoLogInOutline className="text-2xl" />
        Çıkış
      </button>
    </div>
  )
}

export default User
