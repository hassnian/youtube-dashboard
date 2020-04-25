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
import api from '../../services/api';

export default {
  name: 'Home',
  methods: {
    async addVideo() {
      try {
        const { data } = await api.videos.createOneVideo({
          title: this.videoTitle,
        });
        console.log(data);

        this.$router.push({ name: 'Video', params: { id: data.video._id } });
      } catch (e) {
        console.log(e);
      }
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
