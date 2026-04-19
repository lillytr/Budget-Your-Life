const categories = [];
const shortGoals = [];
const longGoals  = [];
const NUM_ROWS   = 23;

// PLUS BUTTON DROPDOWN
const plusBtn      = document.getElementById('plusBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

plusBtn.onclick = (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('open');
};
document.addEventListener('click', () => dropdownMenu.classList.remove('open'));
dropdownMenu.addEventListener('click', e => e.stopPropagation());


//__________________________________________________________________________________________________
// DIALOG HELPERS
function openDialog(id) {
  dropdownMenu.classList.remove('open');
  document.getElementById(id).showModal();
}
function closeDialog(id) {
  document.getElementById(id).close();
}

//__________________________________________________________________________________________________
// CATEGORY DROPDOWN HELPERS
function addCatOption(name) {
  const sel = document.getElementById('expCat');
  const opt = document.createElement('option');
  opt.value = name;
  opt.textContent = name;
  sel.appendChild(opt);
}
function removeCatOption(name) {
  const sel = document.getElementById('expCat');
  for (const o of sel.options) {
    if (o.value === name) { sel.removeChild(o); break; }
  }
}

//__________________________________________________________________________________________________
// RENDER TABLE
function renderTable() {                                 
  const catRow = document.getElementById('catRow');
  const body   = document.getElementById('expenseBody');

  catRow.innerHTML = '<th style="background:transparent;border:none;width:20px;"></th>';
  categories.forEach((cat, ci) => {
    const th = document.createElement('th');
    th.className = 'cat-cell';
    th.innerHTML = `${cat.name}<button class="cat-del" data-ci="${ci}">✕</button>`;
    catRow.appendChild(th);
  });

  body.innerHTML = '';                                      
  for (let r = 0; r < NUM_ROWS; r++) {
    const tr = document.createElement('tr');
    const numTd = document.createElement('td');
    numTd.style.cssText = 'font-size:9px;color:rgba(90,16,16,0.4);background:rgba(255,255,255,0.1);border:1px solid #222;width:20px;';
    numTd.textContent = r + 1;
    tr.appendChild(numTd);

    categories.forEach((cat, ci) => {
      const td = document.createElement('td');
      td.className = 'expense-cell';
      const exp = cat.expenses[r];
      if (exp) {
        td.innerHTML = `${exp.name}${exp.amount !== null ? '<br><small style="color:#8b0000;">$'+exp.amount.toFixed(2)+'</small>' : ''}<button class="exp-del" data-ci="${ci}" data-ri="${r}">X</button>`;
      } else if (r === 0 && cat.expenses.length === 0) {
        td.innerHTML = `<span class="empty-col-label">expenses</span>`;
      }
      tr.appendChild(td);
    });

    if (categories.length === 0 && r === Math.floor(NUM_ROWS / 2) - 1) {
      const td = document.createElement('td');
      td.colSpan = 5;
      td.style.cssText = 'text-align:center;background:var(--red-table);border:1.5px solid #222;';
      td.innerHTML = '<span class="expenses-label">Expenses</span>';
      tr.appendChild(td);
    }
    body.appendChild(tr);
  }

  catRow.querySelectorAll('.cat-del').forEach(btn => {
    btn.onclick = () => {
      const ci = parseInt(btn.dataset.ci);
      removeCatOption(categories[ci].name);
      categories.splice(ci, 1);
      renderTable();
    };
  });
  body.querySelectorAll('.exp-del').forEach(btn => {
    btn.onclick = () => {
      const ci = parseInt(btn.dataset.ci);
      const ri = parseInt(btn.dataset.ri);
      categories[ci].expenses.splice(ri, 1);
      renderTable();
    };
  });
}              

//__________________________________________________________________________________________________
// RENDER GOALS
function renderGoals() {
  renderPriorities();
  renderGoalPopupList('shortGoalPopupList', shortGoals, 'short');
  renderGoalPopupList('longGoalPopupList', longGoals, 'long');
}

function renderPriorities() {
  const el = document.getElementById('priorityList');
  el.innerHTML = '';
  const all = [
    ...shortGoals.map(g => ({...g, type:'Short'})),
    ...longGoals.map(g => ({...g, type:'Long'}))
  ].slice(0, 5);

  if (!all.length) {
    el.innerHTML = '<p class="no-goals-msg">Add goals to see priorities here.</p>';
    return;
  }
  all.forEach(g => {
    const div = document.createElement('div');
    div.className = 'priority-item';
    div.innerHTML = `<span>${g.text} <small style="color:#8b5050;font-size:10px;">[${g.type}]</small></span>`;
    el.appendChild(div);
  });
}

function renderGoalPopupList(containerId, list, type) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  if (!list.length) {
    el.innerHTML = '<p class="no-popup-msg">No goals yet.</p>';
    return;
  }
  list.forEach((g, idx) => {
    const div = document.createElement('div');
    div.className = 'goal-list-item';
    let meta = [];
    if (g.target) meta.push(`$${g.target.toLocaleString()}`);
    if (g.deadline) meta.push(g.deadline);
    div.innerHTML = `
      <div class="g-info">
        <div class="g-name">${g.text}</div>
        ${meta.length ? `<div class="g-meta">${meta.join(' · ')}</div>` : ''}
      </div>
      <button class="g-del" data-type="${type}" data-idx="${idx}">X</button>`;
    el.appendChild(div);
  });

  el.querySelectorAll('.g-del').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.dataset.idx);
      if (btn.dataset.type === 'short') shortGoals.splice(idx, 1);
      else longGoals.splice(idx, 1);
      renderGoals();
    };
  });
}

// GOAL POPUPS
function openGoalPopup(type) {
  document.getElementById(type + 'Popup').classList.add('open');
}
function closeGoalPopup(type) {
  document.getElementById(type + 'Popup').classList.remove('open');
}



//__________________________________________________________________________________________________
// ADD CATEGORY
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

// ADD EXPENSE
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

// ADD SHORT GOAL
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

// ADD LONG GOAL
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


renderTable();