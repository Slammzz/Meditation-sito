import { createFooter } from './scripts/footer.js';

document.addEventListener('DOMContentLoaded', () => {
    const footer = createFooter();
    document.body.appendChild(footer);
});
