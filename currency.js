// COINSSS
let coins = parseInt(localStorage.getItem('coins')) || 100;
document.getElementById('coins').textContent = coins;


function addCoins(amount) {
    coins += amount;
    document.getElementById('coins').textContent = coins;
}

function spendCoins(amount) {
    if (coins >= amount) {
        coins -= amount;
        document.getElementById('coins').textContent = coins;
        return true;
    }
    else {
        alert("Not enough coins!");
        return false;
    }
}

function showCoinPopup(amount, goalName) {
    const popup = document.createElement('div');
    popup.className = 'coin-popup';
    popup.innerHTML = `
        <div class="coin-popup-inner">
            <div class="coin-popup-title">Goal Complete!</div>
            <div class="coin-popup-goal">"${goalName}"</div>
            <div class="coin-popup-reward">+${amount} coins</div>
            <button class="coin-popup-close" onclick="this.closest('.coin-popup').remove()">Collect</button>
        </div>
    `;
    document.body.appendChild(popup);
}


//Save data
function saveData() {
    localStorage.setItem('coins', coins);
}
