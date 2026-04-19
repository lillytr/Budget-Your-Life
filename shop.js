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
  const hairTab = document.getElementById("hairTab");
  const hairMenu = document.getElementById("hairMenu");

  const faceTab = document.getElementById("faceTab");
  const faceMenu = document.getElementById("faceMenu");

  const clothesTab = document.getElementById("clothesTab");
  const clothesMenu = document.getElementById("clothesMenu");
  const topsTab = document.getElementById("topsTab");
  
  
  const shirtTab = document.getElementById("shirtTab");
  const shopItems = document.getElementById("shopItems");



  // TAB CLICK
  hairTab.onclick = function () {
    hairMenu.classList.toggle("show");
  };

  faceTab.onclick = function () {
    faceMenu.classList.toggle("show");
  };

  clothesTab.onclick = function () {
    clothesMenu.classList.toggle("show");
  };

  topsTab.onclick = function () {
    renderShop("shirts", 12, "topsTab");
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