export function createFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div>
            <p>&copy; 2024 My Website. All rights reserved.</p>
            <nav>
                <a href="about.html">About</a> |
                <a href="contact.html">Contact</a> |
                <a href="privacy.html">Privacy Policy</a>
            </nav>
        </div>
    `;
    return footer;
}
