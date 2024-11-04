//получили днные с json (db.json) - тест
fetch('db.json')
    .then(data => data.json())
    .then(res => console.log(res));



// использую классы для создания карточкек категорий
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

//класс карточке со скидками

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
//строим карточки товаров, фетчим данные с JSON SERVER ( FAKE REST API )
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




//открытие формы авторизации

const btn = document.querySelector('#login-enter'),
      modal = document.querySelector('.login-div'),
      main = document.querySelector('main');
   

// добавили класс скрытия, чтобы не показывать окно при загрузке
modal.classList.add('hide');


btn.addEventListener('click', ()=> {

    modal.classList.add('show');
    modal.classList.remove('hide');
    //запретили скролл
    document.body.style.overflow = 'hidden';
});

//закрытие формы авторизации по клику на остальное поле

main.addEventListener('click', e => {
    if(e.target != modal) {

    }
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
});


  //обработчик закрытия окна при клике на ESC
  document.addEventListener('keydown',(e) => {
    if(e.code === 'Escape' && modal.classList.contains('show')) 
        {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
});