<template>
    <div>
      <h1>My videos</h1>

      <v-list-item
        v-for="video in videos"
        :key="video.title"
        @click="goToVideo(video._id)"
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

import api from '../../services/api';

export default {
  name: 'Videos',
  methods: {
    goToVideo(id) {
      this.$router.push({ name: 'Video', params: { id } });
    },

    async getVideos() {
      try {
        const { data } = await api.videos.getAllVideos();
        this.videos = data.videos;
      } catch (e) {
        console.log(e);
      }
    },
  },

  created() {
    this.getVideos();
  },

  data() {
    return {
      videos: [],
    };
  },
};
</script>

<style scoped>

</style>
