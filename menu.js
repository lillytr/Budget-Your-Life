const menuBtn = document.querySelector(".menu-btn");
const mainNav = document.querySelector(".main-nav");

menuBtn.addEventListener("click", function() {
    mainNav.classList.toggle("show-menu");
});