<script lang="ts">
  import Content from "./Content.svelte";
  import Header from "./Header.svelte";
</script>

<main>
  <Header />
  <Content />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    /* max-width: 240px; */
    margin: 0 auto;
  }
</style>
