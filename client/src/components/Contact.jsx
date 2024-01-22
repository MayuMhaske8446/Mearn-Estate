import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchLandlord = async () => {
      try {        
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }
  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea 
            name="message" 
            id="message" 
            rows="2"
            placeholder="Enter your message here!"
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={message}
            onChange={handleMessageChange}
          />
          <Link
          to={`mailto:${landlord.email}?subject=regarding ${listing.name}&body=${message}`}
          className="bg-slate-700 p-3 text-white rounded-lg text-center uppercase hover:opacity-95">
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
}

export default Contact;
