
import User from "../models/userModels.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



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

    // 4. JWT token oluştur
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Cookie’ye token koy
    res.cookie("access_token", token, {
      httpOnly: true,     // JS ile erişilemez (XSS'e karşı güvenli)
      secure: process.env.NODE_ENV === "production", // prod’da sadece HTTPS
      sameSite: "strict", // CSRF'e karşı koruma
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
    });

    // 6. Response için şifreyi kaldır
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
        photo: user.photo|| null
    };

    // 7. Client’a cevap gönder
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
 try {
    // Cookie’yi temizle
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Çıkış başarılı" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};


export{register,login,logout}