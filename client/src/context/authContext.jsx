import { createContext, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Kullanıcı için bir state oluştur
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Navigate kurulumu
  const navigate = useNavigate();
  // Register
  const register = (user) => {
    api
      .post("/auth/register", user)
      .then(() => {
        // Kullanıcıya bildirim gönder
        toast.success("Kayıt işlemi başarılı");
        // Giriş yap sayfasına yönlendir
        navigate("/login");
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Login
  const login = (user) => {
    api
      .post("/auth/login", user)
      .then((res) => {
        // Kullanıcı verisini state'de tut
        setUser(res.data.user);

        // Kullanıcı verilerini locale kayıt et
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // Kullanıcıya bildirim gönder
        toast.success("Giriş işlemi başarılı!");
        // Anasayfaya yönlendir
        navigate("/");
      })
      .catch((err) => {
        toast.error(`Giriş işlemi sırasında bir hata oluştu: ${err}`);
      });
  };
  return (
    <AuthContext.Provider value={{ register, login, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};