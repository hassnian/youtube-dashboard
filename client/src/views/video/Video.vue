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
import api from '../../services/api';

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
    async findVideo() {
      const videoId = this.$route.params.id;
      const response = await api.videos.getOneVideo(videoId);

      if (!response.success) {
        this.$router.push({ name: 'Videos' });
      }

      this.video = { ...response.data.video[0] };
    },
  },
};
</script>

<style scoped>

</style>
