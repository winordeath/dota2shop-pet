import { getData } from "./render-cards";

const gambleDataURL = "https://6291e2709d159855f081b5ea.mockapi.io/dota2gamble"
const modalElement = document.getElementById("modal");
const gambleElement = document.getElementById("gamble");

modalElement.addEventListener(`click`, function (e) {
    const playAgainButton = e.target;

    if (playAgainButton.closest("#play-again-btn")) {
        showInsideModal()
    }
})

modalElement.addEventListener(`click`, function (e) {
    const closeButton = e.target;

    if (closeButton.closest("#modal__close-button")) {
        const modalWrapper = document.getElementById("modal-wrapper");
        modalWrapper.remove();
    }
})

gambleElement.onclick = createModal;

function showInsideModal() {
    loadGamble()
    getData('GET', gambleDataURL)
        .then(function (gambleData) {
            showGambleInfo(gambleData)
        })
        .catch(function () {
            const modalBody = document.getElementById("modal-body");
            modalBody.innerHTML = `
    <div id="gamble-result">
        <p>Gabe eshe ne zavez shmotki</p>
        <button id="play-again-btn">PLAY AGAIN
        </button>
    </div>`
        })
}

function createModal() {
    modalElement.insertAdjacentHTML(`afterbegin`,
        `<div id="modal-wrapper">
        <div class="modal-block">
            <div class="modal-header" title="Exit">
                <p id="modal__close-button">&#10006
                </p>
            </div>
            <div id="modal-body">
            </div>
        </div>
    </div>`)
    showInsideModal()
}

const validateData = (data) =>
    data.map((item) => ({
        ...item,
        rate: parseFloat(item.rate.replace(',', '.')),

    }))
        .sort((a, b) => b.rate - a.rate);

const generateRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

function twistRoulette(data) {
    const validData = validateData(data);
    const winNum = generateRandomInteger(0, 99).toFixed(2);
    let prevScore = 0;

    for (let index = 0; index < validData.length; index++) {
        const item = validData[index];
        const currentScore = item.rate + prevScore;
        const isWinner = winNum <= currentScore;
        const rarity = item.rarity;
        const fullItemNames = {
            "com": "Common",
            "unc": "Uncommon",
            "rar": "Rare",
            "arc": "Arcana",
            "myt": "Mythical",
            "imm": "Immortal"
        }

        if (isWinner) {
            return `Congratulations! You win ${fullItemNames[rarity]} item!`;
        } else {
            prevScore += item.rate;
        }
    }

    return 'Better luck next time!';
};

function loadGamble() {
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
    <div id="gamble-gif">
        <img src="https://i.gifer.com/8iwS.gif"></img>
        </div><br>
        <p id="gamble-text">Please wait , Gaben is twisting the roulette
    </p>`;
};

function showGambleInfo(data) {
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
    <div id="gamble-result">
        <p>${twistRoulette(data)}</p>
        <button id="play-again-btn">PLAY AGAIN
        </button>
    </div>`
};