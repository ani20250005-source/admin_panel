import React, { useState } from "react";
import {
  Cloud,
  Save,
  Key,
  RotateCw,
  MapPin,
  CheckCircle,
  Wifi,
  Gauge,
} from "lucide-react";

// --- Sub-Component 1: InputGroup ---
const InputGroup = ({ label, type, value, onChange, editable }) => {
  // Utility to select the icon
  const getIcon = (inputType) => {
    switch (inputType) {
      case "key":
        return <Key className="w-5 h-5 text-gray-400" />;
      case "refresh":
        return <RotateCw className="w-5 h-5 text-gray-400" />;
      case "location":
        return <MapPin className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center text-sm text-gray-700 mb-1 font-medium">
        {getIcon(type)}
        <label className="ml-2">{label}</label>
      </div>
      <input
        type={type === "key" ? "password" : "text"}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        readOnly={!editable}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

// --- Sub-Component 2: ProviderCard ---
const ProviderCard = ({
  name,
  rateLimit,
  requestsToday,
  status,
  onActivate,
}) => {
  const isActive = status === "Active";

  // Utility function to get the correct icon based on provider name
  const getProviderIcon = (providerName) => {
    if (providerName.includes("Open"))
      return (
        <Cloud
          className={`w-6 h-6 ${isActive ? "text-green-700" : "text-gray-500"}`}
        />
      );
    // Using Wifi for WeatherBit just for visual distinction as per the original component idea
    if (providerName.includes("Bit"))
      return (
        <Wifi
          className={`w-6 h-6 ${isActive ? "text-green-700" : "text-gray-500"}`}
        />
      );
    if (providerName.includes("API"))
      return (
        <Cloud
          className={`w-6 h-6 ${isActive ? "text-green-700" : "text-gray-500"}`}
        />
      );
    return (
      <Cloud
        className={`w-6 h-6 ${isActive ? "text-green-700" : "text-gray-500"}`}
      />
    );
  };

  // Determine button styles
  const buttonClass = isActive
    ? "bg-green-600 hover:bg-green-700 text-white"
    : "bg-white hover:bg-gray-50 text-green-700 border border-green-700";

  // Determine card styles for the active provider
  const cardClass = isActive
    ? "border border-green-500"
    : "border border-gray-200";

  return (
    <div
      className={`p-4 rounded-lg shadow-sm flex items-center justify-between transition-all duration-200 mb-4 bg-white ${cardClass}`}
    >
      {/* Left Section: Icon, Name, Rate Limit */}
      <div className="flex items-center">
        <div
          className={`mr-4 p-2 rounded-full ${
            isActive ? "bg-green-100" : "bg-gray-100"
          }`}
        >
          {getProviderIcon(name)}
        </div>
        <div>
          <h3
            className={`text-lg font-semibold ${
              isActive ? "text-gray-800" : "text-gray-600"
            }`}
          >
            {name}
          </h3>
          <p className="text-sm text-gray-500">
            Rate Limit: <span className="font-medium">{rateLimit}</span>
          </p>
        </div>
      </div>

      {/* Right Section: Requests Today, Button */}
      <div className="flex items-center space-x-6">
        <div className="text-right hidden sm:block">
          {" "}
          {/* Hide on small screens to ensure responsiveness */}
          <p className="text-sm text-gray-500">Requests Today</p>
          <p className="text-lg font-semibold text-gray-800">{requestsToday}</p>
        </div>
        <button
          onClick={() => onActivate(name)}
          className={`px-4 py-2 rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${buttonClass}`}
        >
          {isActive ? "Active" : "Activate"}
        </button>
      </div>
    </div>
  );
};

// --- Main Component: App ---
const App = () => {
  // Static data for providers
  const [providers, setProviders] = useState([
    {
      name: "OpenWeatherMap",
      rateLimit: "60/min",
      requestsToday: "12,345",
      status: "Active",
    },
    {
      name: "WeatherBit",
      rateLimit: "50/min",
      requestsToday: "12,345",
      status: "Inactive",
    },
    {
      name: "WeatherAPI",
      rateLimit: "100/min",
      requestsToday: "12,345",
      status: "Inactive",
    },
  ]);

  // State for Settings
  const [tempUnit, setTempUnit] = useState("Celsius");
  const [enableForecast, setEnableForecast] = useState(true);

  const handleActivateProvider = (providerName) => {
    setProviders((prev) =>
      prev.map((p) => ({
        ...p,
        status: p.name === providerName ? "Active" : "Inactive",
      }))
    );
  };
  const [apiKeys, setApiKeys] = useState({
    openWeather: "",
    weatherBit: "",
    weatherApi: "",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-3 sm:mb-0">
          <h1 className="text-xl font-semibold text-gray-800">
            Weather Settings
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Configure API and display settings
          </p>
        </div>
        <button
          onClick={() => {
            console.log({
              activeProvider: providers.find((p) => p.status === "Active")
                ?.name,
              tempUnit,
              enableForecast,
              apiKeys,
            });
            alert("Settings Saved");
          }}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150"
        >
          <Save className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Save Changes</span>
          <span className="sm:hidden">Save</span>
        </button>
      </header>

      {/* Info Alert Box */}
      <div className="bg-green-50 border border-green border-l-4 border-green-400 p-4 mb-8 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Cloud className="w-5 h-5 text-green-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              Weather information is displayed across all apps (Farmer, Seller,
              Buyer)...
            </p>
            <p className="mt-1 text-xs text-green-700">
              Configure API keys and settings to provide accurate weather data
              to your users.
            </p>
          </div>
        </div>
      </div>

      {/* --- Weather API Providers Section --- */}
      <h2 className="text-lg font-bold text-gray-800 mb-3">
        Weather API Prviders
      </h2>
      {providers.map((provider) => (
        <ProviderCard
          key={provider.name}
          {...provider}
          onActivate={handleActivateProvider}
        />
      ))}

      <hr className="my-8 border-gray-200" />

      {/* --- Keys & Settings Section (Responsive Grid) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* API Keys Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg border-b border-gray-200 pb-4 font-bold text-gray-800 mb-6">
            API Keys
          </h2>

          <InputGroup
            label="OpenWeatherMap API Key"
            type="key"
            value={apiKeys.openWeather}
            editable
            onChange={(v) => setApiKeys({ ...apiKeys, openWeather: v })}
          />
          <InputGroup
            label="WeatherBit API Key"
            type="key"
            value={apiKeys.weatherBit}
            editable
            onChange={(v) => setApiKeys({ ...apiKeys, weatherBit: v })}
          />

          <InputGroup
            label="WeatherAPI Key"
            type="key"
            value={apiKeys.weatherApi}
            editable
            onChange={(v) => setApiKeys({ ...apiKeys, weatherApi: v })}
          />

          <button
            onClick={() => {
              console.log("API KEYS:", apiKeys);
              alert("API Keys Updated");
            }}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150"
          >
            Update API Keys
          </button>
        </div>

        {/* Settings Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg border-b border-gray-200 pb-4 font-bold text-gray-800 mb-6">
            Settings
          </h2>

          <InputGroup
            label="Refresh Rate"
            type="refresh"
            value="******************"
          />
          <InputGroup
            label="Baner, Pune"
            type="location"
            value="******************"
          />

          {/* Temperature Unit Setting */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-700 mb-2 font-medium">
              <RotateCw className="w-5 h-5 text-gray-400" />{" "}
              {/* Reusing RotateCw for spacing, though not exactly correct */}
              <span className="ml-2">Temperature Unit</span>
            </div>
            <div className="flex items-center space-x-6">
              {/* Celsius Radio */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tempUnit"
                  value="Celsius"
                  checked={tempUnit === "Celsius"}
                  onChange={() => setTempUnit("Celsius")}
                  className="sr-only" // Hide native radio
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 transition duration-150 ${
                    tempUnit === "Celsius"
                      ? "border-green-600 bg-green-600 flex items-center justify-center"
                      : "border-gray-400"
                  }`}
                >
                  {tempUnit === "Celsius" && (
                    <CheckCircle className="w-4 h-4 text-white p-[1px]" />
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-700 font-medium">
                  Celsius (°C)
                </span>
              </label>

              {/* Fahrenheit Radio */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tempUnit"
                  value="Fahrenheit"
                  checked={tempUnit === "Fahrenheit"}
                  onChange={() => setTempUnit("Fahrenheit")}
                  className="sr-only" // Hide native radio
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 transition duration-150 ${
                    tempUnit === "Fahrenheit"
                      ? "border-green-600 bg-green-600 flex items-center justify-center"
                      : "border-gray-400"
                  }`}
                >
                  {tempUnit === "Fahrenheit" && (
                    <CheckCircle className="w-4 h-4 text-white p-[1px]" />
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-700 font-medium">
                  Fahrenheit (°F)
                </span>
              </label>
            </div>
          </div>

          {/* Enable Forecast Toggle */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-700 font-medium">
              Enable Forecast
            </span>
            {/* Custom Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableForecast}
                onChange={() => setEnableForecast(!enableForecast)}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 transition-colors duration-200 ${
                  enableForecast ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <div
                  className={`absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-200 shadow ${
                    enableForecast ? "translate-x-full" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
