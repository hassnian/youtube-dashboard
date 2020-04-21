<template>
    <div>
      <span>Keywords searcher</span>
      <v-autocomplete
        v-model="selected"
        :disabled="loading"
        :items="results"
        filled
        chips
        color="blue-grey lighten-2"
        item-text="label"
        item-value="value"
        multiple
        @update:search-input="debouncedSearch"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            {{ data.item.label }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template>
            <v-list-item-content v-text="data.item.label"></v-list-item-content>
          </template>
        </template>
      </v-autocomplete>

    </div>
</template>

<script>
import _ from 'lodash';
import api from '../../services/api';

export default {
  name: 'KewordsSearcher',
  methods: {
    remove() {

    },
    getQuery(string) {
      return string.split(' ').reduce(((previousValue, currentValue) => `${previousValue}%20${currentValue}`), '');
    },
    async search(value) {
      if (!value) {
        return;
      }
      const query = this.getQuery(value);
      console.log(query);
      try {
        const response = await api.youtube.autcomplete(query);
        // const data = await response.getReader();
        // console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
  },
  data() {
    return {
      debouncedSearch: _.debounce(this.search, 500),
      selected: [],
      loading: false,
      results: [
        { label: 'Example', value: 'sd' },
        { label: '123', value: 'asd' },
        { label: '321', value: 'a213sd' },
      ],
    };
  },
};
</script>

<style scoped>

</style>
