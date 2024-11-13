import { browser } from '$app/environment';

function createTheme() {
    let currentTheme = "auto";
    if (browser) {
        currentTheme = localStorage.getItem('theme-preference') || 'auto';
    }

    let theme = $state(currentTheme);

    return {
        get theme() { return theme },
        set theme(value: string) {
            theme = value;
            if (browser) {
                localStorage.setItem('theme-preference', theme);
                document.documentElement.setAttribute('data-theme', theme);
            }
        }
    }

}

export const theme = createTheme();