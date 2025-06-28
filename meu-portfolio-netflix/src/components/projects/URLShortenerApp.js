// src/components/projects/URLShortenerApp.js

import React, { useState } from 'react';

const URLShortenerApp = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const shortenUrl = async () => {
        if (!longUrl) {
            setError('Por favor, insira uma URL.');
            setShortUrl('');
            return;
        }

        setLoading(true);
        setError('');
        setShortUrl('');

        // Usando a API shrtco.de (gratuita e sem necessidade de chave API para uso básico)
        try {
            const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${longUrl}`);
            const data = await response.json();

            if (data.ok) {
                setShortUrl(data.result.full_short_link);
            } else {
                setError(data.error || 'Erro ao encurtar URL. Verifique a URL e tente novamente.');
            }
        } catch (err) {
            setError('Erro de rede. Verifique sua conexão.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (shortUrl) {
            // navigator.clipboard.writeText(shortUrl); // Use execCommand for broader compatibility in iframes
            const textarea = document.createElement('textarea');
            textarea.value = shortUrl;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('URL encurtada copiada para a área de transferência!');
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Encurtador de URL</h2>
                <div className="flex flex-col gap-4 mb-4">
                    <input
                        type="url"
                        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Cole sua URL longa aqui"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter') shortenUrl(); }}
                    />
                    <button
                        onClick={shortenUrl}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Encurtando...' : 'Encurtar URL'}
                    </button>
                </div>

                {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                {shortUrl && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="break-all text-blue-300 underline cursor-pointer" onClick={copyToClipboard}>
                            {shortUrl}
                        </p>
                        <button
                            onClick={copyToClipboard}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200 flex-shrink-0"
                        >
                            Copiar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default URLShortenerApp;
