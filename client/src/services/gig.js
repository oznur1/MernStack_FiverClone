import api from "../api";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'






// hizmetlerle alakalı api isteklerimizin hepsini burada belirleyeceğiz
// ve lazım olduğu yerde export edip kullanacağız.


const gigService = {
    getAll: (params) => api.get('/gig', { params }),
    getOne: (id) => api.get(`/gig/${id}`)
}

// bütün hizmetleri al ve hafızanda tut
const useGetAllGigs = (params) =>

    // GET istekleri için genellikle useQuery kullanırız
    useQuery({
        // queryKey => bu isteği diğerlerinden ayırt ettirecek değerleri gireriz, örn. bütün gigleri aldığı için "gigs" ve varsa params değerini içine girebiliriz
        queryKey: ['gigs', params],

        //queryFn => bu query çalıştığında çalışacak fonksiyondur, api isteğini burada atmamız gerekiyor
        queryFn: () => gigService.getAll(params),

        // gelen cevabın içinden asıl kullanılacak veriyi seçtireceğimiz fonksiyondur
        select: (res) => res.data.data
    })

// tek bir hizmeti al ve hafızanda tut
const useGetOneGig = (id) => 
    useQuery({
        queryKey: ['gig'],
        queryFn: () => gigService.getOne(id),
        select: (res) => res.data.data
    })


export {gigService, useGetAllGigs, useGetOneGig}