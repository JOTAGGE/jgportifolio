// src/components/Sidebar.js

import React, { useEffect, useRef } from 'react';

const Sidebar = ({ onCategorySelect, activeCategory }) => {
    const sidebarRef = useRef(null);

    // Função para alternar a sidebar (usada internamente e por eventos de resize)
    const toggleSidebarVisibility = (forceShow = false, forceHide = false) => {
        const sidebar = sidebarRef.current;
        if (!sidebar) return;

        const toggleIcon = document.querySelector('.sidebar-toggle-button'); // Botão está no App.js, então selecionamos globalmente

        if (forceShow) {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('flex');
            if (toggleIcon) toggleIcon.classList.remove('rotated');
        } else if (forceHide) {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('flex');
            if (toggleIcon) toggleIcon.classList.remove('rotated');
        } else { // Toggle normal
            const isHidden = sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('flex');
            if (toggleIcon) toggleIcon.classList.toggle('rotated');
        }
    };


    // Lógica para controle da sidebar em telas grandes/pequenas
    const adjustLayoutForScreenSize = () => {
        if (window.innerWidth >= 768) { // Desktop (md breakpoint)
            toggleSidebarVisibility(true); // Garante que a sidebar esteja visível
        } else { // Mobile
            toggleSidebarVisibility(false, true); // Garante que a sidebar comece escondida
        }
    };

    useEffect(() => {
        adjustLayoutForScreenSize();
        window.addEventListener('resize', adjustLayoutForScreenSize);
        return () => {
            window.removeEventListener('resize', adjustLayoutForScreenSize);
        };
    }, []);

    // Helper para fechar a sidebar no mobile após a seleção
    const handleCategoryClick = (category) => {
        onCategorySelect(category);
        if (window.innerWidth < 768) {
            toggleSidebarVisibility(false, true); // Esconde a sidebar no mobile após clique
        }
    };

    return (
        <aside id="sidebar" ref={sidebarRef} className="w-64 bg-gray-800 text-white p-6 flex-col rounded-r-lg shadow-2xl transition-all duration-300 ease-in-out hidden overflow-y-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-blue-400 mb-6 cursor-pointer" onClick={() => handleCategoryClick('Home')}>MENU</h2>
                <ul className="space-y-4">
                    <li>
                        <a href="#layouts-design" className={`flex items-center space-x-3 text-gray-200 hover:text-blue-300 hover:bg-gray-700 p-3 rounded-lg transition duration-200 text-lg font-medium ${activeCategory === 'Layouts e Design' ? 'bg-blue-700 text-blue-200' : ''}`} onClick={() => handleCategoryClick('Layouts e Design')}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5l-1-1H9l-1 1v5m-4 0h16a1 1 0 011 1v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3a1 1 0 011-1z"></path></svg>
                            <span>Layouts e Design</span>
                        </a>
                    </li>
                    <li>
                        <a href="#ferramentas-uteis" className={`flex items-center space-x-3 text-gray-200 hover:text-blue-300 hover:bg-gray-700 p-3 rounded-lg transition duration-200 text-lg font-medium ${activeCategory === 'Ferramentas Úteis' ? 'bg-blue-700 text-blue-200' : ''}`} onClick={() => handleCategoryClick('Ferramentas Úteis')}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.606-.751 1.76-1.144 2.894-.96a4.487 4.487 0 014.004 4.004c.184 1.133-.208 2.288-.959 2.894l-3.5 3.5a1.999 1.999 0 01-2.828 0l-3.5-3.5c-.751-.606-1.144-1.76-.96-2.894a4.487 4.487 0 014.004-4.004z"></path></svg>
                            <span>Ferramentas Úteis</span>
                        </a>
                    </li>
                    <li>
                        <a href="#produtividade" className={`flex items-center space-x-3 text-gray-200 hover:text-blue-300 hover:bg-gray-700 p-3 rounded-lg transition duration-200 text-lg font-medium ${activeCategory === 'Produtividade' ? 'bg-blue-700 text-blue-200' : ''}`} onClick={() => handleCategoryClick('Produtividade')}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span>Produtividade</span>
                        </a>
                    </li>
                    <li>
                        <a href="#jogos" className={`flex items-center space-x-3 text-gray-200 hover:text-blue-300 hover:bg-gray-700 p-3 rounded-lg transition duration-200 text-lg font-medium ${activeCategory === 'Jogos' ? 'bg-blue-700 text-blue-200' : ''}`} onClick={() => handleCategoryClick('Jogos')}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            <span>Jogos</span>
                        </a>
                    </li>
                    <li>
                        <a href="#educacao-quizzes" className={`flex items-center space-x-3 text-gray-200 hover:text-blue-300 hover:bg-gray-700 p-3 rounded-lg transition duration-200 text-lg font-medium ${activeCategory === 'Educação e Quizzes' ? 'bg-blue-700 text-blue-200' : ''}`} onClick={() => handleCategoryClick('Educação e Quizzes')}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.205 5 7.5 5A6.5 6.5 0 003 11.5c0 1.654.477 3.205 1.253 4.348m-1.253-4.348V12c0 4.418 4.03 8 9 8s9-3.582 9-8v-.5m-9-13C13.168 5.477 14.795 5 16.5 5A6.5 6.5 0 0121 11.5c0 1.654-.477 3.205-1.253 4.348"></path></svg>
                            <span>Educação e Quizzes</span>
                        </a>
                    </li>
                    <li>
                        <a href="#projetos-api" className={`flex items-center space-x-3 text-gray-200 hover:text-blue-300 hover:bg-gray-700 p-3 rounded-lg transition duration-200 text-lg font-medium ${activeCategory === 'Projetos com API' ? 'bg-blue-700 text-blue-200' : ''}`} onClick={() => handleCategoryClick('Projetos com API')}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <span>Projetos com API</span>
                        </a>
                    </li>
                    <li>
                        <a href="#midia-pessoal" className={`flex items-center space-x-3 text-gray-200 hover:text-blue-300 hover:bg-gray-700 p-3 rounded-lg transition duration-200 text-lg font-medium ${activeCategory === 'Minha Mídia Pessoal' ? 'bg-blue-700 text-blue-200' : ''}`} onClick={() => handleCategoryClick('Minha Mídia Pessoal')}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L19 19M4 16l-.004-.004-.002-.002A2 2 0 016 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10z"></path></svg>
                            <span>Minha Mídia Pessoal</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="mt-auto text-center text-gray-500 text-sm py-4 border-t border-gray-700">
                <p>Nº de página: 0/0</p>
                <p>Use este guia</p>
            </div>
        </aside>
    );
};

export default Sidebar;
