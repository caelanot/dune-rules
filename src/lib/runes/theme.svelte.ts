import { browser } from '$app/environment';
import { onMount } from 'svelte';

function createTheme() {
    let currentTheme = "auto";
    if (browser) {
        currentTheme = localStorage.getItem('theme-preference') || 'auto';
    }

    let theme = $state(currentTheme);

    return {
        get theme() { return theme },
        set theme(value: string) {
            if (browser) {
                localStorage.setItem('theme-preference', theme);
                document.documentElement.setAttribute('data-theme', theme)
            }
            theme = value;
        }
    }

}

export const theme = createTheme();