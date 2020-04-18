<template>
  <v-app>
    <baseline>
      <router-view />
    </baseline>
  </v-app>
</template>

<script>

import Baseline from './layouts/baseline.vue';

export default {
  name: 'App',
  components: { Baseline },
  data: () => ({
    //
  }),
};
</script>
