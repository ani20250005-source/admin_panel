import React, { useState } from "react";

export default function ProductDetail() {
  const images = [
    "https://tse3.mm.bing.net/th/id/OIP.VbmDVZoch2S1fXeq1f44qQHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse3.mm.bing.net/th/id/OIP.VbmDVZoch2S1fXeq1f44qQHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse3.mm.bing.net/th/id/OIP.VbmDVZoch2S1fXeq1f44qQHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6 flex justify-center">
      {/* Single Card Wrapper */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-7xl p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-6 border-b  border-gray-200 pb-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Product Detail
          </h1>

          <div className="flex gap-2 bg-gray-200 rounded-full p-1 w-full sm:w-auto">
            <button className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-full w-full sm:w-auto">
              Unblock
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-300 w-full sm:w-auto">
              Block
            </button>
          </div>
        </div>
        {/* Container (Left + Right sections) */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            {/* Title + Price */}
            <div className="mb-3">
              <p className="text-gray-800 font-semibold">
                Fresh Organic Potatoes
              </p>

              <div className="flex items-center gap-3 mt-1">
                <span className="text-xl font-bold text-green-600">₹90</span>
                <span className="line-through text-gray-400">₹100</span>
                <span className="text-green-600 text-xs font-medium">
                  10% OFF
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2 border-b border-gray-200 pb-4">
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  ⭐ 4.5
                </span>
                <span className="text-gray-600 text-sm">
                  19,630 ratings and 146 reviews
                </span>
              </div>
            </div>

            {/* Thumbnails + Main Image */}
            <div className="flex gap-3">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="thumb"
                    className={`w-14 h-14 border rounded object-cover cursor-pointer ${
                      selectedImage === img
                        ? "border-green-600"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1">
                <img
                  src={selectedImage}
                  alt="product"
                  className="w-full max-h-64 sm:max-h-72 object-cover rounded"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-6 space-y-5 bg-white rounded-lg shadow">

             <h1 className="text-base sm:text-xs font-semibold text-gray-400">
                Merchant / Seller
            </h1>

            {/* Seller */}
            <div className="flex items-start gap-3 border-b border-gray-200 pb-4">
              <img
                src="https://www.bing.com/th/id/OIP.53HWJgROn3Sb1ULv8s2hlQHaLH?w=160&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1"
                alt="seller"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Green Valley Farm
                </h3>
                <p className="text-gray-500 text-sm">
                  Achimota Forest Rd, Accra, Ghana
                </p>
              </div>
            </div>

            {/* Description */}
             
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-base sm:text-xs font-semibold text-gray-400 pb-4">
                    Description
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed ">
                Bring home the perfect kitchen essential with our Fresh Premium
                Potatoes. Carefully selected from trusted farms, these potatoes
                are known for their smooth texture, firm body, and natural earthy
                taste. Whether you're preparing everyday meals or special dishes,
                our potatoes deliver consistent quality, freshness, and flavor in
                every bite.
                </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 border-b border-gray-200 pb-4">
              <p className="text-gray-400">Product Id</p>
              <p>90792308432-080</p>
              <p className="text-gray-400">Added Date</p>
              <p>22 Nov 2025</p>
              <p className="text-gray-400">Category</p>
              <p>Vegetables</p>
              <p className="text-gray-400">Sub Category</p>
              <p>Vegetable</p>
              <p className="text-gray-400">Stock</p>
              <p>80</p>
            </div>

            {/* Available Sizes */}
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-2">
                Available Size
              </p>
              <div className="flex flex-wrap gap-2">
                {["500g", "2 kg", "1 kg", "3 kg", "4 kg", "5 kg", "4.5kg"].map(
                  (size, i) => (
                    <button
                      key={i}
                      className={`border px-3 py-1 rounded text-sm hover:border-green-600 ${
                        size === "1 kg"
                          ? "border-green-600 bg-green-50"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="p-6 bg-white rounded-lg shadow">
             <p className="text-sm font-semibold text-gray-400 mb-4">
               Review & Ratings
              </p>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-600 text-white px-2 py-1 text-xs rounded">
              ⭐ 4.5
            </span>
            <span className="text-gray-600 text-sm">
              19,630 ratings and 146 reviews
            </span>
          </div>

          {/* Review Items */}
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              ⭐⭐⭐⭐
              <p className="italic">Very nice product!</p>
              <p className="text-xs text-gray-500">By Akash | 24 Nov 2025</p>
            </div>

            <div>
              ⭐⭐⭐⭐⭐
              <p className="italic">Fresh and organic!</p>
              <p className="text-xs text-gray-500">By Vijay | 22 Nov 2025</p>
            </div>

            <div>
              ⭐⭐⭐⭐
              <p className="italic">Natural, organic and best product!</p>
              <p className="text-xs text-gray-500">By Santosh | 20 Nov 2025</p>
            </div>

            <button className="text-green-600 font-medium text-sm">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
