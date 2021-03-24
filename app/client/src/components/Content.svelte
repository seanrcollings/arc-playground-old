<script lang="typescript">
  import { afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import axios from "axios";
  import Editor from "./Editor.svelte";
  import Output from "./Output.svelte";
  import type { OutputData } from "./Output.svelte";
  import Tray from "./Tray/Tray.svelte";
  import type { Snippet } from "../examples";
  import { snippet } from "../stores";

  /* State */
  let dragging = false;
  let output: OutputData[] = [];
  let editorContainer: HTMLElement;
  let loading: boolean = false;

  /* Life Cycle */
  afterUpdate(() => {
    const href = window.location.href;
    if (output.length != 0 && !href.endsWith("#output")) {
      window.location.href = `${window.location.href}#output`;
    }
  });

  /* Helpers */
  const sendSnippet = (snippet: Snippet) => {
    loading = true;
    axios
      .post<OutputData>("/api/arc/run", { snippet })
      .then(res => {
        output = [...output, res.data];
        loading = false;
      });
  };

  const handleDragEnd = (event: CustomEvent) => {
    dragging = false;
    const { x, y, example } = event.detail;
    const containerRect = editorContainer.getBoundingClientRect();
    if (
      y > containerRect.top &&
      y < containerRect.bottom &&
      x > containerRect.left &&
      x < containerRect.right
    ) {
      $snippet = example;
    }
  };
</script>

<div class="content">
  <div class="editor-container">
    <div class="overlay-container" bind:this={editorContainer}>
      <Editor />
      {#if dragging}
        <div class="overlay" transition:fade={{ duration: 300 }}>
          <h2>Drop Example Here</h2>
          <p>Any changes in the buffer will be lost!</p>
        </div>
      {/if}
    </div>

    <Tray on:dragstart={() => (dragging = true)} on:dragend={handleDragEnd} />
  </div>

  <div class="command">
    <label for="command-input">
      <span>$</span>
      <input
        id="command-input"
        type="text"
        placeholder="Command to Execute"
        bind:value={$snippet.command}
      />
    </label>
    <button disabled={loading} on:click={() => sendSnippet($snippet)}>
      {#if loading}
        Loading...
      {:else}
        Execute
        <i class="material-icons">arrow_right_alt</i>
      {/if}
    </button>
  </div>
  <Output content={output} />
</div>

<style lang="scss">
  .content {
    width: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  .editor-container {
    display: flex;
    height: 500px;
  }

  .overlay-container {
    flex: 3;
    display: flex;
    flex-direction: column;
    height: 500px;
    position: relative;

    .overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #0000009c;

      h2,
      p {
        margin: 0px;
      }
    }
  }

  .command {
    display: flex;
    margin-top: 20px;
    background-color: #333;
    border: 1px solid gray;
    border-radius: 5px;

    label {
      flex: 2;
      padding: 10px;

      span {
        color: grey;
      }

      input {
        background-color: transparent;
        border: 1px solid transparent;
        color: white;

        &:focus {
          outline: none;
        }
      }
    }

    button {
      background-color: rgb(37, 36, 36);
      border: 1px solid transparent;
      border-left: 1px solid gray;
      color: white;
      border-radius: 0px 5px 5px 0px;
      width: 150px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;

      &:hover {
        cursor: pointer;
        background-color: rgb(24, 22, 22);
      }
    }
  }
</style>
