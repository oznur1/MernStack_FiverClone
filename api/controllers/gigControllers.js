


import { Gig } from "../models/gigModel.js"


// bütün gigleri alırken eğer filtrelerimiz varsa bunları Mongoose'un çalışabileceği hale getirmek adına bir fonksiyon yazalım.
const buildFilters = (query) => {
    const filters = {};

    if(query.category) filters.category = query.category;
    if(query.userId) filters.user = query.userId;

    if(query.min || query.max){

        filters.packagePrice = {};

        if(query.min) filters.packagePrice.$gte = query.min;
        if(query.max) filters.packagePrice.$lte = query.max;
    }

    if(query.search) filters.title = { $regex: query.search, $options: "i"} // insensitive (büyük-küçük harf duyarsız - ikisini de kabul ediyor)

    return filters;
}



// bütün gigleri çeken kontrolcü
export const getAllGigs = async (req, res) => {
    try {

        const filters = buildFilters(req.query);

        const gigs = await Gig.find(filters).populate('user', 'username photo');

        if (gigs.length === 0) return res.status(404).send({ success: false, message: "Aradığınız kriterlere uyan ilan bulunamadı."});

        res.status(200).json({
            message: "Hizmet verileri alındı.",
            results: gigs.length,
            data: gigs
        })

    }
    catch (err) {
        return res.status(500).send({
            success: false,
            error: err
        })
    }

}

// yeni gig oluşturan fonksiyon
export const createGig = async (req, res) => {
    try {

        // isteği atan kullanıcı satıcı hesabı değilse hata döndür.
        if (!req.isSeller) return res.status(403).send({
            success: false,
            message: "Sadece satıcı hesapları yeni bir ilan oluşturabilir."
        })

        const savedGig = await Gig.create({ ...req.body, user: req.userId })

        res.status(201).send({
            message: "İlân başarıyla oluşturuldu.",
            data: savedGig,
            success: true
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ success: false, error: err })
    }
}

// tek bir gigi çeken kontrolcü
export const getGig = async (req,res) => {
    try{
        const gig = await Gig.findById(req.params.id).populate('user');

        if(!gig) return res.status(404).send({ success: false, message: "Aradığınız hizmet bulunamadı."})

        return res.status(200).send({
            success:true,
            message:"Hizmet verisi alındı.",
            data: gig
        })
    }
    catch(err){

        return res.status(500).send({
            success:false,
            error: err
        })
    }
}