import express from 'express';
import protect from '../middlewares/protect.js';
import { createGig, getAllGigs, getGig } from '../controller/gigController.js';



// 1) Router oluşturma

const router = express.Router();

// 2) rotaları(endpoint) belirle

// id gerektirmeyen rotalar
router.route('/')

    .get(
        getAllGigs
    )

    .post(
        // multer kullanmamız lazım çünkü coverImage ve images değerlerimiz resim istiyorlar, resim koymadan istek atamayız. Fakat test için "required: true" değerini kaldırabiliriz.
        protect,
        createGig
    )

// id gerektiren rotalar

router.route('/:id')

    .get(getGig)
    // .delete(protect, deleteGig)


export default router;