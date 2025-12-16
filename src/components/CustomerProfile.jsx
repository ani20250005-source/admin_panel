import React, { useState } from "react";
import { User, Phone, Mail, ShoppingBag, Gift, Clock } from 'lucide-react';
import { ArrowLeft } from "lucide-react";

// --- Static Data pulled from screenshot ---
const userDetails = {
    name: "Malcolm Hoffman",
    phone: "+91-888-000-3058",
    email: "myemailaddress@gmail.com",
    address: "298, 14 Abc, 124, Pune",
    accountName: "Brian Blackwood",
};

const userStats = [
    { title: "Purchased Items", screenshotValue: 8 },
    { title: "Reward Point", value: "1,500" },
    { title: "Member Since", screenshotValue: "28 OCT 2023" }
];

const favoriteItems = [
    { title: "Fresh Organic Red Apples", price: 200, img: "https://tse2.mm.bing.net/th/id/OIP.uvJOXpJOti1brr7kDtya0QHaE7?pid=Api&P=0&h=180" },
    { title: "Fresh Oranges", price: 115, img: "https://tse4.mm.bing.net/th/id/OIP.ARPB6Gz61AOcstcRiXFO8AHaE6?pid=Api&P=0&h=180" },
    { title: "Fresh Organic Vegetables", price: 55, img: "https://tse1.mm.bing.net/th/id/OIP.rFHQoUx68hviApDSvy2tRQHaFA?pid=Api&P=0&h=180" },
    { title: "Fresh Seafood", price: 640, img: "https://tse4.mm.bing.net/th/id/OIP.Hlel7TT5LvcmLsSRjRWDLgHaFW?pid=Api&P=0&h=180" },
    { title: "Fresh Chicken", price: 150, img: "https://tse2.mm.bing.net/th/id/OIP.2x5JgL7X4-j3L4zWz4hKqAHaE8?pid=Api&P=0&h=180" },
    { title: "Fresh chicken drum stick", price: 320, img: "https://tse3.mm.bing.net/th/id/OIP.J92tZ3EbQOtF_uW1IInyWwHaHG?pid=Api&P=0&h=180" },
    { title: "Fresh Pineapples", price: 150, img: "https://tse1.mm.bing.net/th/id/OIP.WFRTuwmEhFxEynP7ECCgJgHaEc?pid=Api&P=0&h=180" },
    { title: "Organic Fresh Milk", price: 250, img: "https://tse1.mm.bing.net/th/id/OIP.Yf-m5DDuj0O7X5KUphK7VgHaEA?pid=Api&P=0&h=180" },
    { title: "Fresh Organic Brinjals", price: 120, img: "https://tse4.mm.bing.net/th/id/OIP.ynSzsgD_7yKiW9lEDbaAVwHaEl?pid=Api&P=0&h=180" },
];

const TopStatCard = ({ title, value }) => (
    <div className="flex-1 min-w-[100px] py-3 px-3 bg-gray-100 border border-gray-200 rounded-md text-center">
        <p className="text-xs font-medium text-gray-600">{title}</p>
        <p className="text-sm font-bold text-gray-800 mt-0.5">{value}</p>
    </div>
);

const DetailField = ({ label, value, readOnly = false, isAddress = false }) => (
    <div className={isAddress ? "md:col-span-3 lg:col-span-1" : "md:col-span-1"}>
        <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
        <p className={`w-full py-1 text-gray-800 font-medium ${readOnly ? "text-gray-600" : ""}`}>{value}</p>
        <div className={`w-full h-[1px] ${readOnly ? "bg-gray-200" : "bg-gray-300"}`}></div>
    </div>
);

const FavoriteItemCard = ({ title, price, img }) => (
    <div className="group border border-gray-100 rounded-lg bg-white overflow-hidden hover:shadow-lg transition cursor-pointer">
        <div className="relative overflow-hidden h-28 xs:h-32 sm:h-40 md:h-48">
            <img
                src={img}
                className="h-full w-full object-cover transform group-hover:scale-105 duration-500"
                alt={title}
            />
        </div>
        <div className="p-3">
            <p className="text-xs sm:text-sm font-semibold text-gray-700 truncate mb-1">{title}</p>
            <p className="text-md sm:text-lg font-extrabold text-[#7c982d]">₹{price}</p>
        </div>
    </div>
);

// MAIN COMPONENT
export default function UserProfileOverview() {
    const [isBlocked, setIsBlocked] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    const [accountInfo] = useState({
        fullName: userDetails.accountName,
        mobileNumber: userDetails.phone,
        address: userDetails.address,
    });

    const displayFavorites = favoriteItems.slice(0, 10);

    const getButtonStyle = (isActionBlocked) => {
        const baseStyle = "transition px-3 py-1 rounded-full text-sm font-semibold shadow-sm ml-2";
        return isActionBlocked === isBlocked
            ? isBlocked
                ? `bg-red-500 text-white hover:bg-red-600 ${baseStyle}`
                : `bg-[#7c982d] text-white hover:bg-[#6f7f26] ${baseStyle}`
            : `bg-gray-200 text-gray-500 cursor-not-allowed ${baseStyle}`;
    };

   return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

        {/* BACK BUTTON */}
        <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-700 mb-4 hover:text-black transition"
        >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex justify-center">
            <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl border border-gray-200 p-3 sm:p-6">

                <div className="w-full pt-4 sm:pt-6">

                    {/* HEADER */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                        <h1 className="text-xl font-bold text-gray-900">Profile</h1>

                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <button 
                                onClick={() => setPendingAction("unblock")} 
                                disabled={!isBlocked} 
                                className={getButtonStyle(false)}
                            >
                                Unblock
                            </button>
                            <button 
                                onClick={() => setPendingAction("block")} 
                                disabled={isBlocked} 
                                className={getButtonStyle(true)}
                            >
                                Block
                            </button>
                        </div>
                    </div>

                    {/* INFO CONTAINER */}
                    <div className="bg-white p-4 sm:p-6 mb-8 rounded-xl border border-gray-100">
                        <div className="flex flex-wrap gap-4 sm:gap-6 items-center mb-6">
                            <img 
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400"
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                                alt="User Avatar"
                            />

                            <div className="flex-1 min-w-[150px]">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">{userDetails.name}</h2>
                                <p className="text-sm text-gray-600">{userDetails.phone}</p>
                            </div>

                            <div className="flex gap-3 w-full sm:w-auto">
                                <TopStatCard title="Purchased Items" value={userStats[0].screenshotValue} />
                                <TopStatCard title="Reward Point" value={userStats[1].value} />
                                <TopStatCard title="Member Since" value={userStats[2].screenshotValue} />
                            </div>
                        </div>

                        {/* ACCOUNT INFO */}
                        <h3 className="text-lg font-bold text-gray-800 mb-3">Account Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
                            <DetailField label="Full Name" value={accountInfo.fullName} />
                            <DetailField label="Email Address" value={userDetails.email} readOnly />
                            <DetailField label="Mobile Number" value={accountInfo.mobileNumber} />
                        </div>

                        {/* ADDRESS */}
                        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
                            <DetailField label="Address 1" value={accountInfo.address} isAddress />
                        </div>
                    </div>

                    {/* FAVORITES */}
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
                            Favorites ({displayFavorites.length})
                        </h3>

                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                            {displayFavorites.map((item, index) => (
                                <FavoriteItemCard key={index} {...item} />
                            ))}
                        </div>
                    </div>

                    {/* MODAL */}
                    {pendingAction && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-5 sm:p-6">
                                <h3
                                    className={`text-lg sm:text-xl font-bold mb-3 ${
                                        pendingAction === "block" ? "text-red-600" : "text-[#7c982d]"
                                    }`}
                                >
                                    {pendingAction === "block" ? "Confirm User Block" : "Confirm User Unblock"}
                                </h3>

                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    {pendingAction === "block"
                                        ? "Are you sure you want to permanently block this user?"
                                        : "Are you sure you want to unblock this user?"}
                                </p>

                                <div className="flex justify-end gap-3 flex-wrap">
                                    <button
                                        onClick={() => setPendingAction(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={() => {
                                            setIsBlocked(pendingAction === "block");
                                            setPendingAction(null);
                                        }}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md ${
                                            pendingAction === "block"
                                                ? "bg-red-600 hover:bg-red-700"
                                                : "bg-[#7c982d] hover:bg-[#6f7f26]"
                                        }`}
                                    >
                                        {pendingAction === "block" ? "Block User" : "Unblock User"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

}
