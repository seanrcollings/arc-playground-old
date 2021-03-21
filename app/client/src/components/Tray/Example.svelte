<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { spring } from "svelte/motion";
  import pannable from "../../pannable";
  import type { Snippet } from "../../examples";

  export let example: Snippet;

  const dispatch = createEventDispatcher();
  const mouseCoords = { x: 0, y: 0 };

  const coords = spring(
    { x: 0, y: 0 },
    {
      stiffness: 1,
      damping: 1,
    }
  );

  function handlePanStart() {
    dispatch("dragstart", {});
    // coords.stiffness = coords.damping = 1;
  }

  function handlePanMove(event: CustomEvent) {
    mouseCoords.x = event.detail.x;
    mouseCoords.y = event.detail.y;
    coords.update($coords => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy,
    }));
  }

  function handlePanEnd(event: CustomEvent) {
    coords.stiffness = 0.2;
    coords.damping = 0.4;
    coords.set({ x: 0, y: 0 });
    dispatch("dragend", {
      x: mouseCoords.x,
      y: mouseCoords.y,
      example,
    });
  }
</script>

<div
  class="example"
  use:pannable
  on:panstart={handlePanStart}
  on:panmove={handlePanMove}
  on:panend={handlePanEnd}
  style="transform: translate({$coords.x}px,{$coords.y}px)"
>
  <h3>{example.name}</h3>
  <p>{example.desc}</p>
</div>

<style lang="scss">
  .example {
    background-color: #333;
    padding: 5px 8px;
    min-height: 75px;
    max-height: 75px;
    border-radius: 10px;
    border: 1px solid gray;
    overflow: hidden;
    z-index: 11;
    margin: 5px 0px;

    h3 {
      font-size: 25px;
      margin: 0px;
      user-select: none;
    }

    p {
      margin: 5px 0px;
      user-select: none;
    }
  }
</style>
