import React, { useEffect } from "react";
import { useGetAllGigs } from "../../services/gig";
import { Link, useSearchParams } from "react-router-dom";
import Card from "../../components/card";
import Title from "./title";

const Search = () => {

  const [params] = useSearchParams();

  const search = params.get('query');
  const category = params.get('category')

  const apiParams = {
    search,
    category
  }

  const { isLoading, error, data, refetch } = useGetAllGigs(apiParams)

  // urldeki query ve category değerlerini almak için useSearchParams kullanıcaz





  return (
    <div>
      {/* bunu güzelleştiricez */}
      <div className="mb-4">
        <Title search={search} category={category} />
      </div>

      {
        isLoading ? (
          <div>Yükleniyor</div>
        ) : error ? (
          <div>Hata oluştu</div>
        ) : (
          <div className="grid 
          [@media(min-width:480px)]:grid-cols-2
          grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              data?.map((item, key) => (
                <Card item={item} key={key} />
              ))
            }
          </div>
        )
      }
    </div>
  )
};

export default Search;
