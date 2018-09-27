<template>
  <div class='div-import'  >
    <div id="gjs" >
      <h1>Hello World Component!</h1>
    </div>
    <div class="panel__right">
      <div class="layers-container"></div>
    </div>
  </div>
</template>

<script lang="ts">

    import Component from 'vue-class-component';
    import { EidtorViewModel } from './eidtorViewModel';

    @Component({
        components: {}
    })

    export default class App extends EidtorViewModel {}

</script>

<style scoped>

  .div-import {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .btn-import {
    width: 20%;


  }

</style>