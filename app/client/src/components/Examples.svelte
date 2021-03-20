<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { spring } from "svelte/motion";

  import examples from "../examples";
  import pannable from "../pannable";

  const dispatch = createEventDispatcher();

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
    coords.update($coords => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy,
    }));
  }

  function handlePanEnd(event: CustomEvent) {
    coords.stiffness = 0.2;
    coords.damping = 0.4;
    coords.set({ x: 0, y: 0 });
    dispatch("dragend", {});
  }
</script>

<div class="examples">
  {#each Object.entries(examples) as [_, example]}
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
  {/each}
</div>

<style lang="scss">
  .examples {
    flex: 1;
    padding: 10px;

    .example {
      background-color: #333;
      padding: 5px 8px;
      height: 75px;
      border-radius: 10px;
      border: 1px solid gray;
      overflow: hidden;
      z-index: 11;

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
  }
</style>
