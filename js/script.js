document.addEventListener("DOMContentLoaded", function () {
    // Load the sidebar
    fetch('components/nav.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.sidebar-container').innerHTML = data;
            const currentLocation = window.location.href;

            // Highlight current page link
            document.querySelectorAll('.sidebar a').forEach(link => {
                if (link.href === currentLocation) {
                    link.classList.add('active');
                }
            });

            // Dynamically add links based on h2 headings on the page
            const headings = document.querySelectorAll('.content h2');
            const currentPageLinks = document.createElement('ul'); // List for sub-links

            headings.forEach(heading => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `#${heading.id}`; // Anchor link to h2
                link.textContent = heading.textContent; // Heading text as link text
                listItem.appendChild(link);
                currentPageLinks.appendChild(listItem);
            });

            // Append newly created list below the active link in the sidebar
            const activeLink = document.querySelector('.sidebar a.active');
            if (activeLink && currentPageLinks.childElementCount > 0) {
                activeLink.parentElement.appendChild(currentPageLinks);
            }
        })
        .catch(error => console.error('Error loading sidebar:', error));
});