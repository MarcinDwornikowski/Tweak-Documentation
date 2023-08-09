document.addEventListener("DOMContentLoaded", function () {
    // Toggle the burger menu
    const burgerMenuIcon = document.getElementById("burgerMenuIcon");
    const sideNavbar = document.getElementById("sideNavbar");
    const contentContainer = document.getElementById("contentContainer");

    burgerMenuIcon.addEventListener("click", () => {
        sideNavbar.classList.toggle("active");
        contentContainer.classList.toggle("side-navbar-active");
    });

    // Dropdown menu
    const dropdownBtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    dropdownBtn.addEventListener("click", function () {
        dropdownContent.classList.toggle("active");
    });

    window.addEventListener("click", function (event) {
        if (!event.target.matches(".dropbtn")) {
            if (dropdownContent.classList.contains("active")) {
                dropdownContent.classList.remove("active");
            }
        }
    });

    // Dropdown list
    const itemsWithDropdown = document.querySelectorAll('.has-dropdown');

    itemsWithDropdown.forEach(item => {
        const nestedDropdown = item.querySelector('.nested-dropdown');
        const nextSibling = item.nextElementSibling;

        item.addEventListener('click', () => {
            nestedDropdown.classList.toggle('active');

            if (nestedDropdown.classList.contains('active')) {
                nextSibling.style.marginTop = `${nestedDropdown.clientHeight}px`;
            } else {
                nextSibling.style.marginTop = '0';
            }
        });
    });
});