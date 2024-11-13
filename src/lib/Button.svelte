<script lang="ts">
  import { theme } from '$lib/runes/theme.svelte';

  function toggle() {
    if (theme.theme == 'light') theme.theme = 'dark';
    else theme.theme = 'light';
  }
</script>

<button onclick={toggle}> Dark Theme </button>

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
