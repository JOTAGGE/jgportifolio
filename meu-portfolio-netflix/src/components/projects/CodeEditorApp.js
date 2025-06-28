// src/components/projects/CodeEditorApp.js

import React, { useState } from 'react';

const CodeEditorApp = () => {
    const [code, setCode] = useState('// Escreva seu código JavaScript aqui\nconsole.log("Olá, mundo!");');
    const [output, setOutput] = useState('');

    const runCode = () => {
        try {
            // ATENÇÃO: Executar código arbitrário com `eval` pode ser um risco de segurança.
            // Para aplicações reais, utilize soluções mais seguras como Web Workers
            // ou ambientes de sandbox dedicados. Este é um exemplo simplificado.

            // Captura console.log
            let consoleOutput = '';
            const originalLog = console.log;
            console.log = (...args) => {
                consoleOutput += args.map(arg => String(arg)).join(' ') + '\n';
                originalLog(...args); // Ainda loga no console do navegador
            };

            // Avalia o código
            eval(code);

            // Restaura console.log
            console.log = originalLog;
            setOutput(consoleOutput || 'Execução concluída. Nenhum output no console.');

        } catch (err) {
            setOutput(`Erro: ${err.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-3xl text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Editor de Código JavaScript</h2>
                <textarea
                    className="w-full h-64 p-4 mb-4 rounded-lg bg-gray-700 text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck="false"
                ></textarea>
                <button
                    onClick={runCode}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 mb-4 w-full"
                >
                    Executar Código
                </button>
                <div className="bg-gray-700 p-4 rounded-lg max-h-48 overflow-y-auto font-mono text-sm">
                    <h3 className="text-lg font-semibold mb-2">Saída:</h3>
                    <pre className="whitespace-pre-wrap text-gray-200">{output || 'Nenhuma saída ainda.'}</pre>
                </div>
            </div>
        </div>
    );
};

export default CodeEditorApp;
