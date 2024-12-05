document.getElementById('letterSelect').addEventListener('change', function() {
    const selectedLetter = this.value;

    fetch(`data/${selectedLetter}.json`)
        .then(response => response.json())
        .then(data => {
            // Aggiorna il contenuto della pagina con i dati caricati
            document.getElementById('letterName').textContent = data.name;
            document.getElementById('letterText').textContent = data.text;
            document.getElementById('letterImage').src = data.image;
            document.getElementById('audioSource').src = data.audio;
            
            const audio = document.getElementById('letterAudio');
            audio.load();
        });
});
