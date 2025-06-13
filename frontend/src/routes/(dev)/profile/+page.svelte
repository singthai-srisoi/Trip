<script>
  import Pikaday from "pikaday";
  let myDatepicker;
  $effect(() => {
    if (myDatepicker) {
      const picker = new Pikaday({
        field: myDatepicker
      });
      return () => picker.destroy();
    }
  });
</script>

<input type="text" class="input pika-single"  bind:this={myDatepicker} value="Pick a day" />