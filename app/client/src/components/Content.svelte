<script lang="ts">
  import Editor from "./Editor.svelte";
  import Examples from "./Examples.svelte";
  import { fade } from "svelte/transition";

  let dragging = false;
</script>

<div class="content">
  <div class="container">
    <Editor />
    {#if dragging}
      <div class="overlay" transition:fade={{ duration: 300 }}>
        <h2>Drop Example Here</h2>
        <p>Any changes in the buffer will be lost!</p>
      </div>
    {/if}
  </div>
  <Examples
    on:dragstart={() => (dragging = true)}
    on:dragend={() => (dragging = false)}
  />
  <button on:click={() => console.log("hi")}>Send</button>
</div>

<style lang="scss">
  .content {
    width: 70%;
    margin: auto;
    display: flex;
  }

  .container {
    flex: 3;
  }

  .container {
    height: 400px;
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
</style>
