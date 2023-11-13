document.addEventListener('DOMContentLoaded', () => {
    // Burger menu toggle:
    const burgerMenuIcon = document.getElementById('burgerMenuIcon');
    const sideNavbar = document.getElementById('sideNavbar');
    const contentContainer = document.getElementById('contentContainer');

    burgerMenuIcon.addEventListener('click', () => {
        sideNavbar.classList.toggle('active');
        contentContainer.classList.toggle('side-navbar-active');
    });

    // Table of contents custom hover and touch events for the buttons' highlights:
    const tableOfContents = document.getElementById('tableOfContents');
    const tableOfContentsButtons = tableOfContents.querySelectorAll('button');

    tableOfContentsButtons.forEach(button => {
        let previousBackgroundColor;
        let activeTouchPoints = 0;

        button.addEventListener('mouseover', () => {
            previousBackgroundColor = button.style.backgroundColor;
            button.style.backgroundColor = 'rgba(0, 0, 124, 0.1)';
        });

        button.addEventListener('mouseout', () => button.style.backgroundColor = previousBackgroundColor);

        button.addEventListener('touchstart', event => {
            event.preventDefault();
            activeTouchPoints++;

            if (activeTouchPoints === 1) {
                previousBackgroundColor = button.style.backgroundColor;
                button.style.backgroundColor = 'rgba(0, 0, 124, 0.1)';
            }

            // the event.preventDefault() prevents the click event so we invoke it manually:
            button.click();
        });

        button.addEventListener('touchend', () => {
            activeTouchPoints--;

            if (activeTouchPoints === 0)
                button.style.backgroundColor = previousBackgroundColor;
        });
    });

    // Table of contents allowing scroll over buttons on touch devices (scrolling manually):
    let touchStartY;
    let tableOfContentsScrollTopStartPos;

    tableOfContents.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
        tableOfContentsScrollTopStartPos = tableOfContents.scrollTop;
    });

    tableOfContents.addEventListener('touchmove', (event) => {
        let deltaY = event.touches[0].clientY - touchStartY;

        tableOfContents.scrollTop = tableOfContentsScrollTopStartPos - deltaY;

        if (Math.abs(deltaY) > 10) {
            for (let i = 0; i < tableOfContentsButtons.length; i++) {
                tableOfContentsButtons[i].clickCanceled = true;
            }
        }
    });

    tableOfContents.addEventListener('touchend', () => {
        for (let i = 0; i < tableOfContentsButtons.length; i++) {
            tableOfContentsButtons[i].clickCanceled = false;
        }
    });

    // Table of contents button paddings:
    function tableOfContentsApplyPadding() {
        let regularPadding = 2;
        let baseIndentPadding = 5;

        // Different paddings for different versions of the layout:
        if (window.innerWidth < 768) {
            baseIndentPadding = 3;
        }

        tableOfContentsButtons.forEach(button => {
            // Traverse up the DOM tree until there is no parent node:
            let currentNode = button;
            let depth = 0;

            while (currentNode.parentNode !== null && currentNode.parentNode !== tableOfContents) {
                currentNode = currentNode.parentNode;
                depth++;
            }

            // Apply padding left (indents):
            let indent = (depth - 2) / 2;
            if (indent === 0) {
                button.style.paddingLeft = regularPadding + 'px';
            }
            else {
                button.style.paddingLeft = indent * baseIndentPadding + 'px';
            }

            // let p = button.querySelector('p');
            // let text = p === null ? button.innerHTML : p.innerHTML;
            // console.log(text + " Padding: " + button.style.paddingLeft);

            // Apply padding right:
            let p = button.querySelector('p');
            p === null ? button.style.paddingRight = regularPadding + 'px' : p.style.paddingRight = regularPadding + 'px';
        });
    }

    tableOfContentsApplyPadding();
    window.addEventListener('resize', tableOfContentsApplyPadding);

    // Table of contents dropdowns:
    const tableOfContentsDropdowns = tableOfContents.querySelectorAll('.dropdown');

    tableOfContentsDropdowns.forEach(dropdown => {
        const nestedDropdown = dropdown.querySelector('.nested-dropdown');
        const dropdownButton = dropdown.querySelector('.dropdown-button');

        const icon = dropdownButton.querySelector('.icon-arrow');
        const iconInactivePath = 'Assets/Icons/arrow-thin-right.png';
        const iconActivePath = 'Assets/Icons/arrow-thin-up.png';

        let activeTouchPoints = 0;

        function toggleDropdown() {
            if (dropdownButton.clickCanceled)
                return;

            dropdownButton.classList.toggle('active');

            if (dropdownButton.classList.contains('active')) {
                icon.src = iconActivePath;
                icon.alt = 'Arrow up icon';

                nestedDropdown.classList.add('active');
            }
            else {
                icon.src = iconInactivePath;
                icon.alt = 'Arrow right icon';

                nestedDropdown.classList.remove('active');
            }
        }

        dropdownButton.addEventListener('mouseup', toggleDropdown);

        dropdownButton.addEventListener('touchstart', () => activeTouchPoints++);

        dropdownButton.addEventListener('touchend', () => {
            if (activeTouchPoints === 0)
                toggleDropdown();
        });
    });
});