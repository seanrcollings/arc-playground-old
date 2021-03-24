<script lang="typescript">
  import examples from "../../examples";
  import type { Snippet } from "../../examples";
  import Example from "./Example.svelte";
  import { snippet } from "../../stores";
</script>

<div class="examples">
  {#each examples as example}
    {#if example != $snippet}
      <Example on:dragstart on:dragend {example} />
    {/if}
  {/each}
</div>

<style lang="scss">
  .examples {
    padding: 10px;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
</style>
