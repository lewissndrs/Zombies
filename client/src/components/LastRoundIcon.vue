<template>
  <div id=icon>
    <img :src="getIconImage">
  </div>
</template>

<script>
export default {
    name: 'last-round-icon',
    props: ['icon'],
    computed: {
        getIconImage: function() {
            return require('@/assets/'+ this.icon +'.jpg')
        }
    }
}
</script>

<style>

#icon {
    width: 20px;
    height: 20px;
}

#icon > img {
    width: 100%;
    height: auto;
}

</style>