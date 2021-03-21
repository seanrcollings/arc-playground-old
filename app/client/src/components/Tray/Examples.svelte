<script lang="typescript">
  import examples from "../../examples";
  import type { Snippet } from "../../examples";
  import { flip } from "svelte/animate";
  import Example from "./Example.svelte";

  export let selected: Snippet | null = null;
</script>

<div class="examples">
  {#each examples as example}
    {#if example != selected}
      <Example on:dragstart on:dragend {example} />
    {/if}
  {/each}
</div>

<style lang="scss">
  .examples {
    padding: 10px;

    display: flex;
    flex-direction: column;
  }
</style>
