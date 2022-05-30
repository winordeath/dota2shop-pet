import createCard from "./create-card";

const cardList = document.getElementsByClassName("card");
const nameList = document.getElementsByClassName("card__name");
const imgList = document.getElementsByClassName("card__img");
const descriptionList = document.getElementsByClassName("card__description")
const rarityList = document.getElementsByClassName("card__rarity");
const amountList = document.getElementsByClassName("card__amount");
const priceList = document.getElementsByClassName("card__price");
const mainSection = document.getElementById("main-section");
const containerMain = document.getElementById("container-main");
const cartItems = [];
const totalItemsElement = document.getElementById("total-items");
const totalPriceElement = document.getElementById("total-price");
const modalElement = document.getElementById("modal");
const gambleElement = document.getElementById("gamble");
const cardDataURL = "https://6291e2709d159855f081b5ea.mockapi.io/dota2";
const gambleDataURL = "https://6291e2709d159855f081b5ea.mockapi.io/dota2gamble"
let dataArr;

function getData(method, url, body = null) {
    return fetch(url).then(response => {
        return response.json()
    })
}

function showInsideModal() {
    loadGamble()
    getData('GET', gambleDataURL)
        .then(function (gambleData) {
            showGambleInfo(gambleData)
        })
        .catch(function (reject) {
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

function showGambleInfo(data) {
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
    <div id="gamble-result">
        <p>${twistRoulette(data)}</p>
        <button id="play-again-btn">PLAY AGAIN
        </button>
    </div>`
};

function getCardData() {
    getData('GET', cardDataURL)
        .then(items => {
            renderCards(items)
            return items
        })
        .catch(() => containerMain.innerHTML = `Гейб еще не завёз шмотки`)
        .then(items => {
            dataArr = items;
        })
}

getCardData();

function renderCards(dataArr) {

    for (let i = 0; i < dataArr.length; i++) {
        createCard();
        addCardData(dataArr);

        function addCardData(dataArr) {
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

mainSection.addEventListener(`input`, (e) => {
    const targetElementInput = e.target;
    buttonDisable(targetElementInput, targetElementInput.previousElementSibling, targetElementInput)
});

mainSection.addEventListener(`click`, (e) => {
    const targetElementButton = e.target;

    if (targetElementButton.closest(`.card__button`)) {
        sentToCart(targetElementButton);
        const totalCartData = sumAllCartItems();
        updateCartData(totalCartData.items, toFixedPrice(totalCartData.price));
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
    totalPriceElement.innerHTML = `${price}$`;
};

function toFixedPrice(element) {
    if (element % 1 == 0) {
        return element
    } else {
        return +element.toFixed(2)
    }
}

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

export default containerMain