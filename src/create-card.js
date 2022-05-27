function createCard() {
    const containerMain = document.getElementById("container-main");
    
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

export default createCard;