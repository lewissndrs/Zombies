<template>
  <div>
    <h3>Name: {{aI.name}}</h3>
    <p v-if="aI.inRound === currentRound">Turn Complete</p>
    <p>Brains: {{aI.brains}}</p>
    <p>Last Round: {{aI.lastRound}}</p>
  </div>
</template>

<script>
export default {
  name:"AIDisplay",
  props:['aI', 'currentRound']
}
</script>

<style>

</style>