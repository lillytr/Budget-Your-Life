document.addEventListener("DOMContentLoaded", function () {

  const shopBtn = document.getElementById("shopBtn");
  const closeBtn = document.getElementById("closeBtn");
  const shopModal = document.getElementById("shopModal");
  const shirtTab = document.getElementById("shirtTab");
  const shopItems = document.getElementById("shopItems");

  // OPEN SHOP
  shopBtn.onclick = function () {
    shopModal.style.display = "block";
    renderShirts();
  };

  // CLOSE SHOP
  closeBtn.onclick = function () {
    shopModal.style.display = "none";
  };

  // TAB CLICK
  shirtTab.onclick = function () {
    renderShop("shirts", 12, "shirtLayer");
  };



  // RENDER SHIRTS ONLY
  function renderShop(type, max, id) {
    shopItems.innerHTML = "";

    let maxItems = max; // or more later

    for (let i = 1; i <= maxItems; i++) {

      const item = document.createElement("div");
      item.className = "item";

      item.innerHTML = `
        <img src="images/${type}/icon/${i}.png" width="60">
      `;

      item.onclick = function () {
        document.getElementById(id).src =
          `images/${type}/display/${i}.png`;
      };

      shopItems.appendChild(item);

      
    }
  }

});