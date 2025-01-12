import React, { useState } from 'react';

const Layout = ({ children, currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['home', 'about', 'projects', 'contact'];

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-xl font-bold text-white"
              >
                Your Name
              </button>
            </div>
            
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {navItems.map(item => (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item)}
                  className={`${
                    currentPage === item ? 'text-white' : 'text-gray-300'
                  } hover:text-white transition-colors capitalize`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item}
                  onClick={() => {
                    setCurrentPage(item);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
