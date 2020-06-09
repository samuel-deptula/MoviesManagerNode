<template>
  <div class="home">
    <h1 class="p-4">Rechercher Film</h1>
    <b-input-group prepend="Recherche" class="mb-4 col-md-4 mx-auto">
      <b-form-input @keyup="searchMovies" v-model="query"/>
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
      @change="scrollTop"
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
    scrollTop() {
        window.scrollTo(0,0);
    },
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
@media screen and (max-width: 480px) {
  .movieItem {
    width: 100% !important;
  }
}
</style>