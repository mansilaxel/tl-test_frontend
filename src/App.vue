<template>
  <div id="app">
    <router-link :to="{ name: 'Home'}">Home</router-link>
    <router-link :to="{ name: 'Orders'}">Orders</router-link>
    <router-view/>
    <div class="flash flash__error" v-if="flash.error">
      {{flash.error}}
    </div>
    <div class="flash flash__success" v-if="flash.success">
      {{flash.success}}
    </div>
  </div>
</template>

<script>
import Flash from './helpers/flash'
export default {
  name: 'App',
  data () {
    return {
      flash: Flash.state
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.flash {
  width: 50%;
  margin: 0 auto;
  margin-top: 15px;
  padding: 15px;
  border-radius: 2px;
}
.flash__success {
  background: #a5d6a7;
  border: 1px solid #81c784;
  color: #1b5e20;
}

.flash__error {
  background: #ef9a9a;
  border: 1px solid #E57373;
  color: #b71c1c;
}
</style>
