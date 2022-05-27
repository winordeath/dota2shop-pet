import createCard from "./create-card";

const divData = document.getElementById("data");
const dataItemsJson = divData.dataset.items;
const dataArr = JSON.parse(dataItemsJson);
const divDataGamble = document.getElementById("data-gamble");
const divDataGambleJson = divDataGamble.dataset.items;
const dataGambleArr = JSON.parse(divDataGambleJson);
const cardList = document.getElementsByClassName("card");
const nameList = document.getElementsByClassName("card__name");
const imgList = document.getElementsByClassName("card__img");
const descriptionList = document.getElementsByClassName("card__description")
const rarityList = document.getElementsByClassName("card__rarity");
const amountList = document.getElementsByClassName("card__amount");
const priceList = document.getElementsByClassName("card__price");
const mainSection = document.getElementById("main-section");
const cartImg = document.getElementById("cart__logo");
const cartItems = [];
const totalItemsElement = document.getElementById("total-items");
const totalPriceElement = document.getElementById("total-price");
const modalElement = document.getElementById("modal");
const gambleElement = document.getElementById("gamble");
let targetElementInput;
let gambleTimeout;

renderCards();

mainSection.addEventListener(`input`, (e) => {
    let targetElementInput = e.target;
    buttonDisable(targetElementInput, targetElementInput.previousElementSibling, targetElementInput)
});

mainSection.addEventListener(`click`, (e) => {
    const targetElementButton = e.target;

    if (targetElementButton.closest(`.card__button`)) {
        sentToCart(targetElementButton);
        const totalCartData = sumAllCartItems();
        updateCartData(totalCartData.items, totalCartData.price);
        buttonDisable(targetElementButton, targetElementButton, targetElementButton.nextElementSibling)
    };
});


function buttonDisable(currentEl, button, input) {
    const card = currentEl.closest("[id]");
    const elementId = card.getAttribute("id");
    const currentElementData = dataArr.find((item) => item.id === elementId);

    if ((currentElementData.amount < input.value) || (input.value < 0) || (currentElementData.amount === 0) || (input.value > currentElementData.amount)) {
        button.setAttribute("disabled", "disabled");
    } else {
        button.removeAttribute("disabled");
    };
}

function renderCards() {

    for (let i = 0; i < dataArr.length; i++) {
        createCard();
        addCardData();

        function addCardData() {
            cardList[i].setAttribute("id", dataArr[i].id);
            nameList[i].innerHTML = dataArr[i].name;
            imgList[i].firstElementChild.setAttribute("src", dataArr[i].img);
            descriptionList[i].innerHTML = `${dataArr[i].description}`;
            amountList[i].innerHTML = `Amount: ${dataArr[i].amount}`;
            priceList[i].innerHTML = `Price: ${dataArr[i].price}`;
            const classNameByRarity = {
                "Arcana": "card_arcana",
                "Immortal": "card_immortal",
                "Rare": "card_rare",
                "Mythical": "card_mythical"
            };
            const cardRarity = dataArr[i].rarity;
            rarityList[i].innerHTML = `Rarity: <span class=${classNameByRarity[cardRarity]}>${cardRarity}</span>`
        };
    };
};

function sentToCart(el) {
    const card = el.closest("[id]");
    const inputValue = +card.querySelector(".card__input").value;
    const amount = card.querySelector(".card__amount");
    const elementId = card.getAttribute("id");
    const currentElementData = dataArr.find((item) => item.id === elementId);

    if (currentElementData.amount >= inputValue) {
        const includes = cartItems.find((item) => item.id === elementId);
        const addToCart = {
            "id": elementId,
            "amount": inputValue
        };

        if (currentElementData.amount > 0) {

            if (includes) {
                includes.amount += +inputValue;

            } else {
                cartItems.push(addToCart);
            };

            currentElementData.amount -= inputValue;
            amount.innerHTML = `Amount: ${currentElementData.amount}`;
        };
    };
};

function sumAllCartItems() {
    let total = {
        items: 0,
        price: 0
    };

    for (let i = 0; i < cartItems.length; i++) {
        let obj = dataArr.find((item) => item.id === cartItems[i].id);
        total.items += cartItems[i].amount;
        total.price += +(cartItems[i].amount * obj.price.split("$").join(""));
    };

    return total;
}

function updateCartData(items, price) {
    totalItemsElement.innerHTML = `${items}`;
    totalPriceElement.innerHTML = `${price.toFixed(2)}$`;
};

const validateData = (data) =>
    data.map((item) => ({
        ...item, rate: parseFloat(item.rate.replace(',', '.')),
    }))
        .sort((a, b) => b.rate - a.rate);

const generateRandomInteger = (min, max) => (min + Math.random() * (max + 1 - min));

function play(dataGambleArr) {
    const validData = validateData(dataGambleArr);
    const winNum = generateRandomInteger(0, 99).toFixed(2);
    let prevScore = 0;

    for (let index = 0; index < validData.length; index++) {
        const item = validData[index];
        const currentScore = item.rate + prevScore;
        const isWinner = winNum <= currentScore;
        const rarity = item.rarity;
        const correctRarity = {
            "com": "Common",
            "unc": "Uncommon",
            "rar": "Rare",
            "arc": "Arcana",
            "myt": "Mythical",
            "imm": "Immortal"
        }

        if (isWinner) {
            return `Congratulations! You win ${correctRarity[rarity]} item!`;
        } else {
            prevScore += item.rate;
        }
    }

    return 'Better luck next time!';
};

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
    gamble();
}

function gamble() {
    loadGamble();
    gambleTimeout = setTimeout(showGambleInfo, 5000);
}

function loadGamble() {
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
    <div id="gamble-gif">
        <img src="https://i.gifer.com/8iwS.gif"></img>
        </div><br>
        <p id="gamble-text">Please wait , Gaben is twisting the roulette
    </p>`;
};

function showGambleInfo() {
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
    <div id="gamble-result">
        <p>${play(dataGambleArr)}</p>
        <button id="play-again-btn">PLAY AGAIN
        </button>
    </div>`
};

modalElement.addEventListener(`click`, function (e) {
    const playAgainButton = e.target;

    if (playAgainButton.closest("#play-again-btn")) {
        clearTimeout(gambleTimeout)
        gamble();
    }
})

modalElement.addEventListener(`click`, function (e) {
    const closeButton = e.target;

    if (closeButton.closest("#modal__close-button")) {
        const modalWrapper = document.getElementById("modal-wrapper");
        modalWrapper.remove();
        clearTimeout(gambleTimeout);
    }
})

gambleElement.onclick = createModal;