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

    items.forEach(item => {
        item.addEventListener("click", (event) => {
            event.stopPropagation(); // Stop event propagation (childs calling the event on parents)
        });
    });

    itemsWithDropdown.forEach(item => {
        const nestedDropdown = item.querySelector('.nested-dropdown');

        var nextSibling = item.nextElementSibling;
        if (nextSibling == null) {
            nextSibling = getParentsNextSiblingRecursively(item);
        }

        item.querySelector(".dropdown-button").addEventListener('click', () => {
            nestedDropdown.classList.toggle('active');

            if (nestedDropdown.classList.contains('active')) {
                nextSibling.style.marginTop = `${nestedDropdown.clientHeight}px`;
            } else {
                nextSibling.style.marginTop = '0';
            }
        });
    });

    function getParentsNextSiblingRecursively(element) {
        var parent = element.parentElement;
        var nextSibling = parent.nextElementSibling;
        if (nextSibling == null)
            return getParentsNextSiblingRecursively(parent);
        else
            return nextSibling;
    }
});