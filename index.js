document.addEventListener("DOMContentLoaded", function () {
    // Burger menu toggle
    const burgerMenuIcon = document.getElementById("burgerMenuIcon");
    const sideNavbar = document.getElementById("sideNavbar");
    const contentContainer = document.getElementById("contentContainer");

    burgerMenuIcon.addEventListener("click", () => {
        sideNavbar.classList.toggle("active");
        contentContainer.classList.toggle("side-navbar-active");
    });

    // Table of contents dropdowns
    const dropdowns = document.getElementById("tableOfContents").querySelectorAll('.dropdown');

    for (let i = 0; i < dropdowns.length; i++) {
        const dropdown = dropdowns[i];
        const nestedDropdown = dropdown.querySelector('.nested-dropdown');
        const dropdownButton = dropdown.querySelector(".dropdown-button");

        const icon = dropdownButton.querySelector(".icon-arrow");
        const iconInactivePath = "Assets/Icons/arrow-50-down.png";
        const iconActivePath = "Assets/Icons/arrow-50-up.png";

        dropdownButton.addEventListener('click', () => {
            nestedDropdown.classList.toggle('active');

            if (nestedDropdown.classList.contains('active')) {
                icon.src = iconActivePath;
                icon.alt = "Arrow up icon";

                dropdownButton.classList.add('active');
            }
            else {
                icon.src = iconInactivePath;
                icon.alt = "Arrow down icon";

                dropdownButton.classList.remove('active');
            }
        });
    }
});