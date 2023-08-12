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
    var itemsWithDropdownDropdownHeights = [];

    items.forEach(item => {
        item.addEventListener("click", (event) => {
            event.stopPropagation(); // Stop event propagation (childs calling the event on parents)
        });
    });

    // itemsWithDropdown.forEach(item => {
    //     const nestedDropdown = item.querySelector('.nested-dropdown');

    //     var nextSibling = item.nextElementSibling;
    //     if (nextSibling == null) {
    //         nextSibling = getParentsNextSiblingRecursively(item);
    //     }

    //     item.querySelector(".dropdown-button").addEventListener('click', () => {
    //         nestedDropdown.classList.toggle('active');

    //         if (nestedDropdown.classList.contains('active')) {
    //             nextSibling.style.marginTop = `${nestedDropdown.clientHeight}px`;
    //         } else {
    //             nextSibling.style.marginTop = '0';
    //         }
    //     });
    // });

    for (let i = 0; i < itemsWithDropdown.length; i++) {
        const item = itemsWithDropdown[i];
        const nestedDropdown = item.querySelector('.nested-dropdown');

        // Add dropdown heights to their array:
        const dropdownHeightObj = {
            Item: item,
            Height: `${nestedDropdown.clientHeight}px`
        };
        itemsWithDropdownDropdownHeights.push(dropdownHeightObj);

        // Add 'click' event to itemsWithDropdown:
        let nextSibling = item.nextElementSibling;
        if (nextSibling == null) {
            nextSibling = getParentsNextSiblingRecursively(item);
        }

        item.querySelector(".dropdown-button").addEventListener('click', () => {
            nestedDropdown.classList.toggle('active');

            if (nestedDropdown.classList.contains('active')) {
                // nextSibling.style.marginTop = `${nestedDropdown.clientHeight}px`;
                console.log(nestedDropdown);
                nextSibling.style.marginTop = getDropdownTotalHeightRecursively(nestedDropdown);
            } else {
                nextSibling.style.marginTop = '0';
            }
        });
    }

    function getParentsNextSiblingRecursively(element) {
        var parent = element.parentElement;
        var nextSibling = parent.nextElementSibling;
        if (nextSibling == null)
            return getParentsNextSiblingRecursively(parent);
        else
            return nextSibling;
    }

    function getDropdownTotalHeightRecursively(dropdown) {
        // var parent = item.parentElement;
        //var totalHeight = `${item.querySelector('.nested-dropdown').clientHeight}px`;
        // const parentNestedDropdown = parent.querySelector('.nested-dropdown')
        // if (parentNestedDropdown != null) {
        //     totalHeight += parentNestedDropdown;
        //     totalHeight += getParentsDropdownHeightsRecursively(parent);
        // }
        // else {
        //     return totalHeight;
        // }

        var totalHeight = 0;

        function traverseAndCalculateHeight(dropdown) {
            totalHeight += dropdown.clientHeight;
            var parent = dropdown.closest('.has-dropdown');
            console.log(parent);
            if (parent) {
                var parentActiveDropdowns = [];
                for (let i = 0; i < parent.children.length; i++) {
                    var child = parent.children[i];
                    if (child != dropdown) {
                        if (child.classList.contains('nested-dropdown') && child.classList.contains('active')) {
                            console.log(child);
                            parentActiveDropdowns.push(child);
                        }
                    }
                    else {
                        break;
                    }
                }
                console.log(parentActiveDropdowns.length);

                if (parentActiveDropdowns) {
                    for (let i = 0; i < parentActiveDropdowns.length; i++) {
                        const parentActiveDropdown = parentActiveDropdowns[i];
                        totalHeight += parentActiveDropdown.clientHeight;
                    }
                }

                const parentNestedDropdown = parent.closest('.nested-dropdown');
                if (parentNestedDropdown) {
                    console.log(parentNestedDropdown);
                    traverseAndCalculateHeight(parentNestedDropdown);
                }

            }
        }

        traverseAndCalculateHeight(dropdown);

        return `${totalHeight}px`;
    }
});