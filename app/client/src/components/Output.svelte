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

<script lang="typescript">
  import { slide } from "svelte/transition";
  import Convert from "ansi-to-html";

  export let content: OutputData[];

  const convert = new Convert({
    newline: true,
  });

  const renderData = (data: string) => {
    return convert.toHtml(
      data
        .replaceAll(" ", "&nbsp;")
        .replaceAll(">", "&gt;")
        .replaceAll("<", "&lt;")
    );
  };

  const renderTime = (time: number) => {
    if (time >= 1) {
      // Round to two decimal places for seconds
      return `${Math.round(time * 100) / 100}s`;
    } else {
      return `${Math.floor(time * 1000)}ms`;
    }
  };
</script>

{#if content.length > 0}
  <div id="output" transition:slide>
    {#each content as output}
      <div class="output-item" transition:slide>
        <div>
          {#if output.stdout.length > 0}
            <div class="stdout">
              {@html renderData(output.stdout)}
            </div>
          {/if}
          {#if output.stderr.length > 0}
            <div class="stderr">
              {@html renderData(output.stderr)}
            </div>
          {/if}
        </div>
        <div class="info">({renderTime(output.duration)})</div>
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
  #output {
    margin-top: 20px;
    height: 200px;
    background-color: #222;
    border-radius: 5px;
    border: 1px solid grey;
    padding: 10px;
    overflow-y: auto;
    color: white;
    outline: none;
  }

  .output-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3px;

    .stderr {
      color: rgb(190, 54, 54);
    }

    .info {
      color: grey;
    }
  }
</style>
