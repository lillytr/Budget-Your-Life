const categories = [];
const shortGoals = [];
const longGoals  = [];
const NUM_ROWS   = 8;

// form buttons - open dialogs
const categoryDialog = document.getElementById('categoryForm');
const expenseDialog  = document.getElementById('expenseForm');
const shortDialog    = document.getElementById('shortForm');
const longDialog     = document.getElementById('longForm');

document.getElementById('openForm').onclick        = () => categoryDialog.showModal();
document.getElementById('openExpenseForm').onclick = () => expenseDialog.showModal();
document.getElementById('openShortForm').onclick   = () => shortDialog.showModal();
document.getElementById('openLongForm').onclick    = () => longDialog.showModal();

// close dialog helper
function closeDialog(id) {
    document.getElementById(id).close();
}

// add category option to the expense dropdown
function addCatOption(name) {
    const sel = document.getElementById('expCat');
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
}

// remove category option from the expense dropdown
function removeCatOption(name) {
    const sel = document.getElementById('expCat');
    for (const o of sel.options) {
        if (o.value === name) {
            sel.removeChild(o);
            break;
        }
    }
}

// add category
document.getElementById('addCatBtn').onclick = () => {
    const val = document.getElementById('catInput').value.trim();
    if (!val) return;
    if (categories.find(c => c.name === val)) { alert('Already exists!'); return; }
    categories.push({ name: val, expenses: [] });
    addCatOption(val);
    renderTable();
    document.getElementById('catInput').value = '';
    closeDialog('categoryForm');
};

// add expense
document.getElementById('addExpBtn').onclick = () => {
    const name    = document.getElementById('expInput').value.trim();
    const amt     = document.getElementById('expAmt').value.trim();
    const catName = document.getElementById('expCat').value;
    if (!name || !catName) { alert('Fill in name and select category.'); return; }
    const cat = categories.find(c => c.name === catName);
    if (cat) cat.expenses.push({ name, amount: amt ? parseFloat(amt) : null });
    renderTable();
    document.getElementById('expInput').value = '';
    document.getElementById('expAmt').value   = '';
    document.getElementById('expCat').value   = '';
    closeDialog('expenseForm');
};

// add short term goal
document.getElementById('addShortBtn').onclick = () => {
    const text     = document.getElementById('shortInput').value.trim();
    const target   = document.getElementById('shortTarget').value.trim();
    const deadline = document.getElementById('shortDeadline').value.trim();
    if (!text) return;
    shortGoals.push({ text, target: target ? parseFloat(target) : null, deadline });
    renderGoals();
    document.getElementById('shortInput').value    = '';
    document.getElementById('shortTarget').value   = '';
    document.getElementById('shortDeadline').value = '';
    closeDialog('shortForm');
};

// add long term goal
document.getElementById('addLongBtn').onclick = () => {
    const text     = document.getElementById('longInput').value.trim();
    const target   = document.getElementById('longTarget').value.trim();
    const deadline = document.getElementById('longDeadline').value.trim();
    if (!text) return;
    longGoals.push({ text, target: target ? parseFloat(target) : null, deadline });
    renderGoals();
    document.getElementById('longInput').value    = '';
    document.getElementById('longTarget').value   = '';
    document.getElementById('longDeadline').value = '';
    closeDialog('longForm');
};