<template>
  <div>
      <div class='background'>
        <div id='animation' :style='{background: getAnimation}'></div>
        <h3>AI IS PLAYING</h3>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ai-turn-animation',
    computed: {
        getAnimation() {
            const image = require('@/assets/turnanimation.png')
            const url = `url('${image}')`
            return url;
        }
    },
    props : []
}
</script>

<style>

.background {
    background: rgba(0, 0, 0, 0.486);
    padding: 30px;
}

#animation {
    animation: skull-shake 1.2s steps(7) infinite;
    background-position: 0,0;
    background-size: auto 300px;

    width: 300px;
    height: 300px;


}

.background > h3 {
    display: flex;
    justify-content: center;
    font-size: 35px;
}

@keyframes skull-shake {

    0% {
        background-position: 0,0;
    }
    100%{
        background-position: -2100px 0;
    }

}

</style>