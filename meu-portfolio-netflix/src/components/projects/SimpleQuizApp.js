// src/components/projects/SimpleQuizApp.js

import React, { useState } from 'react';

const SimpleQuizApp = () => {
    const questions = [
        {
            questionText: 'Qual é a capital do Brasil?',
            answerOptions: [
                { answerText: 'Rio de Janeiro', isCorrect: false },
                { answerText: 'Brasília', isCorrect: true },
                { answerText: 'São Paulo', isCorrect: false },
                { answerText: 'Belo Horizonte', isCorrect: false },
            ],
        },
        {
            questionText: 'Qual o maior planeta do nosso sistema solar?',
            answerOptions: [
                { answerText: 'Terra', isCorrect: false },
                { answerText: 'Marte', isCorrect: false },
                { answerText: 'Júpiter', isCorrect: true },
                { answerText: 'Vênus', isCorrect: false },
            ],
        },
        {
            questionText: 'Quem escreveu "Dom Quixote"?',
            answerOptions: [
                { answerText: 'William Shakespeare', isCorrect: false },
                { answerText: 'Miguel de Cervantes', isCorrect: true },
                { answerText: 'Machado de Assis', isCorrect: false },
                { answerText: 'Gabriel Garcia Márquez', isCorrect: false },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setShowScore(false);
        setScore(0);
    };

    return (
        <div className="flex justify-center items-center p-4 bg-gray-900 min-h-screen">
            <div className="quiz-container bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg text-white">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Quiz de Conhecimentos Gerais</h2>
                {showScore ? (
                    <div className="score-section text-center">
                        <p className="text-2xl mb-4">Você acertou {score} de {questions.length} perguntas!</p>
                        <button
                            onClick={resetQuiz}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                        >
                            Jogar Novamente
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="question-section mb-6">
                            <div className="question-count text-gray-400 text-lg mb-2">
                                Pergunta {currentQuestion + 1}/{questions.length}
                            </div>
                            <div className="question-text text-xl font-medium mb-4">
                                {questions[currentQuestion].questionText}
                            </div>
                        </div>
                        <div className="answer-section grid grid-cols-1 gap-3">
                            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                                    className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-lg transition duration-200 text-left"
                                >
                                    {answerOption.answerText}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SimpleQuizApp;
