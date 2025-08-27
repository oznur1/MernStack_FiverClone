import React from 'react'
import Input from '../../components/input'
import Switch from '../../components/switch'
import { useState } from 'react'
import Button from '../../components/customButton'
import api from '../../api'


const Register = () => {

const [isSeller,setIsSeller]=useState(false)

 // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    // Sayfa yenilemesini engelle
    e.preventDefault();

    // Form Data örneği oluştur
    const formData = new FormData(e.target);

    // formData nesnesi içerisindenn inputlara eriş
    const newUser = Object.fromEntries(formData.entries());

    // isSeller değerini newUser içerisine iliştir
    newUser.isSeller = isSeller;

    console.log(newUser);

    // Backend'e kayıt edilecek kullanıcıyı gönder
   api.post("/auth/register",newUser)
  .then ((res)=>alert("yeni kullanıcı kayıt edildi",res))
  .catch((err)=>{
    alert(err)
  })
  };

  return (
    <div className=' max-w-[900px] mx-auto'>
    <form 
    onSubmit={handleSubmit}
    className='grid md:grid-cols-2 md:gap-10 md:pt-24'>
      {/* Left Area */}
      <div>
        <h1 className='text-xl md:text-2xl text-gray-500 font-bold mb-5'>Yeni Hesap Oluştur</h1>
       <Input label="İsim" type="text"  name="username"/>
        <Input label="Email" type="email" name="email"/>
         <Input label="Fotoğraf" type="file"  name="photo" />
         <Input label="Ülke" type="text"  name="country"/>
         <Input label="Şifre" type="password"  name="password"/>
      </div>
       {/* Sağ Area */}
      <div>
        <h1  className='text-xl md:text-2xl text-gray-500 font-bold mb-5'>Satıcı Olmak İstiyorum</h1>
        <Switch  setIsSeller={setIsSeller}/>

       <Input label="Telefon" type="number" disabled={!isSeller}  name="phone"/>
         <Input label="Açıklama" type="text" disabled={!isSeller}  name="desc"/>
      
      <Button text="Kaydol"/>
      
      </div>
    </form>

    

    </div>
  )
}

export default Register
