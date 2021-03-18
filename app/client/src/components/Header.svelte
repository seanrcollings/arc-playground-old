<script lang="ts">
  const text = ["A", "Regular", "CLI"];
  let hovered: number | null = null;

  $: console.log(hovered);
</script>

<h1>
  {#each text as word, i}
    <span
      class:selected={hovered === i}
      on:mouseover={() => (hovered = i)}
      on:mouseout={() => (hovered = null)}
    >
      {word[0]}
    </span>
  {/each}
</h1>
<div class="full-name">
  <span class="bullet">&bull;</span>
  {#each text as word, i}
    <span class:selected={hovered === i}>{word}</span>
    <span class="bullet">&bull;</span>
  {/each}
</div>

<style lang="scss">
  h1 {
    text-transform: uppercase;
    margin: 10px 0px;
    font-size: 5em;
    font-weight: bold;

    span {
      color: #ff3e00;
      transition: color 0.3s ease;
    }

    span.selected {
      color: var(--main-text-color);
    }

    &:hover {
      cursor: pointer;
    }
  }

  .full-name {
    display: flex;
    justify-content: center;
    span {
      display: block;
      font-size: 2em;

      &.selected {
        color: #ff3e00;
        animation: float 6s ease-in-out infinite;
      }
    }

    .bullet {
      padding: 0px 6px;
    }
  }

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    25% {
      transform: translatey(-10px);
    }
    75% {
      transform: translatey(10px);
    }
    100% {
      transform: translatey(0px);
    }
  }
</style>
