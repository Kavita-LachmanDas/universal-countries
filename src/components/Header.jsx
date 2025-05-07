import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider';
import { IoIosSettings } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Header = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { setTheme, currentStyle } = useContext(ThemeContext);
  const [showSettings, setShowSettings] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();
      setData(countries);
      setFilteredData(countries);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  // Filter data when search term changes
  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, data]);

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Skeleton loader for cards
  const CardSkeleton = () => (
    <div className="w-72 h-80 bg-gray-200 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div style={currentStyle.base} className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Countries of the World</h1>
            <p className="text-lg opacity-75">Loading amazing countries for you...</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {[...Array(8)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={currentStyle.base} className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <h1 className="text-3xl font-bold">Countries Explorer</h1>
            <div className="relative">
              <IoIosSettings
                onClick={() => setShowSettings(!showSettings)}
                className="text-2xl cursor-pointer hover:rotate-90 transition-transform duration-300"
              />
              
              {showSettings && (
                <div className="w-[300px] absolute z-10 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium mb-2 text-center">Choose Theme</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTheme("light")}
                      className="w-[100px] px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className="w-[100px] px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => setTheme("green")}
                      className="w-[100px] px-3 py-2 bg-green-400 text-white rounded hover:bg-green-500 transition-colors"
                    >
                      Green
                    </button>
                    <button
                      onClick={() => setTheme("blue")}
                      className="w-[100px] px-3 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors"
                    >
                      Blue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm opacity-75">
            Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0}-
            {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} countries
          </p>
        </div>

        {/* Countries Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {currentItems.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No countries found</h3>
            <p className="opacity-75">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <select 
                className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={8}>8 per page</option>
                <option value={12}>12 per page</option>
                <option value={16}>16 per page</option>
                <option value={24}>24 per page</option>
              </select>
            </div>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md ${
                  currentPage === 1 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors`}
              >
                <FaChevronLeft size={14} />
              </button>
              
              <div className="flex">
                {getPaginationGroup(currentPage, totalPages).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 mx-1 flex items-center justify-center rounded-md transition-colors ${
                      currentPage === number
                        ? 'bg-blue-500 text-white font-medium' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md ${
                  currentPage === totalPages 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors`}
              >
                <FaChevronRight size={14} />
              </button>
            </div>
            
            <div className="mt-4 md:mt-0 text-sm opacity-75">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to generate pagination numbers
const getPaginationGroup = (currentPage, totalPages) => {
  let start = Math.max(currentPage - 2, 1);
  let end = Math.min(start + 4, totalPages);
  
  if (end - start < 4) {
    start = Math.max(end - 4, 1);
  }
  
  return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
};

// Country Card Component
const CountryCard = ({ country }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="w-72 overflow-hidden rounded-xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          className="w-full h-48 object-cover" 
          src={country.flags.png} 
          alt={country.flags.alt || `Flag of ${country.name.common}`} 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className="px-2 py-1 text-xs font-medium bg-white/90 rounded-full">
            {country.region}
          </span>
        </div>
      </div>
      
      <div className="px-6 py-4">
        <h2 className="mb-2 text-xl font-bold text-gray-800 truncate">
          {country.name.common}
        </h2>
        
        <div className="mb-4 text-sm text-gray-600">
          <p>{country.capital && country.capital[0]}</p>
        </div>
        
        <a href={`/countriesApi/${country.ccn3}`}>
          <button 
            className={`w-full py-2 px-4 font-medium rounded-lg ${
              isHovered 
                ? 'bg-indigo-600 text-white' 
                : 'bg-indigo-500 text-white'
            } transition-all duration-300 transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
          >
            View Details
          </button>
        </a> 
      </div>
    </div>
  );
};

export default Header;