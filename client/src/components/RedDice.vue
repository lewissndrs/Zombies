<template>
  <div>
    <ol class="die-list" :class="roll" data-roll="1" :id="id">
      <li class="die-icon-item red" data-side="1">
        <img src="@/assets/red-Brain.jpg" class="die-item">
      </li>
      <li class="die-icon-item red" data-side="2">
        <img src="@/assets/red-Walker.jpg" class="die-item">
      </li>
      <li class="die-icon-item red" data-side="3">
        <img src="@/assets/red-Walker.jpg" class="die-item">
      </li>
      <li class="die-icon-item red" data-side="4">
        <img src="@/assets/red-Shot.jpg" class="die-item">
      </li>
      <li class="die-icon-item red" data-side="5">
        <img src="@/assets/red-Shot.jpg" class="die-item">
      </li>
      <li class="die-icon-item red" data-side="6">
        <img src="@/assets/red-Shot.jpg" class="die-item">
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name:'red-dice',
  props:['roll', 'id']
}
</script>

<style>

</style>