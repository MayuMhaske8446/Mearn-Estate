import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";
import {useSelector} from "react-redux";
import Contact from "../components/Contact";

function Listing() {
  const {currentUser} = useSelector((state) => state.user);
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [contact, setContact] = useState(false);
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
  return (
    <main>
      {loading && <p className="text-2xl text-center my-7">Loading...</p>}
      {error && (
        <p className="text-2xl text-center my-7">Something went wrong!</p>
      )}
      {listing && !error && !loading && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => {
              return (
                <SwiperSlide key={url}>
                  <div
                    className="h-[480px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="flex flex-col gap-4 max-w-4xl mx-auto p-3 my-7">
            <div className="text-lg sm:text-2xl font-semibold flex gap-2">
              <p>{listing.name}</p>
              <span>-</span>
              <p>
                {listing.offer
                  ? listing.discountPrice.toLocaleString()
                  : listing.regularPrice.toLocaleString()}
              </p>
              <p>{listing.offer ? "$/month" : "$"}</p>
            </div>
            <p className="flex gap-2 items-center">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] p-2 text-center text-white rounded-md">
                {listing.type === "rent" ? "For Rent" : "for Sell"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] p-2 text-center text-white rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaBed className="text-xl"/>
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaBath className="text-xl"/>
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaParking className="text-xl"/>
                {listing.parking ? "Parking Sopt" : "No Parking"}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaChair className="text-xl"/>
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact &&(
            <button onClick={()=>setContact(true)} className="bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95">Contact Landlord</button>
            )}
            {contact && (
              <Contact listing={listing}/>
            )}           
          </div>
        </>
      )}
    </main>
  );
}

export default Listing;
