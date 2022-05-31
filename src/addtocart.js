import { dataArr } from "./render-cards";

const mainSection = document.getElementById("main-section");
const cartItems = [];
const totalItemsElement = document.getElementById("total-items");
const totalPriceElement = document.getElementById("total-price");

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