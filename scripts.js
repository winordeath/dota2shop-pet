const divData = document.getElementById("data");
const dataItemsJson = divData.dataset.items;
const dataArr = JSON.parse(dataItemsJson);
const cardList = document.getElementsByClassName("card");
const nameList = document.getElementsByClassName("card__name");
const imgList = document.getElementsByClassName("card__img");
const descriptionList = document.getElementsByClassName("card__description")
const rarityList = document.getElementsByClassName("rarity");
const amountList = document.getElementsByClassName("card__amount");
const priceList = document.getElementsByClassName("card__price");
const mainSection = document.getElementById("main-section");
const cartImg = document.getElementById("cart__logo");
const cartItems = [];
const totalItemsElement = document.getElementById("total-items");
const totalPriceElement = document.getElementById("total-price");
const containerMain = document.getElementById("container-main");

renderCards();

mainSection.addEventListener(`input`, (e) => {
    const targetElementInput = e.target;
    const card = targetElementInput.closest("[id]");
    const elementId = card.getAttribute("id");
    const button = card.querySelector(".card__button");
    const currentElementData = dataArr.find((item) => item.id === elementId);
    updateButtonStatus(targetElementInput,button)
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
                        <p class="card__rarity text">Rarity: <span class="rarity"></span></p>
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
            const map = {
                "Arcana": "Arcana",
                "Immortal": "Immortal",
                "Rare": "Rare",
                "Mythical": "Mythical"
            }[dataArr[i].rarity];
            cardList[i].setAttribute("id", dataArr[i].id);
            nameList[i].innerHTML = dataArr[i].name;
            imgList[i].firstElementChild.setAttribute("src", dataArr[i].img);
            rarityList[i].innerHTML = map;
            rarityList[i].classList.add(map);
            descriptionList[i].innerHTML = `${dataArr[i].description}`;
            amountList[i].innerHTML = `Amount: ${dataArr[i].amount}`;
            priceList[i].innerHTML = `Price: ${dataArr[i].price}`;
        };
    };
};

function sentToCart(el) {
    const card = el.closest("[id]");
    const inputValue = +card.querySelector(".card__input").value;
    const amount = card.querySelector(".card__amount");
    const elementId = card.getAttribute("id");
    const button = card.querySelector(".card__button");
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
        };updateButtonStatus(targetElementInput,button)
        
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

function updateButtonStatus(targetElementInput,button) {
    if ((dataArr.amount < targetElementInput.value) || (targetElementInput.value < 0) || (dataArr.amount === 0)) {
        button.setAttribute("disabled", "disabled");
    } else {
        button.removeAttribute("disabled");
    };
}