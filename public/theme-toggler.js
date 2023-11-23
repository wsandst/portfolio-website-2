// Applies theme class to :root css element, which decides various colors

function getTheme() {
    // Attempt to get the preferred theme from local storage
    let storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
        return storedTheme;
    }
    // If nothing is set, get system dark/light preference
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark-theme' : 'light-theme';
}

const theme = getTheme();
document.documentElement.classList.add(theme);
