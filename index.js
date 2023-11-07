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
    const tableOfContents = document.getElementById("tableOfContents");
    const dropdowns = tableOfContents.querySelectorAll('.dropdown');

    for (let i = 0; i < dropdowns.length; i++) {
        const dropdown = dropdowns[i];
        const nestedDropdown = dropdown.querySelector('.nested-dropdown');
        const dropdownButton = dropdown.querySelector(".dropdown-button");

        const icon = dropdownButton.querySelector(".icon-arrow");
        const iconInactivePath = "Assets/Icons/arrow-thin-right.png";
        const iconActivePath = "Assets/Icons/arrow-thin-up.png";

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
    };

    // Hover and touch events for the buttons in the table of contents:
    const tableOfContentsButtons = tableOfContents.querySelectorAll("button");

    tableOfContentsButtons.forEach(function (button) {
        let previousBackgroundColor;

        button.addEventListener("mouseover", function () {
            previousBackgroundColor = button.style.backgroundColor;
            button.style.backgroundColor = "rgba(0, 0, 124, 0.1)";
        });

        button.addEventListener("mouseout", function () {
            button.style.backgroundColor = previousBackgroundColor;
        });

        button.addEventListener("touchstart", function (event) {
            event.preventDefault();
            previousBackgroundColor = button.style.backgroundColor;
            button.style.backgroundColor = "rgba(0, 0, 124, 0.1)";
            // event.preventDefault() prevents the click event so we invoke it manually:
            button.click();
        });

        button.addEventListener("touchend", function () {
            button.style.backgroundColor = previousBackgroundColor;
        });
    })
});