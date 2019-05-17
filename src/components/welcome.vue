<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <uenx-button>提交</uenx-button>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex';

export default {
  name: "welcome",
  data() {
    return {
      msg: "Welcome to Noa"
    };
  },
};
</script>
<style lang="scss">
  .hello {
    background-color: #fff;
    padding: 10px;
  }
</style>

