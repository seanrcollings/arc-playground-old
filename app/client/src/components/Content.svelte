<script lang="typescript">
  import { afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import axios from "axios";
  import Editor from "./Editor.svelte";
  import Examples from "./Examples.svelte";
  import Output from "./Output.svelte";
  import type { Snippet } from "../examples";
  import { basicExample } from "../examples";

  let dragging = false;
  let selected: Snippet = basicExample;
  let output: string = "";

  let editorContainer: HTMLElement;

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
      selected = example;
    }
  };

  const sendSnippet = (snippet: Snippet) => {
    axios
      .post<{ output: string }>("/api/arc", { snippet })
      .then(res => (output += res.data.output));
  };

  afterUpdate(() => {
    const href = window.location.href;
    if (output.length != 0 && !href.endsWith("#output")) {
      window.location.href = `${window.location.href}#output`;
    }
  });
</script>

<div class="content">
  <div class="wrapper-left">
    <div class="container" bind:this={editorContainer}>
      <Editor bind:content={selected} />
      {#if dragging}
        <div class="overlay" transition:fade={{ duration: 300 }}>
          <h2>Drop Example Here</h2>
          <p>Any changes in the buffer will be lost!</p>
        </div>
      {/if}
    </div>
    <div class="command">
      <label for="command-input">
        $
        <input
          id="command-input"
          type="text"
          placeholder="Command to Execute"
          bind:value={selected.command}
        />
      </label>
      <button on:click={() => sendSnippet(selected)}>
        Execute
        <i class="material-icons">arrow_right_alt</i>
      </button>
    </div>
    <Output content={output} />
  </div>
  <Examples
    on:dragstart={() => (dragging = true)}
    on:dragend={handleDragEnd}
    {selected}
  />
</div>

<style lang="scss">
  .content {
    width: 70%;
    margin: auto;
    display: flex;
  }

  .wrapper-left {
    flex: 3;

    display: flex;
    flex-direction: column;
  }

  .container {
    height: 500px;
    position: relative;
  }

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

    h2,
    p {
      margin: 0px;
    }
  }

  .overlay {
    background-color: #0000009c;
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
