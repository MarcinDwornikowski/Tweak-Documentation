// Toggle the burger menu
const menuIcon = document.getElementById("menuIcon");
const sideNavbar = document.getElementById("sideNavbar");
const contentContainer = document.getElementById("contentContainer");

menuIcon.addEventListener("click", () => {
    sideNavbar.classList.toggle("active");
    contentContainer.classList.toggle("side-navbar-active");
});