import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Globe, MapPin, DollarSign, Flag } from 'lucide-react';


const DetailPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
    let {id} = useParams()
    let [dataa,setdata]= useState({})

    useEffect(()=>{
        fetch(`https://restcountries.com/v3.1/alpha/${id}`)
        .then(res => res.json())
        .then(res => setdata(res[0])) 
        .catch(err => console.error("Error fetching country:", err));

        setIsVisible(true);
    },[id])
  return (
    <div>
      
 


<section className="text-gray-600 body-font min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div 
        className={`container mx-auto flex px-5 py-16 items-center justify-center flex-col max-w-4xl bg-white rounded-2xl shadow-xl transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered ? '0 25px 50px -12px rgba(79, 70, 229, 0.3)' : '0 10px 30px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="relative w-full mb-10 flex justify-center">
          <div className={`overflow-hidden rounded-lg transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-95'}`}>
            <img 
              className={`lg:w-2/5 md:w-3/5 w-4/5 object-cover object-center rounded-lg shadow-md transition-all duration-700 transform ${isHovered ? 'scale-105' : 'scale-100'}`} 
              src={dataa?.flags?.png} 
              alt={dataa?.name?.official}
            />
          </div>
          <div className={`absolute -bottom-5 bg-white px-6 py-2 rounded-full shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Flag className="inline-block text-indigo-600 mr-2" size={18} />
            <span className="font-semibold text-gray-700">Country Profile</span>
          </div>
        </div>

        <div className={`text-center lg:w-2/3 w-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900 relative">
            <span className={`inline-block transition-all duration-500 ${isHovered ? 'text-indigo-600' : 'text-gray-900'}`}>
              {dataa?.name?.official}
            </span>
            <span className="block h-1 w-20 bg-indigo-500 mx-auto mt-2 rounded-full"></span>
          </h1>
          
          <p className="mb-8 leading-relaxed text-gray-600 italic text-lg">
            {dataa?.name?.nativeName?.urd?.official}
          </p>
          
          <div className={`flex flex-wrap justify-center gap-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`flex items-center px-4 py-2 bg-gray-50 rounded-lg shadow-sm transition-all duration-300 ${isHovered ? 'transform -translate-y-1 bg-indigo-50' : ''}`}>
              <DollarSign className="mr-2 text-indigo-500" size={20} />
              <div className="text-left">
                <h2 className="font-semibold text-gray-800">{dataa?.currencies?.PKR?.name}</h2>
                <span className="text-indigo-600 font-bold">{dataa?.currencies?.PKR?.symbol}</span>
              </div>
            </div>
            
            <div className={`flex items-center px-4 py-2 bg-gray-50 rounded-lg shadow-sm transition-all duration-300 ${isHovered ? 'transform -translate-y-1 bg-indigo-50' : ''}`}>
              <MapPin className="mr-2 text-indigo-500" size={20} />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Capital</h3>
                <span className="text-indigo-600 font-bold">{dataa?.capital?.[0]}</span>
              </div>
            </div>
            
            <div className={`flex items-center px-4 py-2 bg-gray-50 rounded-lg shadow-sm transition-all duration-300 ${isHovered ? 'transform -translate-y-1 bg-indigo-50' : ''}`}>
              <Globe className="mr-2 text-indigo-500" size={20} />
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">Region</h4>
                <span className="text-indigo-600 font-bold">{dataa?.region}</span>
              </div>
            </div>
          </div>
       
          <button 
            className={`mt-10 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              isHovered 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 transform -translate-y-1' 
                : 'bg-indigo-500 text-white shadow-md'
            }`}
          >
           this is all about country
          </button>
         
        </div>
      </div>
    </section>
      
    </div>
  )
}

export default DetailPage
