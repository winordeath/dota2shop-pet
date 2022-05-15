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
const containerMain = document.getElementById("container-main");
const modalElement = document.getElementById("modal");
const gambleElement = document.getElementById("gamble")

renderCards();
formateGambleValues();

mainSection.addEventListener(`input`, (e) => {
    const targetElementInput = e.target;
    const card = targetElementInput.closest("[id]");
    const elementId = card.getAttribute("id");
    const button = card.querySelector(".card__button");
    const currentElementData = dataArr.find((item) => item.id === elementId);
    if ((currentElementData.amount < targetElementInput.value) || (targetElementInput.value < 0) || (currentElementData.amount === 0)) {
        button.setAttribute("disabled", "disabled");
    } else {
        button.removeAttribute("disabled");
    };
});

mainSection.addEventListener(`click`, (e) => {
    const targetElementButton = e.target;
    if (targetElementButton.closest(`.card__button`)) {
        sentToCart(targetElementButton);
        const totalCartData = sumAllCartItems();
        updateCartData(totalCartData.items, totalCartData.price);
    };
});

function renderCards() {

    for (let i = 0; i < dataArr.length; i++) {
        createCard();
        addCardData();

        function createCard() {
            containerMain.insertAdjacentHTML(`beforeend`,
                `<div class="card">
                <div class="card__wrapper">
                    <div class="card__content">
                        <h1 class="card__name"></h1>
                        <div class="card__img"><img width="120" heigth="120" src="" alt=""></div>
                        <p class="card__description text"></p>
                    </div>
                    <div class="card__footer">
                        <p class="card__rarity text"></p>
                        <p class="card__amount text"></p>
                        <p class="card__price"></p>
                        <div class="button-input__wrapper">
                            <button class="card__button">Add to cart</button>
                            <input class="card__input" type="number" min="0" value="0">
                        </div>
                    </div>
                </div>
        </div>`);
        };

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
            }
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
                includes.amount += inputValue;

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
    totalPriceElement.innerHTML = `${price}$`;
};

function formateGambleValues() {
    for (let i = 0; i < dataGambleArr.length; i++) {
        for (key in dataGambleArr[i]) {
            if (key === "rate")
                dataGambleArr[i][key] = +dataGambleArr[i][key].split(",").join(".");
        };
    };
};

const data = [
    {
        rarity: 'imm',
        rate: '0',
    },
    {
        rarity: 'arc',
        rate: '0,5',
    },
    {
        rarity: 'myt',
        rate: '1,12',
    },
    {
        rarity: 'rar',
        rate: '11,01',
    },
    {
        rarity: 'unc',
        rate: '18',
    },
    {
        rarity: 'com',
        rate: '29,2',
    },
];

const validateData = (data) =>
    data.map((item) => ({
        ...item, rate: parseFloat(item.rate.replace(',', '.')),
    }))
        .sort((a, b) => b.rate - a.rate);

const generateRandomInteger = (min, max) => (min + Math.random() * (max + 1 - min));

const play = (data) => {
    const validData = validateData(data);
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
            <div class="modal-header">
                <p id="modal__close-button">&#10006
                </p>
            </div>
        </div>
    </div>`)
    const wrapper = document.getElementById("modal-wrapper");
    const closeButton = document.getElementById("modal__button-close");
    closeButton.onclick = () => {
        wrapper.remove()
    }
}

gambleElement.onclick = createModal;

