<template>
    <div>
      <h1>My videos</h1>

      <v-list-item
        v-for="video in videos"
        :key="video.title"
        @click="goToVideo(video.id)"
      >

        <v-list-item-content>
          <v-list-item-title v-text="video.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

    </div>
</template>

<script>
export default {
  name: 'Videos',
  methods: {
    goToVideo(id) {
      this.$router.push({ name: 'Video', params: { id } });
    },
  },
  data() {
    return {
      videos: window.videos,
    };
  },
};
</script>

<style scoped>

</style>
