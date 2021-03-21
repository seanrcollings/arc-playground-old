<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
  import { python } from "@codemirror/lang-python";
  import { oneDarkTheme } from "@codemirror/theme-one-dark";
  import type { Snippet } from "../examples";

  export let content: Snippet;

  let editor: HTMLElement;

  let view = new EditorView({
    state: EditorState.create({
      doc: content ? content.code : "test",
      extensions: [basicSetup, python(), oneDarkTheme],
    }),
  });

  onMount(() => {
    editor.appendChild(view.dom);
    editor.addEventListener(
      "keydown",
      () =>
        (content = {
          ...content,
          code: view.state.doc.toString(),
        })
    );
  });

  afterUpdate(() => {
    // Inserts in the new chosen example's code
    // Also gets called whenever you type anything
    // into the field
    view.dispatch(
      view.state.update({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: content ? content.code : "",
        },
        // Place the transition back in,
        // so we aren't moved around when we type
        selection: view.state.selection,
      })
    );
  });
</script>

<div class="editor" bind:this={editor} />

<style lang="scss">
  .editor {
    flex: 3;
    text-align: left;

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  :global(.cm-wrap) {
    min-height: 500px;
    max-height: 500px;
  }
</style>
