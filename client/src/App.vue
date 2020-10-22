<template>
  <div id='app'>
    <header>
      <hgroup>
        <router-link :to='{ name: "home"}'>
          <h1>Zombie Dice</h1>
        </router-link>
      <h3>don't sue me bro</h3>
      </hgroup>

      <nav>
        <router-link :to="{ name: 'game' }">Start a game</router-link>
        <a href="">Log in/register</a>
      </nav>

      <router-view></router-view>
    </header>
  </div>
</template>

<script>
export default {
  name: 'app',

}
</script>

<style>

</style>