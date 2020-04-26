<template>
  <div v-if="ready">
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
    mapSuggestions(suggestions) {
      return suggestions.map((suggestion) => ({ label: suggestion, value: suggestion }));
    },
    getQuery(string) {
      return string.split(' ').reduce(((previousValue, currentValue) => `${previousValue}%20${currentValue}`), '');
    },

    async preGetSuggestions() {
      this.selected = this.tags;
      await this.getSuggestions(this.title);
      this.selected = [...this.selected, ...this.suggestions.slice(0, 10)];
    },

    async getSuggestions(value) {
      const query = this.getQuery(value);
      try {
        const response = await api.suggestions.getSuggestions(query);
        if (response.success) {
          this.suggestions = response.data.suggestions;
          this.results = this.mapSuggestions(response.data.suggestions);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async search(value) {
      if (!value) {
        return;
      }
      this.loading = true;
      await this.getSuggestions(value);
      this.loading = false;
    },
  },

  watch: {
    title: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== '' && this.tags.length === 0) {
          this.preGetSuggestions(this.title);
          this.ready = true;
          return true;
        }
        this.selected = this.tags;
        this.ready = true;
        return true;
      },
    },

    selected() {
      this.$emit('selected', this.selected);
    },

  },

  props: {
    title: {
      type: String,
    },
    tags: {
      type: Array,
    },
  },

  data() {
    return {
      debouncedSearch: _.debounce(this.search, 2000),
      selected: [],
      loading: false,
      results: [],
      suggestions: [],
      ready: false,
    };
  },
};
</script>

<style scoped>

</style>
