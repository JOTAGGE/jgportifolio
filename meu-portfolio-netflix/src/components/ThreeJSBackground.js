// src/components/ThreeJSBackground.js

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'; // Importa a biblioteca THREE
// THREE é global porque está sendo carregado via CDN no public/index.html

const ThreeJSBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const geometry = new THREE.IcosahedronGeometry(1.5, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x0077ff,
            emissive: 0x0033aa,
            roughness: 0.2,
            metalness: 0.8
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
        pointLight.position.set(-3, 3, -3);
        scene.add(pointLight);

        camera.position.z = 5;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        };

        document.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            sphere.rotation.y += 0.005 + (targetX - sphere.rotation.y) * 0.05;
            sphere.rotation.x += 0.005 + (targetY - sphere.rotation.x) * 0.05;

            renderer.render(scene, camera);
        };

        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        animate();

        return () => {
            // Limpeza ao desmontar o componente
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []); // Array de dependências vazio significa que este efeito roda uma vez ao montar

    return <canvas id="threejs-background" ref={canvasRef}></canvas>;
};

export default ThreeJSBackground;
