document.addEventListener("DOMContentLoaded", () => {
    const civicTotalElem = document.getElementById("civic-total");
    const civicCalcInput = document.getElementById("civic-calc");
    const civicCalcBtn = document.getElementById("civic-calc-btn");
    const priceElems = document.querySelectorAll("price");
    const totalHasSumElem = document.getElementById("civic-total-has-sum");
    const civicCalcResultElem = document.getElementById("civic-calc-result");

    function getTotalPrice() {
        return Array.from(priceElems)
            .map(elem => parseFloat(elem.textContent.replace(".", "")) || 0)
            .reduce((acc, curr) => acc + curr, 0);
    }

    function displayTotalPrice() {
        const totalPrice = getTotalPrice();
        totalHasSumElem.textContent = `The total amount of money saved: ${totalPrice}$`;
    }

    civicCalcBtn.addEventListener("click", () => {
        const civicTotal = parseFloat(civicTotalElem.textContent.replace(".", "")) || 0;
        const monthlyAmount = parseFloat(civicCalcInput.value) || 0;

        if (isNaN(monthlyAmount) || monthlyAmount <= 0) {
            civicCalcResultElem.textContent = "Enter a valid amount in the 'Every month, keep...' field";
            return;
        }

        const totalSpent = getTotalPrice();
        const remaining = civicTotal - totalSpent;

        console.log("Amount in civicTotal:", civicTotal);
        console.log("Amount from all <price>:", totalSpent);
        console.log("Remaining:", remaining);

        if (remaining <= 0) {
            civicCalcResultElem.textContent = "Everything is already paid or the amount is less than zero.";
            return;
        }

        const monthsNeeded = remaining / monthlyAmount;
        civicCalcResultElem.textContent = `You need ${Math.ceil(monthsNeeded)} months to save the remaining amount.`;
    });

    displayTotalPrice();
});
