<script lan="ts">
  import { onMount } from "svelte";
  import axios from "axios";

  let data = null;

  $: console.log(data);

  onMount(() =>
    axios
      .get("/api/arc")
      .then(res => (data = res.data))
      .catch(err => console.log(err))
  );
</script>

<div />
