// src/components/projects/MemeGeneratorApp.js

import React, { useState, useEffect } from 'react';

const MemeGeneratorApp = () => {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [memeImage, setMemeImage] = useState('https://i.imgflip.com/1bh6.jpg'); // Imagem padrão
    const [allMemeImages, setAllMemeImages] = useState([]);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes));
    }, []);

    const getMemeImage = () => {
        const randomIndex = Math.floor(Math.random() * allMemeImages.length);
        setMemeImage(allMemeImages[randomIndex].url);
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-xl text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Gerador de Memes</h2>
                <div className="flex flex-col gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Texto de cima"
                        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={topText}
                        onChange={(e) => setTopText(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Texto de baixo"
                        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={bottomText}
                        onChange={(e) => setBottomText(e.target.value)}
                    />
                    <button
                        onClick={getMemeImage}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
                    >
                        Gerar nova imagem de meme
                    </button>
                </div>
                <div className="relative border-2 border-gray-700 rounded-lg overflow-hidden flex justify-center items-center">
                    <img src={memeImage} alt="Meme" className="max-w-full h-auto object-contain max-h-96" />
                    <h2 className="absolute top-4 w-full text-center text-white text-3xl md:text-4xl font-bold uppercase drop-shadow-lg p-2 break-words leading-none">
                        {topText}
                    </h2>
                    <h2 className="absolute bottom-4 w-full text-center text-white text-3xl md:text-4xl font-bold uppercase drop-shadow-lg p-2 break-words leading-none">
                        {bottomText}
                    </h2>
                </div>
                <p className="text-gray-500 text-sm mt-4 text-center">
                    (Nota: As imagens vêm da API imgflip.com)
                </p>
            </div>
        </div>
    );
};

export default MemeGeneratorApp;
