import React, { useState } from 'react';
const About = () => (
  <div className="bg-gray-800">
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-white mb-8">About Me</h2>
      <div className="prose prose-invert">
        <p className="text-gray-300 text-lg">
          I'm a passionate full-stack developer with expertise in modern web technologies.
          With several years of experience building web applications, I focus on creating
          clean, efficient, and user-friendly solutions.
        </p>
        <h3 className="text-white text-xl mt-8 mb-4">Skills</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <div>
            <h4 className="text-white mb-2">Frontend</h4>
            <ul className="list-disc list-inside text-gray-300">
              <li>React & Redux</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-2">Backend</h4>
            <ul className="list-disc list-inside text-gray-300">
              <li>Node.js</li>
              <li>Python</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);
