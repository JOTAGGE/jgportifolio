// src/components/MainContent.js

import React from 'react';
import ProjectCard from './ProjectCard'; // Importa o ProjectCard
// Importa todos os componentes de projetos individuais
import CalculatorApp from './projects/CalculatorApp';
import TaskManagerApp from './projects/TaskManagerApp';
import SimpleQuizApp from './projects/SimpleQuizApp';
import WeatherApp from './projects/WeatherApp';
import TicTacToeGame from './projects/TicTacToeGame';
import ImageGalleryApp from './projects/ImageGalleryApp';
import MemeGeneratorApp from './projects/MemeGeneratorApp';
import URLShortenerApp from './projects/URLShortenerApp';
import CodeEditorApp from './projects/CodeEditorApp';


const MainContent = ({ selectedCategory, selectedProjectId, onProjectSelect, onBackToCategories }) => {
    // Define seus projetos aqui, vinculando-os aos seus componentes
    const projects = [
        {
            id: 'calculator',
            name: 'Calculadora',
            description: 'Uma calculadora simples para operações básicas.',
            category: 'Ferramentas Úteis',
            component: CalculatorApp,
        },
        {
            id: 'task-manager',
            name: 'Gerenciador de Tarefas',
            description: 'Um aplicativo para organizar e gerenciar suas tarefas diárias.',
            category: 'Produtividade',
            component: TaskManagerApp,
        },
        {
            id: 'simple-quiz',
            name: 'Quiz Simples',
            description: 'Teste seus conhecimentos com um quiz divertido.',
            category: 'Educação e Quizzes',
            component: SimpleQuizApp,
        },
        {
            id: 'weather-app',
            name: 'App de Clima',
            description: 'Consulte o clima de qualquer cidade do mundo. (Precisa de chave API)',
            category: 'Projetos com API',
            component: WeatherApp,
        },
        {
            id: 'tic-tac-toe',
            name: 'Jogo da Velha',
            description: 'Divirta-se com o clássico jogo da velha.',
            category: 'Jogos',
            component: TicTacToeGame,
        },
        {
            id: 'image-gallery',
            name: 'Galeria de Imagens',
            description: 'Explore uma galeria de imagens interativa.',
            category: 'Minha Mídia Pessoal',
            component: ImageGalleryApp,
        },
         {
            id: 'meme-generator',
            name: 'Gerador de Memes',
            description: 'Crie seus próprios memes com imagens aleatórias.',
            category: 'Minha Mídia Pessoal',
            component: MemeGeneratorApp,
        },
        {
            id: 'url-shortener',
            name: 'Encurtador de URL',
            description: 'Encurte URLs longas para facilitar o compartilhamento.',
            category: 'Ferramentas Úteis',
            component: URLShortenerApp,
        },
        {
            id: 'code-editor',
            name: 'Editor de Código Simples',
            description: 'Um editor básico para experimentar código JavaScript.',
            category: 'Ferramentas Úteis',
            component: CodeEditorApp,
        },
        // Adicione mais projetos conforme necessário
    ];

    const currentProject = selectedProjectId ? projects.find(p => p.id === selectedProjectId) : null;

    const filteredProjects = selectedCategory === 'Home' || !selectedCategory
        ? projects // Mostra todos os projetos na 'Home' ou no carregamento inicial
        : projects.filter(p => p.category === selectedCategory);

    // Agrupa projetos por categoria para renderizar seções
    const projectsByCategory = projects.reduce((acc, project) => {
        if (!acc[project.category]) {
            acc[project.category] = [];
        }
        acc[project.category].push(project);
        return acc;
    }, {});


    return (
        <main id="main-content" className="relative p-4 md:p-8 z-10">
            <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-80 backdrop-blur-lg p-6 md:p-10 rounded-xl shadow-2xl border border-gray-700">
                {currentProject ? (
                    // Renderiza a visualização do projeto individual
                    <div className="project-detail-view">
                        <button
                            onClick={onBackToCategories}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 mb-6 flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Voltar às Categorias
                        </button>
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 border-b-2 pb-4 border-blue-600">{currentProject.name}</h2>
                        {/* Renderiza o componente React real do projeto */}
                        <currentProject.component />
                    </div>
                ) : (
                    // Renderiza a visualização da categoria/visão geral
                    <>
                        <header className="text-center mb-10 pt-12 md:pt-0">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4 tracking-tight">JOSE GABRIEL PORTIFOLIO</h1>
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                                Bem-vindo ao meu espaço criativo! Explore projetos de design, desenvolvimento e mais.
                            </p>
                        </header>

                        {/* Renderiza as seções com base nos projetos filtrados ou em todas as categorias */}
                        {Object.entries(projectsByCategory)
                            .filter(([category]) => selectedCategory === 'Home' || !selectedCategory || category === selectedCategory)
                            .map(([category, projectsInGroup]) => (
                                <section key={category} id={category.toLowerCase().replace(/\s/g, '-')}>
                                    <h2 className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 border-b-2 pb-4 border-blue-600">{category}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                        {projectsInGroup.map(project => (
                                            <ProjectCard key={project.id} project={project} onProjectSelect={onProjectSelect} />
                                        ))}
                                    </div>
                                </section>
                            ))}

                        <footer className="text-center text-gray-500 text-sm mt-12 pt-6 border-t border-gray-700">
                            <p>&copy; 2025 Jose Gabriel Portfólio. Todos os direitos reservados.</p>
                        </footer>
                    </>
                )}
            </div>
        </main>
    );
};

export default MainContent;
