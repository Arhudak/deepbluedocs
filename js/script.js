// Function to load components into the specified elements
function loadComponent(componentPath, componentSelector) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            const element = document.querySelector(componentSelector);
            if (element) {
                element.innerHTML = data;
            } else {
                console.log(`Element not found for selector: ${componentSelector}`);
            }
        })
        .catch(error => console.error(`Error loading component from ${componentPath}:`, error));
}

document.addEventListener("DOMContentLoaded", function () {
    // Load header and footer components
    loadComponent('components/header.html', 'header');
    loadComponent('components/footer.html', 'footer');

    // Load the sidebar
    loadComponent('components/nav.html', '.sidebar-container');

    const menuButton = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });
    } else {
        console.log('Menu button or navigation links not found.');
    }
});

// Move link highlighting and sidebar enhancements to a separate function
function enhanceSidebar() {
    const currentLocation = window.location.href;

    // Highlight current page link
    document.querySelectorAll('.sidebar a').forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });

    // Dynamically add links based on h2 headings on the page
    const headings = document.querySelectorAll('.content h2');
    const currentPageLinks = document.createElement('ul');

    headings.forEach(heading => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        listItem.appendChild(link);
        currentPageLinks.appendChild(listItem);
    });

    // Append the newly created list below the active link in the sidebar
    const activeLink = document.querySelector('.sidebar a.active');
    if (activeLink && currentPageLinks.childElementCount > 0) {
        activeLink.parentElement.appendChild(currentPageLinks);
    }
}

// Ensure enhancements are applied after loading the components
setTimeout(enhanceSidebar, 300); // Adjust delay as necessary