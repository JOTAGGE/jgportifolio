// src/styles/globalStyles.js

// === Estilos Globais (equivalente ao bloco <style> no HTML) ===
const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
body {
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease-in-out;
    margin: 0;
    padding: 0;
}
#threejs-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
.sidebar-toggle-button {
    transition: transform 0.3s ease-in-out;
}
.sidebar-toggle-button.rotated {
    transform: rotate(180deg);
}
#sidebar {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
}
#main-content-wrapper {
    margin-left: 0;
    transition: margin-left 0.3s ease-in-out;
}
#main-content-wrapper.sidebar-open {
    margin-left: 256px;
}
@media (max-width: 767px) {
    #sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
    }
    #sidebar.active {
        transform: translateX(0);
    }
    #main-content-wrapper.sidebar-open {
        margin-left: 0;
    }
}
`;

// Injete os estilos globais no cabeçalho do documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

// Exporta um valor vazio porque este arquivo é apenas para efeitos colaterais (injetar CSS)
export default {};
