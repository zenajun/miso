// Side panel for switching between Miso apps.
// Plain DOM code (no React) so every app can use it, including vanilla Fetch Lab.
// Usage: `import 'app-nav'` once in an app's entry file.
import {apps} from './apps.js';
import './style.css';

const links = [{name: 'Home', emoji: '🏠', path: `${import.meta.env.BASE_URL}home/`}, ...apps];

// Remember open/closed across page loads. Every app shares one origin, so they share
// this storage. try/catch because storage can be blocked (e.g. some private windows).
const STORAGE_KEY = 'miso-nav-open';

function loadOpen() {
    try {
        return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
}

function saveOpen(open) {
    try {
        localStorage.setItem(STORAGE_KEY, String(open));
    } catch {
        // Not saved; the panel still works for this page.
    }
}

function isCurrent(path) {
    return window.location.pathname.startsWith(path);
}

function createNav() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'miso-nav-toggle';
    button.setAttribute('aria-label', 'Open app menu');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'miso-nav-panel');
    // Chevron pointing right (">"). CSS rotates it to point left when the panel is open.
    button.innerHTML =
        '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

    const panel = document.createElement('nav');
    panel.id = 'miso-nav-panel';
    panel.className = 'miso-nav-panel';
    panel.setAttribute('aria-label', 'Apps');

    const title = document.createElement('p');
    title.className = 'miso-nav-title';
    title.textContent = 'Miso';
    panel.append(title);

    const list = document.createElement('ul');
    for (const link of links) {
        const item = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.path;
        a.title = link.name; // tooltip when only the icon shows
        const icon = document.createElement('span');
        icon.className = 'miso-nav-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = link.emoji;
        // The name stays in the DOM when collapsed (just clipped), so screen readers still read it.
        const label = document.createElement('span');
        label.className = 'miso-nav-label';
        label.textContent = link.name;
        a.append(icon, label);
        if (isCurrent(link.path)) a.setAttribute('aria-current', 'page');
        item.append(a);
        list.append(item);
    }
    panel.append(list);

    function setOpen(open) {
        document.documentElement.classList.toggle('miso-nav-open', open);
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-label', open ? 'Close app menu' : 'Open app menu');
        saveOpen(open);
    }

    button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        setOpen(open);
        if (open) panel.querySelector('a').focus();
    });
    // Esc closes only when you're in the panel, so it can't steal Esc from the app.
    panel.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setOpen(false);
            button.focus();
        }
    });

    document.body.append(button, panel);

    // Restore last state. Skip the slide-in so it doesn't animate on every page load.
    if (loadOpen()) {
        document.documentElement.classList.add('miso-nav-no-anim');
        setOpen(true);
        requestAnimationFrame(() =>
            requestAnimationFrame(() => document.documentElement.classList.remove('miso-nav-no-anim')),
        );
    }
}

createNav();
