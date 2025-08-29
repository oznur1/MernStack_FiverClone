import React from "react";
import { useParams } from "react-router-dom";
import { useGetOneGig } from "../../services/gig";
import GigInfo from "./giginfo";

const Detail = () => {

  // önce URL'deki detail/:id kısmındaki :id'yi almamız lazım
  // çünkü bu ürünün sayfasına girdiğimizde sadece bu ürüne ait detaylara ihtiyacımız var
  // dolayısıyla sadece o ürünü çeken bir API isteği atmalıyız
  // o isteği de api.get kullanıp, çekeceğimiz ürünün IDsini vererek atabiliriz.

  const { id } = useParams();

  // idye eriştiğimzie göre api isteğini atarız.

  const { isLoading, data, error, refetch } = useGetOneGig(id);

  console.log("şuanki incelenen gig:", data)

  if (isLoading) return <div>Yükleniyor</div>

  if (error) return <div>Bir hata oluştu.</div>

  if (!data) return <p>İçerik yok veya kaldırıldı.</p>


  return (
    <div className="md:px-10 xl:px-15">
      <div className="">
        <div className="">
          {/* breadcrumb */}
          <GigInfo gig={data} />
          {/* userinfo */}
        </div>

        {/* package info */}
      </div>
    </div>);
};

export default Detail;
