<template>
  <div>
    <ol class="die-list" :class="roll" data-roll="1" :id="id">
      <li class="die-icon-item" :class="colour" data-side="1">
        <!-- <span class="dot"></span> -->
        <img v-if="colour==='green'" src="@/assets/green-Brain.jpg" class="die-item">
        <img v-if="colour==='yellow'" src="@/assets/yellow-Brain.jpg" class="die-item">
        <img v-if="colour==='red'" src="@/assets/red-Brain.jpg" class="die-item">
      </li>
      <li class="die-icon-item" :class="colour" data-side="2">
        <img v-if="colour==='green'" src="@/assets/green-Brain.jpg" class="die-item">
        <img v-if="colour==='yellow'" src="@/assets/yellow-Brain.jpg" class="die-item">
        <img v-if="colour==='red'" src="@/assets/red-Walker.jpg" class="die-item">
      </li>
      <li class="die-icon-item" :class="colour" data-side="3">
        <img v-if="colour==='green'" src="@/assets/green-Brain.jpg" class="die-item">
        <img v-if="colour==='yellow'" src="@/assets/yellow-Walker.jpg" class="die-item">
        <img v-if="colour==='red'" src="@/assets/red-Walker.jpg" class="die-item">
      </li>
      <li class="die-icon-item" :class="colour" data-side="4">
        <img v-if="colour==='green'" src="@/assets/green-Walker.jpg" class="die-item">
        <img v-if="colour==='yellow'" src="@/assets/yellow-Walker.jpg" class="die-item">
        <img v-if="colour==='red'" src="@/assets/red-Shot.jpg" class="die-item">
      </li>
      <li class="die-icon-item" :class="colour" data-side="5">
        <img v-if="colour==='green'" src="@/assets/green-Walker.jpg" class="die-item">
        <img v-if="colour==='yellow'" src="@/assets/yellow-Shot.jpg" class="die-item">
        <img v-if="colour==='red'" src="@/assets/red-Shot.jpg" class="die-item">
      </li>
      <li class="die-icon-item" :class="colour" data-side="6">
        <img v-if="colour==='green'" src="@/assets/green-Shot.jpg" class="die-item">
        <img v-if="colour==='yellow'" src="@/assets/yellow-Shot.jpg" class="die-item">
        <img v-if="colour==='red'" src="@/assets/red-Shot.jpg" class="die-item">
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name:'dice',
  props:['colour', 'roll', 'id']
}
</script>

<style>

</style>