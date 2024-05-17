
// Создаем функцию для добавления товара в корзину
function addToCart(productName, price) {
    var product = {
        name: productName,
        price: price
    };

    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Функция для обновления отображения количества товаров в корзине
function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Функция для отображения содержимого корзины 
function showCartItems() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = '';

    cart.forEach(function(item, index) {
        var listItem = document.createElement('li');
        listItem.textContent = item.name + ' - $' + item.price;
        
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = function() {
            removeFromCart(index);
        };
        
        listItem.appendChild(deleteButton);
        cartItemsList.appendChild(listItem);
    });

    document.getElementById('cart-items-modal').style.display = 'block';
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCartItems();
}

// Функция для очистки содержимого корзины при загрузке страницы
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}


//изменение веса и цены + цвета
function changeValues(button) {
  var productElement = button.parentElement;
  var weight = productElement.getAttribute('data-weight');
  var price = productElement.getAttribute('data-price');
  var id = productElement.getAttribute('id'); // "Баварская" или "Маргарита"

  // Обновить вес и цену
  document.getElementById('weight-' + id).textContent = weight;
  document.getElementById('price-' + id).textContent = price;

  // Найти все кнопки в рамках одного товара
  var productButtons = productElement.parentElement.querySelectorAll('.base-tab-button button');
  productButtons.forEach(btn => {
    btn.classList.remove('selected');
    btn.classList.add('unselected');
  });

  // Установить стиль активной кнопки
  button.classList.remove('unselected');
  button.classList.add('selected');
}

// Начальная установка цветов кнопок
document.querySelectorAll('.control-buttons__row .base-tab-button button').forEach(btn => {
  if (!btn.classList.contains('selected')) {
    btn.classList.add('unselected');
  } else {
    btn.classList.remove('unselected');
  }
});

// меню в шапке
function toggleMenu() {
    var menu = document.getElementById('menu');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

// Начальная установка цветов кнопок
document.querySelectorAll('.control-buttons__row .base-tab-button button').forEach(btn => {
  if (!btn.classList.contains('selected')) {
    btn.classList.add('unselected');
  } else {
    btn.classList.remove('unselected');
  }
});

//слайдер
let slideIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  if (index >= slides.length) { slideIndex = 0; }
  if (index < 0) { slideIndex = slides.length - 1; }
  
  slides.forEach(slide => {
    slide.style.display = 'none';
  });
  
  slides[slideIndex].style.display = 'block';
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

// Показываем первый слайд при загрузке страницы
showSlide(slideIndex);


  // Модальное окно
var modal = document.getElementById("modal");
    var btn = document.getElementById("checkout-button");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Отправка формы
    document.getElementById('order-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Здесь вы можете добавить код для отправки данных формы на сервер или другой логики
        alert('Заказ отправлен!');
        modal.style.display = "none";
    });

//корзина 

let cart = []; // массив для хранения товаров в корзине

let totalPrice = 0;

function addToCart(productId) {
  var productElement = document.querySelector(`[id='${productId}'] .selected`).parentElement;
  var size = productElement.getAttribute('data-size');
  var weight = productElement.getAttribute('data-weight');
  var price = parseFloat(productElement.getAttribute('data-price'));

  // Проверить, есть ли товар уже в корзине
  const existingItem = cart.find(item => item.productId === productId && item.size === size);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, size, weight, price, quantity: 1 });
  }
  
  // Обновить итоговую цену
  totalPrice += price;

  // Обновить отображение корзины
  updateCartDisplay();
}

// Обновление корзины
    function updateCartDisplay() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');

        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${item.quantity} x ${item.price}$`;
            totalPrice += item.quantity * item.price;

            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.onclick = function() {
                item.quantity--;
                if (item.quantity <= 0) {
                    cartItems.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartDisplay();
            };

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.onclick = function() {
                item.quantity++;
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartDisplay();
            };

            listItem.appendChild(minusButton);
            listItem.appendChild(plusButton);
            cartItemsContainer.appendChild(listItem);
        });

        totalPriceElement.textContent = `Итоговая цена: ${totalPrice}$`;
    }

    updateCartDisplay();

    // Добавление в корзину (пример функции, вы должны её вызывать при добавлении товара)
    function addToCart(name, price) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cartItems.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartDisplay();
    }

// для менюшки 
window.addEventListener('scroll', function() {
  var menu = document.getElementById('header-navigation'); // Получаем элемент меню
  var scrollPosition = window.scrollY || window.pageYOffset; // Получаем позицию прокрутки

  if (scrollPosition > 0) {
    menu.classList.add('fixed-menu'); // Добавляем класс для фиксированного меню
  } else {
    menu.classList.remove('fixed-menu'); // Удаляем класс для фиксированного меню
  }
});


// function openModal() {
//   let modal = document.getElementById('myModal');
//   modal.style.display = "block";

//   // Логика отправки данных из модального окна
// }

