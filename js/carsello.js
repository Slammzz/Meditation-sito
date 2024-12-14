const letters = [
    { name: "ALEF", img: "../MeditationUpdate/assets/lettere//1-Alef.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Alef" },
    { name: "BETH", img: "../MeditationUpdate/assets/lettere//2-Bet.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Beth" },
    { name: "GHIMEL", img: "../MeditationUpdate/assets/lettere/3-Ghimel.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Ghimel" },
    { name: "DALET", img: "../MeditationUpdate/assets/lettere/4-Dalet.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Dalet" },
    { name: "HE", img: "../MeditationUpdate/assets/lettere/5-He.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=He" },
    { name: "VAV", img: "../MeditationUpdate/assets/lettere/6-Vav.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Vav" },
    { name: "ZAIN", img: "../MeditationUpdate/assets/lettere/7-Zain.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Zain" },
    { name: "CHET", img: "../MeditationUpdate/assets/lettere/8-Chet.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Chet" },
    { name: "TET", img: "../MeditationUpdate/assets/lettere/9-Tet.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Tet" },
    { name: "YOD", img: "../MeditationUpdate/assets/lettere/10-Yod.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Yod" },
    { name: "KAF", img: "../MeditationUpdate/assets/lettere/11-Kaf.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Kaf" },
    { name: "LAMED", img: "../MeditationUpdate/assets/lettere/12-Lamed.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Lamed" },
    { name: "MEM", img: "../MeditationUpdate/assets/lettere/13-Mem.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Mem" },
    { name: "NUN", img: "../MeditationUpdate/assets/lettere/14-Nun.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Nun" },
    { name: "SAMECH", img: "../MeditationUpdate/assets/lettere/15-Samech.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Samech" },
    { name: "AYN", img: "../MeditationUpdate/assets/lettere/16-Ayn.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Ayn" },
    { name: "PEH", img: "../MeditationUpdate/assets/lettere/17-Pe.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Peh" },
    { name: "ZADI", img: "../MeditationUpdate/assets/lettere/18-Zadi.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Zadi" },
    { name: "QUF", img: "../MeditationUpdate/assets/lettere/19-Quf.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Quf" },
    { name: "RESH", img: "../MeditationUpdate/assets/lettere/20-Resh.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Resh" },
    { name: "SHIN", img: "../MeditationUpdate/assets/lettere/21-Shin.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Shin" },
    { name: "TAV", img: "../MeditationUpdate/assets/lettere/22-Tav.jpg", link: "../MeditationUpdate/pages/contenuti.html?lettera=Tav" }
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