const cardList = document.getElementsByClassName("card");
const nameList = document.getElementsByClassName("card__name");
const imgList = document.getElementsByClassName("card__img");
const descriptionList = document.getElementsByClassName("card__description")
const rarityList = document.getElementsByClassName("card__rarity");
const amountList = document.getElementsByClassName("card__amount");
const priceList = document.getElementsByClassName("card__price");
const cardDataURL = "https://6291e2709d159855f081b5ea.mockapi.io/dota2";
const containerMain = document.getElementById("container-main");
export let dataArr;

export function getData(method, url, body = null) {
    return fetch(url).then(response => {
        return response.json()
    })
}

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

function getCardData() {
    const loader = document.querySelector(".loader");
    loader.style.visibility = "visible"
    
    getData('GET', cardDataURL)
        .then(items => {
            renderCards(items)
            loader.style.visibility = "hidden"
            return items
        })
        .then(items => {
            dataArr = items;
        })
        .catch(() => containerMain.innerHTML = `Гейб еще не завёз шмотки`)
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
