
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

function updateCartDisplay() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';

  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <div class="item-info">
        ${item.productId} (${item.size}) - ${item.weight} - ${item.price.toFixed(2)}$
      </div>
      <div class="quantity-controls">
        <button onclick="updateQuantity('${item.productId}', '${item.size}', -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity('${item.productId}', '${item.size}', 1)">+</button>
      </div>
    `;
    cartItemsElement.appendChild(itemElement);
  });

  document.getElementById('total-price').textContent = totalPrice.toFixed(2) + '$';
}

function updateQuantity(productId, size, change) {
  const item = cart.find(item => item.productId === productId && item.size === size);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      // Удалить товар из корзины, если количество стало 0 или меньше
      cart = cart.filter(cartItem => cartItem !== item);
      totalPrice -= item.price; // Уменьшить итоговую цену на стоимость одного товара
    } else {
      // Обновить итоговую цену
      totalPrice += item.price * change;
    }
  }
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

