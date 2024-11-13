<script lang="ts">
  import { theme } from '$lib/runes/theme.svelte';

  function toggle() {
    var ct = theme.theme;
    if (ct == 'light') theme.theme = 'dark';
    else if (theme.theme == 'dark') theme.theme = 'auto';
    else theme.theme = 'light';
  }
</script>

<button onclick={toggle}>
Dark Theme
</button>

<style>
  button {
    background-color: #f76027;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem;
    text-transform: uppercase;
  }
</style>
