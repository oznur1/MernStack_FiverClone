import error from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

// Protect(Koruma) middleware'i, giriş yapmamış(JWT'i olmayan veya eskimiş) kullanıcıların bazı endpointlere istek atmasını engelleyen middleware'dir.

// Aynı zamanda güzel bir yan özellik olarak isteğe giriş yapmış kullanıcının ID vb. verilerini de ekleyerek ilerleyen süreçte tekrardan kullanıcıyı tekrar find fonksiyonu ile bulmaktan bizi kurtarır.

const protect = async (req, res, next) => {

    //1) Çerezler(cookie) veya header ile gelen tokena (JWT) eriş

    // Bearer ey1291382194948594asdaskodaskd392843284
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    // 2) ne çerezlerde ne de headerda token yoksa hata gönder

    if(!token){
        // next fonksiyonu içine parametre konmadan çalıştırılırsa BAŞARILI anlamına gelir.

        //içine herhangi bir veri konursa ERROR anlamına gelir.
        return next(error(403, 'Yetki yok (token bulunamadı.)'))
    }

    // 3) token varsa geçerli mi değil mi bak

    jwt.verify(token, process.env.JWT_TOKEN, (err, payload) => {

        // 4) token geçersizse hata ver

        if(err){
            return next(error(403, 'Token geçersiz veya süresi dolmuş, tekrar giriş yapınız.'))
        }


        //5) token geçerliyse => req nesnesinin içine kullanıcı bilgilerini ekle

        // Bu sayede middleware'den sonra çalıştıracağımız bütün fonksiyonlar kullanıcının IDsine ve satıcı olup olmadığı değerine tekrardan find isteği atmadan erişebilecekler.

        req.userId = payload.id;
        req.isSeller = payload.isSeller;
    });

    // 6) eğer hepsi tamamsa sonraki adıma devam et
    next();
}

export default protect;