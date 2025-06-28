// src/components/ProjectCard.js

import React from 'react';

const ProjectCard = ({ project, onProjectSelect }) => {
    return (
        <div
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8 text-center h-56 flex flex-col items-center justify-center border border-gray-700 hover:border-blue-500 transition duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => onProjectSelect(project.id)}
        >
            <span className="text-gray-400 text-lg font-medium">{project.name}</span>
            <p className="text-gray-500 text-sm mt-2">{project.description}</p>
        </div>
    );
};

export default ProjectCard;
