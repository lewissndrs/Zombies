<template>
  <div>
    <ol class="die-list" :class="roll" data-roll="1" :id="id">
      <li class="die-icon-item yellow" data-side="1">
        <img src="@/assets/yellow-Brain.jpg" class="die-item">
      </li>
      <li class="die-icon-item yellow" data-side="2">
        <img src="@/assets/yellow-Brain.jpg" class="die-item">
      </li>
      <li class="die-icon-item yellow" data-side="3">
        <img src="@/assets/yellow-Walker.jpg" class="die-item">
      </li>
      <li class="die-icon-item yellow" data-side="4">
        <img src="@/assets/yellow-Walker.jpg" class="die-item">
      </li>
      <li class="die-icon-item yellow" data-side="5">
        <img src="@/assets/yellow-Shot.jpg" class="die-item">
      </li>
      <li class="die-icon-item yellow" data-side="6">
        <img src="@/assets/yellow-Shot.jpg" class="die-item">
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name:'yellow-dice',
  props:['roll', 'id']
}
</script>

<style>

</style>