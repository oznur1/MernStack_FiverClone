
import User from "../models/userModels.js"
import bcrypt from "bcrypt";


//  Register (Kayıt Ol)

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Boş alan kontrolü
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun" });
    }

    // 2. Şifre uzunluğu kontrolü
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Şifre 6 karakterden küçük olamaz" });
    }

    // 3. Email zaten var mı kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kayıtlı" });
    }

    // 4. Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Yeni kullanıcı oluştur
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6. Response için şifreyi kaldır
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    // 7. Client’a cevap gönder
    return res
      .status(201)
      .json({ message: "Kayıt işlemi başarılı", user: userResponse });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};



// Login (Giriş Yap)

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Boş alan kontrolü
    if (!email || !password) {
      return res.status(400).json({ message: "Lütfen email ve şifre girin" });
    }

    // 2. Kullanıcı var mı?
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // 3. Şifre doğru mu?
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Yanlış şifre girdiniz" });
    }

    // 4. Response için şifreyi kaldır
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    // 5. Client’a cevap gönder
    return res.status(200).json({
      message: "Giriş başarılı",
      user: userResponse,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};







// Logout.(Çıkış Yap)

const logout=async(req,res)=>{
  return  res.json({message:"cıkış işlemi"})
}



export{register,login,logout}