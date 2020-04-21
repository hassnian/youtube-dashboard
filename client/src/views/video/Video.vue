<template>
  <div>
    <h1>Video Information</h1>
    <v-row v-if="hasVideo" style="margin-top: 50px">
      <p>Title: {{video.title}}</p>
    </v-row>


    <v-row v-if="hasVideo" style="margin-top: 50px">
      <KewordsSearcher />
    </v-row>

  </div>
</template>

<script>
import KewordsSearcher from '../../components/KewordsSearcher/KewordsSearcher.vue';

export default {
  name: 'Video',
  components: { KewordsSearcher },
  data() {
    return {
      video: null,
    };
  },

  computed: {
    hasVideo() {
      return !!this.video;
    },
  },
  mounted() {
    this.findVideo();
  },


  methods: {
    findVideo() {
      const videoId = this.$route.params.id;
      const videoInformation = window.videos.find((video) => video.id === videoId);

      if (!videoInformation) {
        this.$router.push({ name: 'Videos' });
      }

      this.video = { ...videoInformation };
    },
  },
};
</script>

<style scoped>

</style>
