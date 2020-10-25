<template>
  <div id='ai-player'>
    <h3>Name: {{aI.name}}</h3>
    <p v-if="aI.inRound === currentRound">Turn Complete</p>
    <p>Brains: {{aI.brains}}</p>
      <div class="last-round">
        <p>Last Round:</p>
        <div v-if="!aI.died">
          <p v-for="(roll, index) in aI.lastRound" :key="index" class="last-round-display">
            <last-round-icon v-for="(icon,index) in roll" :key='index' :icon='icon' class="last-round-icon"></last-round-icon>
          </p>
        </div>
        <div v-if="aI.died"><b>&#128165;&#128165;&#128165;</b></div>
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

.last-round {
  display: flex;
}

.last-round-display {
  display: flex;
}

.last-round-icon {
 margin: 2px;
}

</style>