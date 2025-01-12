document.addEventListener("DOMContentLoaded", () => {
    const civicTotalElem = document.getElementById("civic-total");
    const civicCalcInput = document.getElementById("civic-calc");
    const civicCalcBtn = document.getElementById("civic-calc-btn");
    const priceElems = document.querySelectorAll("price");
    const totalHasSumElem = document.getElementById("civic-total-has-sum");
    const civicCalcResultElem = document.getElementById("civic-calc-result"); // Новый элемент для вывода результата

    // Функция для получения суммы всех чисел из тегов <price>
    function getTotalPrice() {
        return Array.from(priceElems)
            .map(elem => parseFloat(elem.textContent.replace(".", "")) || 0)
            .reduce((acc, curr) => acc + curr, 0);
    }

    // Функция для отображения суммы всех <price> в указанном элементе
    function displayTotalPrice() {
        const totalPrice = getTotalPrice();
        totalHasSumElem.textContent = `The total amount of money saved: ${totalPrice}$`;
    }

    // Обработчик клика по кнопке
    civicCalcBtn.addEventListener("click", () => {
        const civicTotal = parseFloat(civicTotalElem.textContent.replace(".", "")) || 0; // Текущая сумма
        const monthlyAmount = parseFloat(civicCalcInput.value) || 0; // Значение из инпута

        if (isNaN(monthlyAmount) || monthlyAmount <= 0) {
            civicCalcResultElem.textContent = "Введите корректное значение в поле 'Every month, keep...'";
            return;
        }

        const totalSpent = getTotalPrice(); // Сумма всех значений из <price>
        const remaining = civicTotal - totalSpent; // Остаток

        console.log("Сумма в civicTotal:", civicTotal);
        console.log("Сумма из всех <price>:", totalSpent);
        console.log("Остаток:", remaining);

        if (remaining <= 0) {
            civicCalcResultElem.textContent = "Все уже оплачено или сумма меньше нуля.";
            return;
        }

        const monthsNeeded = remaining / monthlyAmount; // Кол-во месяцев
        civicCalcResultElem.textContent = `Вам нужно ${Math.ceil(monthsNeeded)} месяцев, чтобы накопить оставшуюся сумму.`;
    });

    // Вызываем функцию отображения суммы сразу при загрузке страницы
    displayTotalPrice();
});
