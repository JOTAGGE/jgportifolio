// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import ThreeJSBackground from './components/ThreeJSBackground'; // Importa o componente Three.js
import Sidebar from './components/Sidebar'; // Importa o componente Sidebar
import MainContent from './components/MainContent'; // Importa o componente MainContent

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('Home'); // 'Home' ou nome da categoria específica
    const [selectedProjectId, setSelectedProjectId] = useState(null); // ID do projeto a ser exibido

    // Ref para o wrapper do conteúdo principal para ajustar a margem
    const mainContentWrapperRef = useRef(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedProjectId(null); // Redefine a seleção do projeto quando a categoria muda
    };

    const handleProjectSelect = (projectId) => {
        setSelectedProjectId(projectId);
        // No mobile, você pode querer fechar a barra lateral aqui também
        // (a lógica de fechar a sidebar no mobile está no componente Sidebar)
    };

    const handleBackToCategories = () => {
        setSelectedProjectId(null);
        // Opcionalmente, você pode redefinir selectedCategory para 'Home' aqui:
        // setSelectedCategory('Home');
    };

    // Lógica para alternar a Sidebar para ajustar a margem do wrapper do conteúdo principal
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar'); // Acessa via ID, pois é um irmão de mainContentWrapperRef
        const toggleIcon = document.querySelector('.sidebar-toggle-button');
        const mainContentWrapper = mainContentWrapperRef.current;

        if (sidebar && toggleIcon && mainContentWrapper) {
            const isHidden = sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('flex'); // Adiciona flex se visível
            toggleIcon.classList.toggle('rotated');

            // Ajusta a margem do wrapper do conteúdo principal
            if (!isHidden) { // Se a sidebar está se tornando visível
                if (window.innerWidth >= 768) { // Apenas para desktop
                    mainContentWrapper.classList.add('sidebar-open');
                }
            } else { // Se a sidebar está sendo escondida
                mainContentWrapper.classList.remove('sidebar-open');
            }
        }
    };

     useEffect(() => {
        // Verificação inicial e listener de redimensionamento para a margem de mainContentWrapper
        const adjustMainContentMargin = () => {
            const sidebar = document.getElementById('sidebar');
            const mainContentWrapper = mainContentWrapperRef.current;
            if (sidebar && mainContentWrapper) {
                // Se a largura da janela for >= 768px E a sidebar não estiver oculta/display flex
                if (window.innerWidth >= 768 && sidebar.classList.contains('flex') && !sidebar.classList.contains('hidden')) {
                     mainContentWrapper.classList.add('sidebar-open');
                } else {
                     mainContentWrapper.classList.remove('sidebar-open');
                }
            }
        };

        // Chama ao montar
        adjustMainContentMargin();
        // Adiciona listener de redimensionamento
        window.addEventListener('resize', adjustMainContentMargin);
        // Limpa o listener
        return () => window.removeEventListener('resize', adjustMainContentMargin);
    }, []); // Executa apenas uma vez ao montar

    return (
        <div id="app" className="bg-gray-900 text-gray-100 min-h-screen">
            <ThreeJSBackground />

            <Sidebar
                onCategorySelect={handleCategorySelect}
                onHomeClick={() => handleCategorySelect('Home')}
                activeCategory={selectedProjectId ? null : selectedCategory} // Destaca a categoria a menos que um projeto esteja aberto
            />

            <div id="main-content-wrapper" ref={mainContentWrapperRef}>
                <button
                    id="toggleSidebar"
                    className="absolute top-4 left-4 p-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 z-20"
                    onClick={toggleSidebar}
                >
                    <svg className="w-6 h-6 sidebar-toggle-button" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                </button>

                <MainContent
                    selectedCategory={selectedCategory}
                    selectedProjectId={selectedProjectId}
                    onProjectSelect={handleProjectSelect}
                    onBackToCategories={handleBackToCategories}
                />
            </div>
        </div>
    );
};

export default App;
