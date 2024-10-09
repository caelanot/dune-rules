<script>
    function toggle() {
        document.documentElement.setAttribute('data-theme', "dark");
        // window.document.body.classList.toggle('dark')
    }
    </script>
    <button on:click={toggle}>
        <slot/>
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