// МОДУЛЬ 1: СОЗДАНИЕ КАРТОЧЕК ТОВАРОВ
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


// МОДУЛЬ 2: ФОРМА АВТОРИЗАЦИИ
function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    //запретили скролл
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}


//открытие формы авторизации
const btn = document.querySelector('#login-enter'),
      modal = document.querySelector('.login-div'),
      main = document.querySelector('main');
    
   

// добавили класс скрытия, чтобы не показывать окно при загрузке стартовой страницы
modal.classList.add('hide');

//обрабтчки открытия модального окна
btn.addEventListener('click', ()=> {
    openModal();
});

//закрытие формы авторизации по клику на остальное поле
main.addEventListener('click', e => {
    if(!modal.contains(e.target)) {
        closeModal();
    }
});


  //обработчик закрытия окна при клике на ESC
  document.addEventListener('keydown',(e) => {
    if(e.code === 'Escape' && modal.classList.contains('show')) 
        {
            closeModal();
        }
});



//МОДУЛЬ 3: ОТПРАВКА POST ЗАПРОСОВ ФОРМЫ АВТОРИЗАЦИИ
//функция отправки запроса авторизации
async function loginSubmit(email, password) {
    try {
        const response = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify({
                email, password
            }),
        });

        const data = await response.json();
        //успешный вход
        if(response.ok) {
            alert('Вход успешно выполнен');
            closeModal();
            //редирект на на главную страницу
            window.location.href = "http://localhost:3001/#";
        }
        else {
            console.log('Ошибка входа');
            alert('Неверный логин или пароль');
        }
    } 
    catch(error) {
        console.log('Ошибка соединения', error);
        alert('Ошибка соединения с сервером');
    }
}


const formLogin = document.querySelector('.form-login');
//обработчик события отправки формы
formLogin.addEventListener('submit', (e)=> {
    e.preventDefault();
    const login = document.querySelector('#email-user').value,
          password = document.querySelector('#pass-user').value;
    
    loginSubmit(login, password);
})