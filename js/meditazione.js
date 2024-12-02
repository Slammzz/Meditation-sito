var currentIndex = 0; // Indice corrente iniziale
var buttonContainer = document.querySelector('.button-container');
var buttons = document.querySelectorAll('.button'); // Prendi tutti i pulsanti
var buttonWidth = buttons[0].offsetWidth + 20; // Larghezza di un pulsante, incluso il margine
var totalButtons = buttons.length / 2; // Diviso per 2 perché le immagini sono duplicate
var scrollInterval = 5 * 1000; // 6 secondi in millisecondi
var autoScrollStep = 1; // Incremento il numero di immagini che scorrono alla volta
var autoScrollInterval; // Variabile per l'intervallo di autoscroll

function updateCarouselPosition(smooth = true) {
    var newPosition = -(currentIndex % totalButtons) * buttonWidth;
    buttonContainer.style.transition = smooth ? 'transform 1s ease-out' : 'none'; // Rendi la transizione più lenta
    buttonContainer.style.transform = 'translateX(' + newPosition + 'px)';
}

function autoScroll() {
    // Aggiungi un controllo per verificare se la finestra è stata ridimensionata durante lo scorrimento automatico
    if (window.innerWidth <= 1200) {
        clearInterval(autoScrollInterval); // Interrompi lo scorrimento automatico se la finestra è stata ridimensionata
        return;
    }

    currentIndex += autoScrollStep; // Incrementa di un numero maggiore di immagini
    if (currentIndex >= totalButtons) {
        // Se supera il totale, aggiusta per una transizione senza interruzioni
        currentIndex %= totalButtons; // Assicura che l'indice non superi il numero totale di immagini
    }
    updateCarouselPosition();
}

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
    currentIndex += autoScrollStep;
    if (currentIndex >= totalButtons) {
        currentIndex %= totalButtons;
    }
    updateCarouselPosition();
    resetAutoScroll(); // Resetta l'auto-scroll ogni volta che l'utente interagisce
}

function prevButton() {
    currentIndex -= autoScrollStep;
    if (currentIndex < 0) {
        currentIndex += totalButtons; // Gestisce il movimento all'indietro oltre l'inizio
    }
    updateCarouselPosition();
    resetAutoScroll(); // Resetta l'auto-scroll ogni volta che l'utente interagisce
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
        'alef': 'pages/Alef/alef.html',
        'bet': 'pages/Bet/bet.html',
        'gimel': 'pages/Gimel/gimel.html',
        'dalet': 'pages/Dalet/dalet.html',
        'he': 'pages/He/he.html',
        'vav': 'pages/Vav/vav.html',
        'zain': 'pages/Zain/zain.html',
        'chet': 'pages/Chet/chet.html',
        'tet': 'pages/Tet/tet.html',
        'yod': 'pages/Yod/yod.html',
        'kaf': 'pages/Kaf/kaf.html',
        'lamed': 'pages/Lamed/lamed.html',
        'mem': 'pages/Mem/mem.html',
        'nun': 'pages/Nun/nun.html',
        'samech': 'pages/Samech/samech.html',
        'ayin': 'pages/Ayin/ayin.html',
        'pei': 'pages/Pei/pei.html',
        'tzadi': 'pages/Tzadi/tzadi.html',
        'qof': 'pages/Qof/qof.html',
        'resh': 'pages/Resh/resh.html',
        'shin': 'pages/Shin/shin.html',
        'tav': 'pages/Tav/tav.html'
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
            'pei': 'Pei',
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
