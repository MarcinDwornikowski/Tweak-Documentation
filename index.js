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
    var nestedDropdownsAndTheirSiblings = [];

    // Stop event propagation (childs calling the event on parents):
    items.forEach(item => {
        item.addEventListener("click", (event) => {
            event.stopPropagation();
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

        var nextSibling = item.nextElementSibling;
        let siblingLevelObj = {
            //SiblingLevel: 0
            SiblingLevel: []
        }
        var siblings = [];
        if (nextSibling != null) {
            siblings.push(nextSibling);
            siblingLevelObj.SiblingLevel.push(0);
            var addToSiblings = getParentsNextSiblingRecursively(item, siblingLevelObj);
            console.log('Add to siblings:');
            console.log(addToSiblings);
            for (let i = 0; i < addToSiblings.length; i++) {
                const current = addToSiblings[i];
                siblings.push(current);
            }
        }
        else {
            // siblingLevelObj.SiblingLevel++;
            // nextSibling = getParentsNextSiblingRecursively(item, siblingLevelObj);
            siblings = getParentsNextSiblingRecursively(item, siblingLevelObj);
        }

        const dropdownSiblingObj = {
            NestedDropdown: nestedDropdown,
            // Sibling: nextSibling,
            Sibling: siblings,
            SiblingLevel: siblingLevelObj.SiblingLevel
        };
        console.log('Adding nested d:');
        console.log(nestedDropdown);
        console.log('Siblings:');
        console.log(siblings);
        console.log(siblingLevelObj.SiblingLevel);
        nestedDropdownsAndTheirSiblings.push(dropdownSiblingObj);


        // Add 'click' event to itemsWithDropdown:
        item.querySelector(".dropdown-button").addEventListener('click', () => {
            nestedDropdown.classList.toggle('active');

            // if (nestedDropdown.classList.contains('active')) {
            //     // nextSibling.style.marginTop = `${nestedDropdown.clientHeight}px`;
            //     console.log(nestedDropdown);
            //     nextSibling.style.marginTop = getDropdownTotalHeightRecursively(nestedDropdown);
            // } else {
            //     nextSibling.style.marginTop = '0';
            // }

            calculateDropdownHeights();
        });
    }

    // function getParentsNextSiblingRecursively(element) {
    //     var parent = element.parentElement;
    //     var nextSibling = parent.nextElementSibling;
    //     if (nextSibling == null) {
    //         return getParentsNextSiblingRecursively(parent);
    //     }
    //     else {
    //         return nextSibling;
    //     }
    // }

    function getParentsNextSiblingRecursively(element, siblingLevelObj) {
        // siblingLevelObj.SiblingLevel++;

        var siblings = [];
        var currentSiblingLevel = 0;

        // var parent = [];
        var currentParent = element.parentElement;
        while (currentParent != document.getElementById("tableOfContents")) {
            // parent.push(currentParent);
            currentSiblingLevel++;

            var currentSibling = null;
            if (currentParent != null) {
                currentSibling = currentParent.nextElementSibling;
            }

            if (currentSibling != null) {
                siblings.push(currentSibling);
                siblingLevelObj.SiblingLevel.push(currentSiblingLevel);
            }

            currentParent = currentParent.parentElement;
        }
        return siblings;

        // var parent = element.closest('.has-dropdown');
        // console.log(element);
        // console.log(parent);

        // var nextSibling = parent.nextElementSibling;
        // if (nextSibling == null) {
        //     return getParentsNextSiblingRecursively(parent, siblingLevelObj);
        // }
        // else {
        //     return nextSibling;
        // }
    }

    // function calculateDropdownHeights(itemWithDropdown, nextSibling) {
    //     const activeNestedDropdowns = itemWithDropdown.querySelectorAll('.nested-dropdown.active');
    //     const lastActiveDropdown = activeNestedDropdowns[activeNestedDropdowns.length - 1];
    //     const recursiveHeight = getDropdownTotalHeightRecursively(dropdown.NestedDropdown);

    //     let nextSibling = lastActiveDropdown.nextElementSibling;
    //     if (nextSibling == null) {
    //         nextSibling = getParentsNextSiblingRecursively(item);
    //     }

    //     dropdown.Sibling.style.marginTop = recursiveHeight;

    // }

    function calculateDropdownHeights() {
        var siblingMargins = [];
        nestedDropdownsAndTheirSiblings.forEach(dropdown => {
            console.log('Dropdown:');
            console.log(dropdown.NestedDropdown);
            console.log('Sibling lenght:');
            console.log(dropdown.Sibling.length);
            for (let i = 0; i < dropdown.Sibling.length; i++) {
                const currentSibling = dropdown.Sibling[i];

                var siblingMarginSet = false;
                for (let i = 0; i < siblingMargins.length; i++) {
                    if (siblingMargins[i].Sibling == currentSibling) {
                        siblingMarginSet = true;
                    }
                }

                if (dropdown.NestedDropdown.classList.contains('active')) {
                    const recursiveHeight = getDropdownTotalHeightRecursively(dropdown.NestedDropdown, dropdown.SiblingLevel[i]);
                    // dropdown.Sibling.style.marginTop = recursiveHeight;
                    if (!siblingMarginSet) {
                        currentSibling.style.marginTop = recursiveHeight;
                        const siblingMarginObj = {
                            Sibling: currentSibling,
                            Margin: currentSibling.style.marginTop
                        };
                        siblingMargins.push(siblingMarginObj);
                    }
                    else {
                        if (recursiveHeight > currentSibling.style.marginTop) {
                            currentSibling.style.marginTop = recursiveHeight;
                        }
                    }
                    console.log('Active, Sibling:');
                    console.log(currentSibling);
                    console.log('Margin:');
                    console.log(currentSibling.style.marginTop);
                }
                else {
                    if (!siblingMarginSet) {
                        currentSibling.style.marginTop = '0';
                        console.log('Not active, Sibling:');
                        console.log(currentSibling);
                        console.log('Margin:');
                        console.log(currentSibling.style.marginTop);
                    }
                }
            }
        });
    }

    // function getDropdownTotalHeightRecursively(dropdown, sibling) {
    //     // var parent = item.parentElement;
    //     //var totalHeight = `${item.querySelector('.nested-dropdown').clientHeight}px`;
    //     // const parentNestedDropdown = parent.querySelector('.nested-dropdown')
    //     // if (parentNestedDropdown != null) {
    //     //     totalHeight += parentNestedDropdown;
    //     //     totalHeight += getParentsDropdownHeightsRecursively(parent);
    //     // }
    //     // else {
    //     //     return totalHeight;
    //     // }

    //     var totalHeight = 0;

    //     function traverseAndCalculateHeight(dropdown, depth) {
    //         totalHeight += dropdown.clientHeight;
    //         var parent = dropdown.closest('.has-dropdown');
    //         // console.log(parent);
    //         if (parent) {
    //             var parentActiveDropdowns = [];
    //             for (let i = 0; i < parent.children.length; i++) {
    //                 var child = parent.children[i];
    //                 if (child != dropdown) {
    //                     if (child.classList.contains('nested-dropdown') && child.classList.contains('active')) {
    //                         // console.log(child);
    //                         parentActiveDropdowns.push(child);
    //                     }
    //                 }
    //                 else {
    //                     break;
    //                 }
    //             }
    //             // console.log(parentActiveDropdowns.length);

    //             if (parentActiveDropdowns) {
    //                 for (let i = 0; i < parentActiveDropdowns.length; i++) {
    //                     const parentActiveDropdown = parentActiveDropdowns[i];
    //                     totalHeight += parentActiveDropdown.clientHeight;
    //                 }
    //             }

    //             const parentNestedDropdown = parent.closest('.nested-dropdown');
    //             if (parent.nextElementSibling != && parentNestedDropdown) {
    //                 // console.log(parentNestedDropdown);
    //                 traverseAndCalculateHeight(parentNestedDropdown);
    //             }

    //         }
    //     }

    //     traverseAndCalculateHeight(dropdown, depth);

    //     return `${totalHeight}px`;
    // }

    function getDropdownTotalHeightRecursively(dropdown, depth) {
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
        var currentDepth = 0;

        function traverseAndCalculateHeight(dropdown, depth) {
            currentDepth++;
            totalHeight += dropdown.clientHeight;
            var parent = dropdown.closest('.has-dropdown');
            // console.log(parent);
            if (parent) {
                var parentActiveDropdowns = [];
                for (let i = 0; i < parent.children.length; i++) {
                    var child = parent.children[i];
                    if (child != dropdown) {
                        if (child.classList.contains('nested-dropdown') && child.classList.contains('active')) {
                            // console.log(child);
                            parentActiveDropdowns.push(child);
                        }
                    }
                    else {
                        break;
                    }
                }
                // console.log(parentActiveDropdowns.length);

                if (parentActiveDropdowns) {
                    for (let i = 0; i < parentActiveDropdowns.length; i++) {
                        const parentActiveDropdown = parentActiveDropdowns[i];
                        totalHeight += parentActiveDropdown.clientHeight;
                    }
                }

                const parentNestedDropdown = parent.closest('.nested-dropdown');
                if (currentDepth < depth && parentNestedDropdown) {
                    // console.log(parentNestedDropdown);
                    traverseAndCalculateHeight(parentNestedDropdown, depth);
                }

            }
        }

        traverseAndCalculateHeight(dropdown, depth);

        return `${totalHeight}px`;
    }

    function getDropdownTotalHeightRecursively2(dropdown) {
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
            // console.log(parent);
            if (parent) {
                var parentActiveDropdowns = [];
                for (let i = 0; i < parent.children.length; i++) {
                    var child = parent.children[i];
                    if (child != dropdown) {
                        if (child.classList.contains('nested-dropdown') && child.classList.contains('active')) {
                            // console.log(child);
                            parentActiveDropdowns.push(child);
                        }
                    }
                    else {
                        break;
                    }
                }
                // console.log(parentActiveDropdowns.length);

                if (parentActiveDropdowns) {
                    for (let i = 0; i < parentActiveDropdowns.length; i++) {
                        const parentActiveDropdown = parentActiveDropdowns[i];
                        totalHeight += parentActiveDropdown.clientHeight;
                    }
                }

                const parentNestedDropdown = parent.closest('.nested-dropdown');
                if (parentNestedDropdown) {
                    // console.log(parentNestedDropdown);
                    traverseAndCalculateHeight(parentNestedDropdown);
                }

            }
        }

        traverseAndCalculateHeight(dropdown);

        return `${totalHeight}px`;
    }
});