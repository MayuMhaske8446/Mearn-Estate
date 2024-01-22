import React from "react";
import { Link } from "react-router-dom";
import {MdLocationOn} from "react-icons/md";

function ListingItem({ listing }) {
  return (
    <div className="bg-white w-full sm:max-w-[250px] flex rounded-lg flex-wrap shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <Link to={`/listing/${listing._id}`} >
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105"
        />
        <div className="p-3 flex flex-col gap-2">
          <p className="font-semibold text-lg text-slate-700 truncate">{listing.name}</p>
          <div className="flex flex-wrap gap-1 items-center">
            <MdLocationOn className="h-4 w-4 text-green-700"/>
            <p className="text-sm text-gray-600 whitespace-nowrap truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
          <p>$
            {listing.offer ? listing.discountPrice.toLocaleString() : listing.regularPrice.toLocaleString()}
            {listing.type === "rent" && "/month" }
          </p>
          <div className="text-slate-700 flex gap-2">
            <div className="text-xs font-bold">
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed` }
            </div>
            <div className="text-xs font-bold">
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath` }
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
