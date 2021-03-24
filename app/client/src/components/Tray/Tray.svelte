<script lang="ts">
  import Examples from "./Examples.svelte";
  import { tweened } from "svelte/motion";
  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Settings from "./Settings.svelte";

  enum Menu {
    Examples = "Examples",
    Settings = "Settings",
    Closed = "Closed",
  }

  let menuState: Menu = Menu.Closed;

  const width = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  const handleClick = (newMenuState: Menu) => {
    if (menuState === newMenuState) {
      menuState = Menu.Closed;
      width.set(0);
    } else {
      menuState = newMenuState;
      width.set(300);
    }
  };
</script>

<div class="tray">
  <div class="tray-bar">
    <button
      class:selected={menuState === Menu.Examples}
      on:click={() => handleClick(Menu.Examples)}
    >
      <i class="material-icons"> article </i>
    </button>
    <button
      class:selected={menuState === Menu.Settings}
      on:click={() => handleClick(Menu.Settings)}
    >
      <i class="material-icons"> settings </i>
    </button>
  </div>

  <div class="tray-content" style={`width: ${$width}px`}>
    {#if menuState == Menu.Examples}
      <div transition:slide class="tab">
        <h3>Examples</h3>
        <Examples on:dragstart on:dragend />
        <span class="info">Drag Example over Editor</span>
      </div>
    {:else if menuState == Menu.Settings}
      <div transition:slide class="tab">
        <h3>Settings</h3>
        <Settings />
        <span class="info">Settings written to the CLI's config file</span>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .tray {
    display: flex;
    flex: 0;
    background-color: white;
    border-radius: 0px 5px 5px 0px;
    box-shadow: inset 30px -4px 24px -30px rgba(0, 0, 0, 0.7);

    &-bar {
      width: 30px;
    }

    &-content {
      .tab {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      h3 {
        text-align: center;
        margin-top: 5px;
        color: #333;
      }

      .info {
        align-self: center;
        justify-self: flex-end;
        margin-top: auto;
        margin-bottom: 5px;
        color: gray;
      }
    }
  }

  button {
    background-color: transparent;
    border-color: transparent;
    width: auto;
    height: auto;
    padding: 0px;
    margin: 0px;
    color: rgb(95, 88, 88);

    &.selected {
      color: #ff3e00;
    }

    &:hover {
      cursor: pointer;
      color: #333;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }
</style>
