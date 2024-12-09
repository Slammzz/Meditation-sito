document.getElementById('letterSelect').addEventListener('change', function() {
    fetch('/MeditationUpdate/pages/contenuti.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Errore HTTP! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Dati caricati dal JSON:", data);

        var selectedLetter = document.getElementById('letterSelect').value;
        console.log("Lettera selezionata:", selectedLetter);

        var letterData = data[selectedLetter];
        if (letterData) {
            console.log("Dati della lettera:", letterData);

            document.getElementById('letterName').textContent = letterData.name;
            document.getElementById('letterText').textContent = letterData.text;
            document.getElementById('letterMed').textContent = letterData.meditazione;
            document.getElementById('letterImage').src = letterData.image;
            document.getElementById('letterImage').style.display = "block";
            document.getElementById('audioSource').src = letterData.audio;
            document.getElementById('letterAudio').style.display = "block";

            const audio = document.getElementById('letterAudio');
            audio.load();
        } else {
            console.error("Lettera non trovata nel file JSON.");
        }
    })
    .catch(error => console.error("Errore nel caricamento del file JSON:", error));

});
