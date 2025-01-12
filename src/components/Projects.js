import React, { useState } from 'react';
const Projects = () => {
  const projects = [
    {
      title: "Project One",
      description: "A full-stack web application built with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      imageUrl: "/api/placeholder/400/300",
      link: "#"
    },
    {
      title: "Project Two",
      description: "Mobile-responsive e-commerce platform",
      technologies: ["React", "Redux", "Firebase", "Stripe"],
      imageUrl: "/api/placeholder/400/300",
      link: "#"
    },
    {
      title: "Project Three",
      description: "Real-time data visualization dashboard",
      technologies: ["React", "D3.js", "WebSocket", "Material-UI"],
      imageUrl: "/api/placeholder/400/300",
      link: "#"
    }
  ];

    return (
    <div className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-medium text-white">{project.title}</h3>
                <p className="mt-2 text-gray-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link}
                  className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Project <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
