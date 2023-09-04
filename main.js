function getH1(className, text) {
	let h1 = document.createElement('h1');
	h1.classList.add(className);
	h1.textContent = text;
	return h1
}
function getInput(placeholder, type, className) {
	let input = document.createElement('input');
	input.placeholder = placeholder;
	input.type = type;
	input.classList.add(className);
	return input
}
function getBtn(className, text) {
	let btn = document.createElement('button');
	btn.classList.add(className);
	btn.textContent = text;
	return btn
}
function getDiv(className, text) {
	let div = document.createElement('div');
	div.classList.add(className);
	div.textContent = text;
	return div
}
function getUl(className, text) {
	let ul = document.createElement('ul');
	ul.classList.add(className);
	ul.textContent = text;
	return ul
}
function getLi(className, text) {
	let li = document.createElement('li');
	li.classList.add(className);
	li.textContent = text;
	return li
}

// Массивы продукта, количества, цены
let productArray = ['Кофе', 'Молоко', 'Сахар',];
let countArray = [1, 3, 2];
let priceArray = [540, 120, 80];

let wrapper = getDiv('hero__wrapper');
let mainTitle = getH1('hero__main-title', 'Чек покупки');
let inputRow = getDiv('hero__input-row');

// создание инпутов + кнопки добавления
let productNameInp = getInput('Название товара', 'text', 'hero__input');
let countInp = getInput('Количество', 'number', 'hero__input');
let priceInp = getInput('Цена', 'number', 'hero__input');
let addProductBtn = getBtn('hero__main-btn', 'Добавить');
// Получение значений из инпутов и добавление в массив при нажатии на кнопку
addProductBtn.onclick = function () {
	let productNameValue = productNameInp.value;
	let countValue = Number(countInp.value);
	let priceInpValue = Number(priceInp.value);

	productArray.push(productNameValue);
	countArray.push(countValue);
	priceArray.push(priceInpValue);
	// Требуется рендер
	render(productArray, countArray, priceArray)

	productNameInp.value = '';
	countInp.value = '';
	priceInp.value = '';
}
inputRow.append(productNameInp, countInp, priceInp, addProductBtn);

let list = getUl('hero__list');

// функция, возвращающая элемент списка (товар, кол-во, цену...)
function getProductItem(index, product, count, price) {
	let itemRow = getLi('hero__item-row');

	let productNumber = getDiv('hero__item-number', `${index + 1}`);

	let productBox = getDiv('hero__item-box');
	let productLabel = getDiv('hero__product-label', 'Название');
	let productValue = getDiv('hero__product-value', `${product}`);
	productBox.append(productLabel, productValue)

	let countBox = getDiv('hero__item-box');
	let countLabel = getDiv('hero__product-label', 'Кол-во');
	let countValue = getDiv('hero__product-value', `${count}`);
	countBox.append(countLabel, countValue)

	let priceBox = getDiv('hero__item-box');
	let priceLabel = getDiv('hero__product-label', 'Цена');
	let priceValue = getDiv('hero__product-value', `${price}`);
	priceBox.append(priceLabel, priceValue)

	let summPriceBox = getDiv('hero__item-box');
	let summPriceLabel = getDiv('hero__product-label', 'Общая цена');
	let summPriceValue = getDiv('hero__product-value', `${count * price}`);
	summPriceBox.append(summPriceLabel, summPriceValue)

	let buttonsBox = getDiv('hero__item-box');
	let editBtn = getBtn('hero__edit-btn', 'Изменить');
	let removeBtn = getBtn('hero__remove-btn', 'Удалить');

	editBtn.onclick = function () {
		let newProduct = prompt('Введите название товара', product);
		let newCount = Number(prompt('Введите кол-во товара', count));
		let newPrice = Number(prompt('Введите цену товара', price));

		productArray[index] = newProduct;
		countArray[index] = newCount;
		priceArray[index] = newPrice;
		// Требуется рендер
		render(productArray, countArray, priceArray)
	}

	removeBtn.onclick = function () {
		if (confirm(`Вы уверены, что хотите удалить товар "${product}"?`) === true) {
			productArray.splice(index, 1)
			countArray.splice(index, 1)
			priceArray.splice(index, 1)
			// Требуется рендер
			render(productArray, countArray, priceArray)
		}
	}

	buttonsBox.append(editBtn, removeBtn)

	itemRow.append(productNumber, productBox, countBox, priceBox, summPriceBox, buttonsBox);
	return itemRow
}

// создание айтема итоговой стоимости
let totalResultBox = getDiv('hero__result-item');
let totalResultTitle = getDiv('hero__result-title', 'Итоговая стоимость');
let totalResultPrice = getDiv('hero__result-price', '0 руб');
totalResultBox.append(totalResultTitle, totalResultPrice);

// функция отрисовки
function render(productArr, countArr, priceArr) {
	list.innerHTML = '';

	// Если нет товаров, то выводится текст
	if (productArr.length === 0) {
		let noProduct = getDiv('hero__no-product', 'Товары не добавлены')
		list.append(noProduct)
		totalResultPrice.textContent = `0 руб`
		return
	}

	let totalPrice = 0;

	for (let i = 0; i < productArr.length; i++) {
		let productItem = getProductItem(i, productArr[i], countArr[i], priceArr[i])
		list.append(productItem)

		totalPrice = totalPrice + (countArr[i] * priceArr[i])
	}
	totalResultPrice.textContent = `${totalPrice} руб`
}

render(productArray, countArray, priceArray)

wrapper.append(mainTitle, inputRow, list, totalResultBox);
document.body.append(wrapper);