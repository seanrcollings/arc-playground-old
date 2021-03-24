<script lang="ts">
  import { snippet } from "../../stores";
  // import type { Settings } from "../../snippets";

  const handleChange = (name: string, value: string) => {
    $snippet = {
      ...$snippet,
      arcfile: {
        ...$snippet.arcfile,
        [name]: value,
      },
    };
  };
</script>

<div class="settings">
  <table>
    <thead>
      <tr>
        <th class="name">Name</th>
        <th class="value">Value</th>
      </tr>
    </thead>
    <tbody>
      {#each Object.entries($snippet.arcfile) as [name, value]}
        <tr class="setting">
          <td class="name"><label for={name}>{name}</label></td>
          <td class="value">
            <input
              id={name}
              type="text"
              {value}
              on:change={e => {
                // @ts-ignore
                handleChange(name, e.target.value);
              }}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
  .settings {
    color: #333;
    font-size: 20px;
    padding: 5px;
  }

  .name {
    text-align: left;
  }
  .value {
    text-align: right;
  }

  .setting {
    input {
      font-size: 20px;
      width: 120px;
      border-color: transparent;
      display: inline;
      justify-self: flex-end;
      margin-left: auto;
      text-align: right;
    }
  }
</style>
