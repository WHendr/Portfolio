import React, { useState } from 'react';
const Home = () => (
  <div className="bg-gray-800">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
          Your Name
        </h1>
        <p className="mt-4 text-xl text-gray-300">
          Full Stack Developer
        </p>
        <div className="mt-8">
          <button
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View My Work
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
