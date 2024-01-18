import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from "swiper";
import {Navigation} from "swiper/modules";
import "swiper/css/bundle";

function Listing() {
    SwiperCore.use([Navigation]);
  const params = useParams();
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setError(null);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(flase);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return <main>
    {loading &&
    <p className="text-2xl text-center my-7">Loading...</p>}
    {error &&
    <p className="text-2xl text-center my-7">Something went wrong!</p>}
    {listing && !error && !loading && <>
        <Swiper navigation>
            {listing.imageUrls.map((url)=>{
                return (<SwiperSlide key={url}>
                    <div className='h-[550px]'
                    style={{background : `url(${url}) center no-repeat`, backgroundSize: "cover"}}
                    ></div>
                </SwiperSlide>)
            })}
        </Swiper>
    </>};
  </main>;
}

export default Listing;
