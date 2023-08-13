<script lang="ts">
    import Main from "./components/installer/Main.svelte";
</script>

<main>
    <h2>Vencord Installer</h2>
    <Main />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    h2 {
        color: var(--accent-purple);
    }
</style>
