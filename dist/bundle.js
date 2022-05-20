/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts.js":
/*!************************!*\
  !*** ./src/scripts.js ***!
  \************************/
/***/ (() => {

eval("const divData = document.getElementById(\"data\");\r\nconst dataItemsJson = divData.dataset.items;\r\nconst dataArr = JSON.parse(dataItemsJson);\r\nconst divDataGamble = document.getElementById(\"data-gamble\");\r\nconst divDataGambleJson = divDataGamble.dataset.items;\r\nconst dataGambleArr = JSON.parse(divDataGambleJson);\r\nconst cardList = document.getElementsByClassName(\"card\");\r\nconst nameList = document.getElementsByClassName(\"card__name\");\r\nconst imgList = document.getElementsByClassName(\"card__img\");\r\nconst descriptionList = document.getElementsByClassName(\"card__description\")\r\nconst rarityList = document.getElementsByClassName(\"card__rarity\");\r\nconst amountList = document.getElementsByClassName(\"card__amount\");\r\nconst priceList = document.getElementsByClassName(\"card__price\");\r\nconst mainSection = document.getElementById(\"main-section\");\r\nconst cartImg = document.getElementById(\"cart__logo\");\r\nconst cartItems = [];\r\nconst totalItemsElement = document.getElementById(\"total-items\");\r\nconst totalPriceElement = document.getElementById(\"total-price\");\r\nconst containerMain = document.getElementById(\"container-main\");\r\nconst modalElement = document.getElementById(\"modal\");\r\nconst gambleElement = document.getElementById(\"gamble\")\r\n\r\nrenderCards();\r\nformateGambleValues();\r\n\r\nmainSection.addEventListener(`input`, (e) => {\r\n    const targetElementInput = e.target;\r\n    const card = targetElementInput.closest(\"[id]\");\r\n    const elementId = card.getAttribute(\"id\");\r\n    const button = card.querySelector(\".card__button\");\r\n    const currentElementData = dataArr.find((item) => item.id === elementId);\r\n    if ((currentElementData.amount < targetElementInput.value) || (targetElementInput.value < 0) || (currentElementData.amount === 0)) {\r\n        button.setAttribute(\"disabled\", \"disabled\");\r\n    } else {\r\n        button.removeAttribute(\"disabled\");\r\n    };\r\n});\r\n\r\nmainSection.addEventListener(`click`, (e) => {\r\n    const targetElementButton = e.target;\r\n    if (targetElementButton.closest(`.card__button`)) {\r\n        sentToCart(targetElementButton);\r\n        const totalCartData = sumAllCartItems();\r\n        updateCartData(totalCartData.items, totalCartData.price);\r\n    };\r\n});\r\n\r\nfunction renderCards() {\r\n\r\n    for (let i = 0; i < dataArr.length; i++) {\r\n        createCard();\r\n        addCardData();\r\n\r\n        function createCard() {\r\n            containerMain.insertAdjacentHTML(`beforeend`,\r\n                `<div class=\"card\">\r\n                <div class=\"card__wrapper\">\r\n                    <div class=\"card__content\">\r\n                        <h1 class=\"card__name\"></h1>\r\n                        <div class=\"card__img\"><img width=\"120\" heigth=\"120\" src=\"\" alt=\"\"></div>\r\n                        <p class=\"card__description text\"></p>\r\n                    </div>\r\n                    <div class=\"card__footer\">\r\n                        <p class=\"card__rarity text\"></p>\r\n                        <p class=\"card__amount text\"></p>\r\n                        <p class=\"card__price\"></p>\r\n                        <div class=\"button-input__wrapper\">\r\n                            <button class=\"card__button\">Add to cart</button>\r\n                            <input class=\"card__input\" type=\"number\" min=\"0\" value=\"0\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n        </div>`);\r\n        };\r\n\r\n        function addCardData() {\r\n            cardList[i].setAttribute(\"id\", dataArr[i].id);\r\n            nameList[i].innerHTML = dataArr[i].name;\r\n            imgList[i].firstElementChild.setAttribute(\"src\", dataArr[i].img);\r\n            descriptionList[i].innerHTML = `${dataArr[i].description}`;\r\n            amountList[i].innerHTML = `Amount: ${dataArr[i].amount}`;\r\n            priceList[i].innerHTML = `Price: ${dataArr[i].price}`;\r\n            const classNameByRarity = {\r\n                \"Arcana\": \"card_arcana\",\r\n                \"Immortal\": \"card_immortal\",\r\n                \"Rare\": \"card_rare\",\r\n                \"Mythical\": \"card_mythical\"\r\n            };\r\n            const cardRarity = dataArr[i].rarity;\r\n            rarityList[i].innerHTML = `Rarity: <span class=${classNameByRarity[cardRarity]}>${cardRarity}</span>`\r\n        };\r\n    };\r\n};\r\n\r\nfunction sentToCart(el) {\r\n    const card = el.closest(\"[id]\");\r\n    const inputValue = +card.querySelector(\".card__input\").value;\r\n    const amount = card.querySelector(\".card__amount\");\r\n    const elementId = card.getAttribute(\"id\");\r\n    const currentElementData = dataArr.find((item) => item.id === elementId);\r\n\r\n    if (currentElementData.amount >= inputValue) {\r\n        const includes = cartItems.find((item) => item.id === elementId);\r\n        const addToCart = {\r\n            \"id\": elementId,\r\n            \"amount\": inputValue\r\n        };\r\n\r\n        if (currentElementData.amount > 0) {\r\n\r\n            if (includes) {\r\n                includes.amount += +inputValue;\r\n\r\n            } else {\r\n                cartItems.push(addToCart);\r\n            };\r\n\r\n            currentElementData.amount -= inputValue;\r\n            amount.innerHTML = `Amount: ${currentElementData.amount}`;\r\n        };\r\n    };\r\n};\r\n\r\nfunction sumAllCartItems() {\r\n    let total = {\r\n        items: 0,\r\n        price: 0\r\n    };\r\n\r\n    for (let i = 0; i < cartItems.length; i++) {\r\n        let obj = dataArr.find((item) => item.id === cartItems[i].id);\r\n        total.items += cartItems[i].amount;\r\n        total.price += +(cartItems[i].amount * obj.price.split(\"$\").join(\"\"));\r\n    };\r\n\r\n    return total;\r\n}\r\n\r\nfunction updateCartData(items, price) {\r\n    totalItemsElement.innerHTML = `${items}`;\r\n    totalPriceElement.innerHTML = `${price.toFixed(2)}$`;\r\n};\r\n\r\nfunction formateGambleValues() {\r\n    for (let i = 0; i < dataGambleArr.length; i++) {\r\n        for (key in dataGambleArr[i]) {\r\n            if (key === \"rate\")\r\n                dataGambleArr[i][key] = +dataGambleArr[i][key].split(\",\").join(\".\");\r\n        };\r\n    };\r\n};\r\n\r\nconst data = [\r\n    {\r\n        rarity: 'imm',\r\n        rate: '0',\r\n    },\r\n    {\r\n        rarity: 'arc',\r\n        rate: '0,5',\r\n    },\r\n    {\r\n        rarity: 'myt',\r\n        rate: '1,12',\r\n    },\r\n    {\r\n        rarity: 'rar',\r\n        rate: '11,01',\r\n    },\r\n    {\r\n        rarity: 'unc',\r\n        rate: '18',\r\n    },\r\n    {\r\n        rarity: 'com',\r\n        rate: '29,2',\r\n    },\r\n];\r\n\r\nconst validateData = (data) =>\r\n    data.map((item) => ({\r\n        ...item, rate: parseFloat(item.rate.replace(',', '.')),\r\n    }))\r\n        .sort((a, b) => b.rate - a.rate);\r\n\r\nconst generateRandomInteger = (min, max) => (min + Math.random() * (max + 1 - min));\r\n\r\nfunction play(data) {\r\n    const validData = validateData(data);\r\n    const winNum = generateRandomInteger(0, 99).toFixed(2);\r\n    let prevScore = 0;\r\n\r\n    for (let index = 0; index < validData.length; index++) {\r\n        const item = validData[index];\r\n        const currentScore = item.rate + prevScore;\r\n        const isWinner = winNum <= currentScore;\r\n        const rarity = item.rarity;\r\n        const correctRarity = {\r\n            \"com\": \"Common\",\r\n            \"unc\": \"Uncommon\",\r\n            \"rar\": \"Rare\",\r\n            \"arc\": \"Arcana\",\r\n            \"myt\": \"Mythical\",\r\n            \"imm\": \"Immortal\"\r\n        }\r\n\r\n        if (isWinner) {\r\n            return `Congratulations! You win ${correctRarity[rarity]} item!`;\r\n        } else {\r\n            prevScore += item.rate;\r\n        }\r\n    }\r\n\r\n    return 'Better luck next time!';\r\n};\r\n\r\nfunction createModal() {\r\n    modalElement.insertAdjacentHTML(`afterbegin`,\r\n        `<div id=\"modal-wrapper\">\r\n        <div class=\"modal-block\">\r\n            <div class=\"modal-header\" title=\"Exit\">\r\n                <p id=\"modal__close-button\">&#10006\r\n                </p>\r\n            </div>\r\n            <div id=\"modal-body\">\r\n            </div>\r\n        </div>\r\n    </div>`)\r\n    gamble();\r\n}\r\n\r\nfunction gamble() {\r\n    loadGamble();\r\n    setTimeout(showGambleInfo, 5000);\r\n}\r\n\r\nfunction loadGamble() {\r\n    const modalBody = document.getElementById(\"modal-body\");\r\n\r\n    modalBody.innerHTML = `\r\n    <div id=\"gamble-gif\">\r\n        <img src=\"https://i.gifer.com/8iwS.gif\"></img>\r\n        </div><br>\r\n        <p id=\"gamble-text\">Please wait , Gaben is twisting the roulette\r\n    </p>`;\r\n};\r\n\r\nfunction showGambleInfo() {\r\n    const modalBody = document.getElementById(\"modal-body\");\r\n\r\n    modalBody.innerHTML = `\r\n    <div id=\"gamble-result\">\r\n        <p>${play(data)}</p>\r\n        <button id=\"play-again-btn\">PLAY AGAIN\r\n        </button>\r\n    </div>`\r\n};\r\n\r\nmodalElement.addEventListener(`click`, function (e) {\r\n    const playAgainButton = e.target;\r\n\r\n    if (playAgainButton.closest(\"#play-again-btn\")) {\r\n        gamble();\r\n    }\r\n})\r\n\r\nmodalElement.addEventListener(`click`, function (e) {\r\n    const closeButton = e.target;\r\n\r\n    if (closeButton.closest(\"#modal__close-button\")) {\r\n        const modalWrapper = document.getElementById(\"modal-wrapper\");\r\n        modalWrapper.remove();\r\n    }\r\n})\r\n\r\ngambleElement.onclick = createModal;\r\n\r\n\n\n//# sourceURL=webpack://dota2shop-pet/./src/scripts.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts.js"]();
/******/ 	
/******/ })()
;