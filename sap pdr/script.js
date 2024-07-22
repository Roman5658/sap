// Массив для хранения предыдущих меню для кнопки "Назад"
let previousMenus = [];
let selectedMaterial = null;
let currentMenu = 'main-menu';

// Функция для навигации между меню
function navigateTo(menuId) {
    document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));
    document.getElementById(menuId).classList.add('active');

    if (menuId !== 'main-menu' && menuId !== 'komplektacja-pociagu' && !previousMenus.includes(menuId)) {
        previousMenus.push(currentMenu);
    }

    currentMenu = menuId;
}

// Функция для выбора материала из меню "Komplektacja Pociągu"
function selectMaterial(index) {
    document.querySelectorAll('#materials-menu .function').forEach(item => {
        item.classList.remove('highlighted');
    });
    document.getElementById(`material-${index}`).classList.add('highlighted');
    selectedMaterial = document.getElementById(`material-${index}`);

    navigateTo('localization-menu');
    document.getElementById('localization-message').innerText = `Idź do - GL-005-01`;
}

// Функция для выбора материала из меню "Zwrot z produkcji"
function selectReturnMaterial(index) {
    document.querySelectorAll('#return-materials-menu .function').forEach(item => {
        item.classList.remove('highlighted');
    });
    document.getElementById(`return-material-${index}`).classList.add('highlighted');
    selectedMaterial = document.getElementById(`return-material-${index}`);

    navigateTo('localization-menu');
    document.getElementById('localization-message').innerText = `Idź do - GL-005-01`;
}

// Функция для подтверждения введенного количества
function confirmQuantity() {
    const quantity = parseInt(document.getElementById('quantity-input').value.trim());
    const availableQuantity = parseInt(selectedMaterial.getAttribute('data-quantity'));

    if (isNaN(quantity) || quantity <= 0) {
        document.getElementById('error-message').innerText = 'Proszę wpisać prawidłową ilość.';
        return;
    }

    if (quantity > availableQuantity) {
        document.getElementById('error-message').innerText = `Przekracza limit. Maksymalna ilość: ${availableQuantity}.`;
        return;
    }

    const newQuantity = availableQuantity - quantity;
    selectedMaterial.setAttribute('data-quantity', newQuantity);
    selectedMaterial.innerText = `${selectedMaterial.innerText.split(' - ')[0]} - ${newQuantity} szt`;

    document.getElementById('error-message').innerText = '';
    navigateTo('fill-material-menu');
    document.getElementById('fill-material-message').innerText = `Uzupełnij materiał do KB000345345`;

    setTimeout(() => {
        document.getElementById('fill-material-message').innerText = '';
        navigateTo('materials-menu'); // Возвращение в меню выбора материалов
    }, 2000); // Задержка для отображения сообщения о подтверждении
}

// Функция для возврата к предыдущему меню
function back() {
    if (previousMenus.length > 0) {
        const previousMenu = previousMenus.pop();
        navigateTo(previousMenu);
    } else {
        alert('Brak poprzedniego menu.');
    }
}

// Функции для кнопок внизу страницы
function confirm() {
    alert('Funkcja potwierdzona.');
}

function cancel() {
    alert('Funkcja anulowana.');
}

// Функция для обработки команды из текстового поля
function handleCommand(event) {
    if (event.key === 'Enter') {
        executeCommand();
    }
}

// Функция для выполнения команды на основе введенного текста
function executeCommand() {
    const command = document.getElementById('command-input').value.trim();
    switch (command) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
            navigateTo('main-menu');
            break;
        case '6':
            navigateTo('komplektacja-pociagu');
            break;
        case '7':
            navigateTo('zwrot-z-produkcji');
            break;
        case '6-1':
            navigateTo('sub-menu-2');
            break;
        case '6-1-4':
            navigateTo('materials-menu');
            break;
        case '7-4':
            navigateTo('return-materials-menu');
            break;
        case '8': // Новая команда для меню статусов
            navigateTo('statusy-menu');
            break;
        default:
            alert('Nieznana komenda');
            break;
    }
}

// Привязка обработчика событий для текстового поля команды
document.getElementById('command-input').addEventListener('keydown', handleCommand);
