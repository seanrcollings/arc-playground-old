<script lang="ts">
  import { slide } from "svelte/transition";

  export let content: string | null;
</script>

{#if content}
  <textarea id="output" readonly transition:slide>
    {content}
  </textarea>
{/if}

<style lang="scss">
  textarea {
    margin-top: 20px;
    min-height: 200px;
    max-height: 400px;
    background-color: #333;
    border-radius: 5px;
    border: 1px solid grey;
    padding: 10px;
    overflow-y: auto;
    color: white;
    outline: none;
  }
</style>
