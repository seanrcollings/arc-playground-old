<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
  import { python } from "@codemirror/lang-python";
  import { oneDarkTheme } from "@codemirror/theme-one-dark";

  let editor: HTMLElement;

  let view = new EditorView({
    state: EditorState.create({
      doc: "\n".repeat(20),
      extensions: [basicSetup, python(), oneDarkTheme],
    }),
  });

  onMount(() => {
    editor.appendChild(view.dom);
    console.log(view.state.doc.toString());
  });

  const sendCode = () => {
    const code = view.state.doc.toString();
    axios.post("/api/arc", { code });
  };
</script>

<div>
  <div class="editor" bind:this={editor} />
  <button on:click={sendCode}>Send</button>
</div>

<style lang="scss">
  .editor {
    text-align: left;
  }
</style>
