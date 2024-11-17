function cards() {
// класс карточки товара
class MenuCard {
    constructor(img, alt, title, parentSelector) {
        this.img = img;
        this.alt = alt;
        this.title = title;
        this.parent = document.querySelector(parentSelector);
    }
    render() {
        const elenent = document.createElement('div');
        
        elenent.innerHTML = `<div class="good-card">
                <img src=${this.img} alt=${this.alt} class="goods-main">
                <div class="green-category">
                    ${this.title}
                </div>
            </div>`;
            this.parent.append(elenent);
    }
}

//класс карточки со скидками
class MenuDicsount {
    constructor(img, alt, title, price, parentSelector) {
        this.img = img;
        this.alt = alt;
        this.title = title;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
    }
    render() {
        const elenent = document.createElement('div');
        
        elenent.innerHTML = `<div class="good-card">
                <img src=${this.img} alt=${this.alt} class="goods-main">
                <div class="title-disc">
                    <p class="title-disc">${this.title}</p>
                    <p class="price-disc">${this.price} руб.</p>
                </div>
                <div class="green-category-disc">
                    Добавить в корзину
                </div>
            </div>`;
            this.parent.append(elenent);
    }
}

//получение данных для карточки товара с JSON 
const getResourses = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
       throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

//вызов функции
//строим карточки товаров, фетчим данные db.json
getResourses('db.json')
    .then(data => {
        data['menu'].forEach(({img, alt, title}) => {
            new MenuCard(img, alt, title, '.goods').render();
        });
    });

getResourses('discounts.json')
    .then(data => {
        
        data['menu'].forEach(({img, alt, title, price}) => {
            new MenuDicsount(img, alt, title, price, '.goods-discounts').render();
        });
    });

}

export default cards;