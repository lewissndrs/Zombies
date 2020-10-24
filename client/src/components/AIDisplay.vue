<template>
  <div id='ai-player'>
    <h3>Name: {{aI.name}}</h3>
    <p v-if="aI.inRound === currentRound">Turn Complete</p>
    <p>Brains: {{aI.brains}}</p>
      <div class="last-round-display">
        <p>Last Round:</p>
        <last-round-icon v-for="(icon,index) in lastRoundArray" :key='index' :icon='icon' class="last-round-icon"></last-round-icon>
      </div>
  </div>
</template>

<script>
import LastRoundIcon from '@/components/LastRoundIcon.vue';
export default {
  name:"AIDisplay",
  props:['aI', 'currentRound'],
  computed: {

    lastRoundArray: function() {
      const flat = this.aI.lastRound.flat();
      return flat
    },
    imagesLoad: function(fileName) {
      return require('@/assets/'+ fileName +'.jpg')
    }
  },
  components: {
    'last-round-icon': LastRoundIcon
  }
}
</script>

<style>
#ai-player {
  place-self: center;
  align-self: flex-start;
}

.last-round-display {
  display: flex;
  flex-wrap: wrap;
}

.last-round-icon {
 margin: 2px;
}

</style>