// Toggle the burger menu
const burgerMenuIcon = document.getElementById("burgerMenuIcon");
const sideNavbar = document.getElementById("sideNavbar");
const contentContainer = document.getElementById("contentContainer");

burgerMenuIcon.addEventListener("click", () => {
    sideNavbar.classList.toggle("active");
    contentContainer.classList.toggle("side-navbar-active");
});