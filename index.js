document.addEventListener("DOMContentLoaded", function () {
    // Toggle the burger menu
    const burgerMenuIcon = document.getElementById("burgerMenuIcon");
    const sideNavbar = document.getElementById("sideNavbar");
    const contentContainer = document.getElementById("contentContainer");

    burgerMenuIcon.addEventListener("click", () => {
        sideNavbar.classList.toggle("active");
        contentContainer.classList.toggle("side-navbar-active");
    });

    // Table of contents - Dropdown list
    const items = document.getElementById("tableOfContents").querySelectorAll(".item");
    const itemsWithDropdown = document.getElementById("tableOfContents").querySelectorAll('.has-dropdown');

    // Stop event propagation (childs calling the event on parents):
    items.forEach(item => {
        item.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });

    for (let i = 0; i < itemsWithDropdown.length; i++) {
        const item = itemsWithDropdown[i];
        const nestedDropdown = item.querySelector('.nested-dropdown');

        // Add 'click' event to itemsWithDropdown:
        item.querySelector(".dropdown-button").addEventListener('click', () => {
            nestedDropdown.classList.toggle('active');
        });
    }
});