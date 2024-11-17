function auth() {
    
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
}

export default auth;