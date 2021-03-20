<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
  import { python } from "@codemirror/lang-python";
  import { oneDarkTheme } from "@codemirror/theme-one-dark";

  export let selected = "";

  let editor: HTMLElement;

  let view = new EditorView({
    state: EditorState.create({
      doc: selected,
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

<div class="editor" bind:this={editor} />

<style lang="scss">
  .editor {
    text-align: left;

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  :global(.cm-wrap) {
    min-height: 400px;
    max-height: 400px;
  }
</style>
