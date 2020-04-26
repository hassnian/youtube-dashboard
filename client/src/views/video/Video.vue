<template>
  <div>
    <h1>Video Information</h1>
    <template v-if="!loading">
      <v-row style="margin-top: 50px">
        <p>Title: {{video.title}}</p>
      </v-row>


      <v-row style="margin-top: 50px">
        <KewordsSearcher :title.sync="video.title" :tags="video.tags" @selected="handleSelected"/>
      </v-row>


      <v-row>
        <div class="text-center">
          <v-btn
            :disabled="loading"
            :loading="loading"
            class="white--text"
            color="purple darken-2"
            @click="updateVideo"
          >
            Update video
          </v-btn>
        </div>
      </v-row>

    </template>

      <v-dialog
        v-model="loading"
        hide-overlay
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            loading
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

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
      video: {
        title: '',
        tags: [],
      },
      loading: false,
    };
  },

  computed: {
    hasVideo() {
      return Object.keys(this.video).length !== 0;
    },
  },
  mounted() {
    this.findVideo();
  },


  methods: {

    handleSelected(value) {
      this.video.tags = value;
    },

    async findVideo() {
      this.loading = true;
      const videoId = this.$route.params.id;
      const response = await api.videos.getOneVideo(videoId);

      if (!response.success) {
        this.$router.push({ name: 'Videos' });
      }

      this.video = { ...response.data.video[0] };

      this.loading = false;
    },

    async updateVideo() {
      this.loading = true;
      const { title, tags } = this.video;

      const videoId = this.$route.params.id;
      try {
        const response = await api.videos.updateVideo(videoId, {
          title, tags,
        });
      } catch (e) {
        console.log(e);
      }

      this.loading = false;
    },

  },
};
</script>

<style scoped>

</style>
