<template>
  <div class="home">
    <v-row style="margin-bottom: 10px">
      <v-btn @click="newVideo = !newVideo">NEW VIDEO</v-btn>
    </v-row>

    <div v-if="newVideo">
      <v-row>
        <v-col>
          <v-text-field
            label="Solo"
            v-model="videoTitle"
            placeholder="Video Title"
            solo
          ></v-text-field>
        </v-col>

      </v-row>

      <v-row >
        <v-btn class="ma-2" outlined color="indigo" @click="addVideo">ADD Video</v-btn>
      </v-row>
    </div>

  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'Home',
  methods: {
    addVideo() {
      const videoId = uuidv4();
      window.videos.push({
        title: this.videoTitle,
        id: videoId,
      });
      this.$router.push({ name: 'Video', params: { id: videoId } });
    },
  },
  data() {
    return {
      newVideo: false,
      videoTitle: '',
    };
  },
};
</script>
