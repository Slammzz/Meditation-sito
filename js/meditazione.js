var currentIndex = 0; // Indice corrente iniziale
var buttonContainer = document.querySelector('.button-container');
var totalButtons = 22;
var scrollInterval = 5 * 1000; // 6 secondi in millisecondi
var autoScrollStep = 1; // Incremento il numero di immagini che scorrono alla volta
var autoScrollInterval; // Variabile per l'intervallo di autoscroll

function updateCarouselPosition(smooth = true) {
    var newPosition = -(currentIndex * buttonWidth);
    buttonContainer.style.transition = smooth ? 'transform 1s ease-out' : 'none';
    buttonContainer.style.transform = `translateX(${newPosition}px)`;
}


/*function autoScroll() {
    // Aggiungi un controllo per verificare se la finestra è stata ridimensionata durante lo scorrimento automatico
    if (window.innerWidth <= 1200) {
        clearInterval(autoScrollInterval); // Interrompi lo scorrimento automatico se la finestra è stata ridimensionata
        return;
    }

    currentIndex += autoScrollStep; // Incrementa di un numero maggiore di immagini

    // Se supera il totale, resetta l'indice alla prima immagine
    if (currentIndex >= totalButtons) {
        currentIndex = 0; // Reset alla prima immagine
    }

    updateCarouselPosition();
}*/

// Imposta l'intervallo di autoscroll solo se la finestra non è stata ridimensionata
if (window.innerWidth > 1200) {
    autoScrollInterval = setInterval(autoScroll, scrollInterval);
}

// Aggiungi un ascoltatore per controllare la dimensione della finestra durante il ridimensionamento
window.addEventListener('resize', function () {
    if (window.innerWidth > 1200) {
        // Riavvia l'intervallo di autoscroll solo se la finestra è stata ridimensionata sopra la dimensione desiderata
        autoScrollInterval = setInterval(autoScroll, scrollInterval);
    } else {
        // Interrompi l'intervallo di autoscroll se la finestra è stata ridimensionata sotto la dimensione desiderata
        clearInterval(autoScrollInterval);
    }

    // Reimposta la posizione dei bottoni in linea
    resetButtonPosition();
});


function resetButtonPosition() {
    currentIndex = 0; // Reimposta l'indice corrente
    updateCarouselPosition(false); // Aggiorna la posizione dei bottoni senza effetto di transizione
}




function nextButton() {
    currentIndex++;
    if (currentIndex >= letters.length-10) {
        currentIndex -- ; // Torna all'inizio
    }
    updateCarouselPosition();
    //resetButtonPosition();
}

function prevButton() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex ++; // Torna alla fine
    }
    updateCarouselPosition();
    //resetButtonPosition();
}

function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(autoScroll, scrollInterval);
}

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Previene il comportamento di default del form
    var letter = document.getElementById('search-input').value.trim().toLowerCase(); // Prende il valore inserito e lo normalizza

    // Mappa delle lettere con i relativi URL
    var letterMap = {
        'alef': '../pages/Alef/alef.html',
        'bet': '../pages/Bet/bet.html',
        'gimel': '../pages/Gimel/gimel.html',
        'dalet': '../pages/Dalet/dalet.html',
        'he': '../pages/He/he.html',
        'vav': '../pages/Vav/vav.html',
        'zain': '../pages/Zain/zain.html',
        'chet': '../pages/Chet/chet.html',
        'tet': '../pages/Tet/tet.html',
        'yod': '../pages/Yod/yod.html',
        'kaf': '../pages/Kaf/kaf.html',
        'lamed': '../pages/Lamed/lamed.html',
        'mem': '../pages/Mem/mem.html',
        'nun': '../pages/Nun/nun.html',
        'samech': '../pages/Samech/samech.html',
        'ayin': '../pages/Ayin/ayin.html',
        'pei': '../pages/Pei/pei.html',
        'tzadi': '../pages/Tzadi/tzadi.html',
        'qof': '../pages/Qof/qof.html',
        'resh': '../pages/Resh/resh.html',
        'shin': '../pages/Shin/shin.html',
        'tav': '../pages/Tav/tav.html'
    };

    // Controlla se l'input corrisponde a una delle lettere mappate
    if (letterMap[letter]) {
        window.open(letterMap[letter], '_blank'); // Apri la pagina corrispondente in una nuova scheda
    } else {
        alert('Lettera non trovata. Assicurati di inserire il nome corretto della lettera.');
    }
});

document.getElementById('search-input').addEventListener('input', function () {
    var input = this.value.trim().toLowerCase();
    var suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = ''; // Pulisce i suggerimenti precedenti
    if (input.length > 0) {
        // Mappa delle lettere come nell'esempio precedente
        var letterMap = {
            'alef': 'Alef',
            'bet': 'Bet',
            'gimel': 'Gimel',
            'dalet': 'Dalet',
            'he': 'He',
            'vav': 'Vav',
            'zayin': 'Zayin',
            'chet': 'Chet',
            'tet': 'Tet',
            'yod': 'Yod',
            'kaf': 'Kaf',
            'lamed': 'Lamed',
            'mem': 'Mem',
            'nun': 'Nun',
            'samekh': 'Samekh',
            'ayin': 'Ayin',
            'peh': 'Peh',
            'tzadi': 'Tzadi',
            'qof': 'Qof',
            'resh': 'Resh',
            'shin': 'Shin',
            'tav': 'Tav'
        };
        var matches = Object.keys(letterMap).filter(letter => letter.startsWith(input));

        matches.forEach(function (match) {
            var div = document.createElement('div');
            div.textContent = letterMap[match];
            div.addEventListener('click', function () {
                document.getElementById('search-input').value = match; // Imposta il valore dell'input
                suggestions.style.display = 'none'; // Nasconde i suggerimenti
            });
            suggestions.appendChild(div);
        });
        suggestions.style.display = matches.length > 0 ? 'block' : 'none';
    } else {
        suggestions.style.display = 'none';
    }

});


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
