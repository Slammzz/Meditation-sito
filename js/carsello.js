const letters = [
    { name: "ALEF", img: "../MeditationUpdate/assets/lettere//1-Alef.jpg", link: "../MeditationUpdate/pages/Alef/alef.html" },
    { name: "BETH", img: "../MeditationUpdate/assets/lettere//2-Bet.jpg", link: "../MeditationUpdate/pages/Beth/beth.html" },
    { name: "GHIMEL", img: "../MeditationUpdate/assets/lettere/3-Ghimel.jpg", link: "../MeditationUpdate/pages/Gimel/gimel.html" },
    { name: "DALET", img: "../MeditationUpdate/assets/lettere/4-Dalet.jpg", link: "../MeditationUpdate/pages/Dalet/dalet.html" },
    { name: "HE", img: "../MeditationUpdate/assets/lettere/5-He.jpg", link: "../MeditationUpdate/pages/Hei/hei.html" },
    { name: "VAV", img: "../MeditationUpdate/assets/lettere/6-Vav.jpg", link: "../MeditationUpdate/pages/Vav/vav.html" },
    { name: "ZAIN", img: "../MeditationUpdate/assets/lettere/7-Zain.jpg", link: "../MeditationUpdate/pages/Zain/zain.html" },
    { name: "CHET", img: "../MeditationUpdate/assets/lettere/8-Chet.jpg", link: "../MeditationUpdate/pages/Chet/chet.html" },
    { name: "TET", img: "../MeditationUpdate/assets/lettere/9-Tet.jpg", link: "../MeditationUpdate/pages/Tet/thet.html" },
    { name: "YOD", img: "../MeditationUpdate/assets/lettere/10-Yod.jpg", link: "../MeditationUpdate/pages/Yod/yod.html" },
    { name: "KAF", img: "../MeditationUpdate/assets/lettere/11-Kaf.jpg", link: "../MeditationUpdate/pages/Kaf/kaf.html" },
    { name: "LAMED", img: "../MeditationUpdate/assets/lettere/12-Lamed.jpg", link: "../MeditationUpdate/pages/Lamed/lamed.html" },
    { name: "MEM", img: "../MeditationUpdate/assets/lettere/13-Mem.jpg", link: "../MeditationUpdate/pages/Mem/mem.html" },
    { name: "NUN", img: "../MeditationUpdate/assets/lettere/14-Nun.jpg", link: "../MeditationUpdate/pages/Nun/nun.html" },
    { name: "SAMECH", img: "../MeditationUpdate/assets/lettere/15-Samech.jpg", link: "../MeditationUpdate/pages/Samech/samech.html" },
    { name: "AYN", img: "../MeditationUpdate/assets/lettere/16-Ayn.jpg", link: "../MeditationUpdate/pages/Ain/ain.html" },
    { name: "PE", img: "../MeditationUpdate/assets/lettere/17-Pe.jpg", link: "../MeditationUpdate/pages/Pe/pe.html" },
    { name: "ZADI", img: "../MeditationUpdate/assets/lettere/18-Zadi.jpg", link: "../MeditationUpdate/pages/Zadi/zadi.html" },
    { name: "QUF", img: "../MeditationUpdate/assets/lettere/19-Quf.jpg", link: "../MeditationUpdate/pages/Quf/quf.html" },
    { name: "RESH", img: "../MeditationUpdate/assets/lettere/20-Resh.jpg", link: "../MeditationUpdate/pages/Resh/resh.html" },
    { name: "SHIN", img: "../MeditationUpdate/assets/lettere/21-Shin.jpg", link: "../MeditationUpdate/pages/Shin/shin.html" },
    { name: "TAV", img: "../MeditationUpdate/assets/lettere/22-Tav.jpg", link: "../MeditationUpdate/pages/Tav/tav.html" }
];

//genera il carosello
const container = document.querySelector('.button-container');

console.log('Numero di lettere:', letters.length);


letters.forEach(letter => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="lettera">
        <div class="button">
            <a href="${letter.link}" target="_blank">
                <img src="${letter.img}" alt="${letter.name}">
            </a>
        </div>
        <p class="pBut">${letter.name}</p>
    </div>
    `;
    container.appendChild(div);
});

// Calcola la larghezza una volta terminata la generazione
var buttonWidth = document.querySelector('.lettera').getBoundingClientRect().width;