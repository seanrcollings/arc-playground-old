<script context="module" lang="ts">
  export interface OutputData {
    stdout: string;
    stderr: string;
    exitCode: number;
    duration: number;
    timeout: boolean;
    oomKilled: boolean;
  }
</script>

<script lang="ts">
  import { slide } from "svelte/transition";
  import Convert from "ansi-to-html";

  export let content: OutputData[];

  const convert = new Convert({
    newline: true,
  });
</script>

{#if content.length > 0}
  <div id="output" transition:slide>
    {#each content as output}
      {#if output.stderr.length > 0}
        <div class="error">
          {@html convert.toHtml(output.stderr.split(" ").join("&nbsp;"))}
        </div>
      {:else}
        <div>
          {@html convert.toHtml(output.stdout.split(" ").join("&nbsp;"))}
        </div>
      {/if}
    {/each}
  </div>
{/if}

<style lang="scss">
  #output {
    margin-top: 20px;
    height: 200px;
    background-color: #333;
    border-radius: 5px;
    border: 1px solid grey;
    padding: 10px;
    overflow-y: auto;
    color: white;
    outline: none;
  }

  .error {
    color: rgb(190, 54, 54);
  }
</style>
