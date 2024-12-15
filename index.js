// Quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente caricato.");
});

// Aspetta che tutte le risorse della pagina siano caricate (immagini, CSS, ecc.)
window.addEventListener("load", function () {
    console.log("Pagina completamente caricata.");

    // Seleziona gli elementi del loader e del contenuto
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");

    // Debug: Verifica che gli elementi siano trovati
    console.log("Loader trovato:", loader);
    console.log("Content trovato:", content);

    // Controlla che gli elementi esistano
    if (loader && content) {
        // Mostra il contenuto dopo un breve ritardo (per completare l'animazione)
        setTimeout(() => {
            loader.style.display = "none"; // Nasconde il loader
            content.style.display = "block"; // Mostra il contenuto
            console.log("Loader nascosto. Contenuto mostrato.");
        }, 2000); // Attendi 2 secondi per completare l'animazione
    } else {
        console.error("Errore: gli elementi #loader o #content non sono stati trovati.");
    }
});
