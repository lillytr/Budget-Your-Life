document.addEventListener("DOMContentLoaded", function () {

  //open and closing shop 
  const shopBtn = document.getElementById("shopBtn");
  const closeBtn = document.getElementById("closeBtn");
  const shopModal = document.getElementById("shopModal");

    // OPEN SHOP
  shopBtn.onclick = function () {
    shopModal.style.display = "block";
    renderShirts();
  };

  // CLOSE SHOP
  closeBtn.onclick = function () {
    shopModal.style.display = "none";
  };
  
  //Header tabs 
  const topsTab = document.getElementById("topsTab");
  
  
  const shirtTab = document.getElementById("shirtTab");
  const shopItems = document.getElementById("shopItems");




// drop down toggle menu 
function setupDropdown(tabId, menuId) {
  const tab = document.getElementById(tabId);
  const menu = document.getElementById(menuId);

  tab.onclick = function () {
    menu.classList.toggle("show");
  };
}

// Set up all dropdowns
setupDropdown("hairTab", "hairMenu");
setupDropdown("faceTab", "faceMenu");
setupDropdown("clothesTab", "clothesMenu");



//toggle item list 
function itemList(tabId, type, max,layer) {
  const tab = document.getElementById(tabId);

  tab.onclick = function () {
    renderShop(type, max, layer);
  };
}
itemList("topsTab", "shirts", 12, "shirtLayer");
itemList("pantsTab", "pants", 8, "pantLayer");
itemList("shoesTab", "shoes", 4, "shoeLayer");
itemList("bangsTab", "bangs", 13, "bangLayer");
itemList("dressesTab", "dresses", 7, "dressLayer");
itemList("eyelashesTab", "eyelashes", 5, "eyelashesLayer");
itemList("lhairsTab", "lhairs", 12, "lhairLayer");
itemList("hairsTab", "hairs", 12, "hairLayer");
itemList("eyesTab", "eyes", 9, "eyeLayer");


  // TAB CLIC






function renderShop(type, max, layer) {
  shopItems.innerHTML = "";

  for (let i = 1; i <= max; i++) {

    const item = document.createElement("div");
    item.className = "item";

  
    let price = 0;

    if (
      type === "shirts" ||
      type === "pants" ||
      type === "shoes" ||
      type === "dresses"
    ) {
      price = 20; 
    }

    item.innerHTML = `
      <img src="images/${type}/icon/${i}.png" width="60">
    `;

    item.onclick = function () {

      if (price === 0 || spendCoins(price)) {

        document.getElementById(layer).src =
          `images/${type}/display/${i}.png`;

        saveData(); 

      }

    };

    shopItems.appendChild(item);

  }
}

});