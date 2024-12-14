function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);  // Restituisce il valore del parametro o null se non esiste
}

var selectedLetter;
var lettera = getQueryParam('lettera');

if(lettera){
    selectedLetter = lettera;        

        console.log("Lettera selezionata:", selectedLetter);

        // Carica i dati dal file JSON
        fetch('/MeditationUpdate/pages/contenuti.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            var letterData = data[selectedLetter];
            if (letterData) {
                console.log("Dati della lettera:", letterData);

                // Aggiorna il contenuto della lettera
                document.getElementById('letterName').textContent = letterData.name;
                document.getElementById('letterText').textContent = letterData.text;
                document.getElementById('letterMed').textContent = letterData.meditazione;
                document.getElementById('letterImage').src = letterData.image;
                document.getElementById('letterImage').style.display = "block";
                document.getElementById('audioSource').src = letterData.audio;
                document.getElementById('letterAudio').style.display = "block";

                // Ricarica l'audio
                const audio = document.getElementById('letterAudio');
                audio.load();
            } else {
                console.error("Lettera non trovata nel file JSON.");
            }
        })
        .catch(error => console.error("Errore nel caricamento del file JSON:", error));
        lettera = null;
}

document.querySelectorAll('#Menu-Container a').forEach(item => {
    item.addEventListener('click', function crea(event) {
        event.preventDefault(); // Impedisce il comportamento predefinito del link

        selectedLetter = item.getAttribute('data-letter');        

        console.log("Lettera selezionata:", selectedLetter);

        // Carica i dati dal file JSON
        fetch('/MeditationUpdate/pages/contenuti.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            var letterData = data[selectedLetter];
            if (letterData) {
                console.log("Dati della lettera:", letterData);

                // Aggiorna il contenuto della lettera
                document.getElementById('letterName').textContent = letterData.name;
                document.getElementById('letterText').textContent = letterData.text;
                document.getElementById('letterMed').textContent = letterData.meditazione;
                document.getElementById('letterImage').src = letterData.image;
                document.getElementById('letterImage').style.display = "block";
                document.getElementById('audioSource').src = letterData.audio;
                document.getElementById('letterAudio').style.display = "block";

                // Ricarica l'audio
                const audio = document.getElementById('letterAudio');
                audio.load();
            } else {
                console.error("Lettera non trovata nel file JSON.");
            }
        })
        .catch(error => console.error("Errore nel caricamento del file JSON:", error));
    });
});

/*
<footer>
        <audio-player title="Alef" src="Alef.mp3" bar-width="5" bar-gap="2"></audio-player>

        <script src="../../../js/audio-player.js"></script>
    </footer>
*/