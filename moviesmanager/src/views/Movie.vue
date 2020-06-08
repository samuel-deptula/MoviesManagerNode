<template>
  <div class="home">
    <h1>Films</h1>
    <b-input-group prepend="Recherche" class="mt-3 col-md-3 offset-8">
      <b-form-input @keyup.enter="searchMovies" v-model="query"/>
      <b-input-group-append>
        <b-button @click="searchMovies" variant="info">Ok</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-list-group horizontal="" id="moviesList" class="listGroup">
      <b-list-group-item class="movieItem" v-for="movie in movies" :key="movie.id">
        <movie-item :isMovie="true" :movie="movie"/>
      </b-list-group-item>
    </b-list-group>
    <b-pagination
      v-show="movies.length > 0"
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="moviesList"
    />
  </div>
</template>

<script>
import MovieItem from "../components/MovieItem";

export default {
  name: "movie",
  components: {
    MovieItem
  },
  data() {
    return {
      movies: [],
      info: [],
      query: "",
      perPage: 20,
      currentPage: 1,
      rows: 0
    };
  },
  mounted() {
  },
  computed: {
    token() {
      return this.$store.state.user.jwtToken;
    }
  },
  watch: {
    currentPage: function() {
      this.searchMovies();
    }
  },
  methods: {
    searchMovies: async function() {
      if(this.query) {
        let response = await this.$axios.get(
                "/search/movie?query=" + this.query + "&page=" + this.currentPage
        );

        this.movies = response.data.results;

        this.rows = response.data.total_results;
      }
    }
  }
};
</script>

<style lang="css">
.listGroup {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: center;
}
.movieItem {
  width: 20%;
}
</style>