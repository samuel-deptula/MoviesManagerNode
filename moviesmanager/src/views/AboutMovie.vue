<template>
  <div class="about">
    <div>
      <b-card no-body class="overflow-hidden mw-100 m-5">
        <b-row no-gutters>
          <b-col md="3">
            <b-card-img :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://figurinepop.com/public/flash3_2.jpg'" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="9">
            <b-card-body class="d-flex flex-column">
              <b-card-text>
                <h1>{{movie.title}} <span v-if="movie.release_date">({{year(movie.release_date)}})</span></h1>
              </b-card-text>
              <div class="d-flex flex-row flex-wrap mx-auto m-3">
                <b-card-text class="item mr-1">
                  {{date(movie.release_date)}}
                </b-card-text>
                <b-card-text class="d-flex flex-row item mr-1">
                  <b-list-group horizontal="">
                    <b-card-text v-for="(genre, index) in movie.genres" class="mr-1" :key="genre.id">{{genre.name}}{{index === movie.genres.length - 1 ? "" : ","}}</b-card-text>
                  </b-list-group>
                </b-card-text>
                <b-card-text>
                  {{hour(movie.runtime)}}
                </b-card-text>
              </div>
              <div class="d-flex flex-row mx-auto m-3">
                <i @click="switchFav" style="color: var(--danger); cursor: pointer;" class="fa-2x mr-5" :class="movieInfo.fav ? 'fas fa-heart' : 'far fa-heart'"></i>
                <i @click="switchWatched" style="cursor: pointer;" class="fa-2x" :class="movieInfo.watched ? 'fas fa-eye blue' : 'far fa-eye-slash orange'"></i>
              </div>
              <b-card-text><h3 class="col-md-2 mt-2">Synopsis</h3></b-card-text>
              <b-card-text class="col-md-8 mb-3"> {{movie.overview}}</b-card-text>
              <b-form-rating class="col-md-8 mx-auto mt-5" @change="switchRate" variant="warning" v-model="movieInfo.rate"></b-form-rating>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <b-button v-b-toggle.collapse-1 variant="primary">Films similaires</b-button>
      <b-collapse id="collapse-1" class="mt-2">
      <b-list-group horizontal="" id="moviesList" class="listGroup">
        <b-list-group-item class="movieItem" v-for="movie in similars" :key="movie.id">
          <movie-item :isMovie="true" :movie="movie"/>
        </b-list-group-item>
      </b-list-group>
      <b-pagination
              v-show="similars.length > 0"
              align="center"
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="moviesList"
              @change="scrollTop"
      />
      </b-collapse>
    </div>
  </div>
</template>

<script>
  import MovieItem from "../components/MovieItem";
export default {
  name: 'aboutMovie',
  components: {
    MovieItem
  },
  data () {
    return {
      movie: {},
      movieInfo: {},
      similars: [],
      perPage: 20,
      currentPage: 1,
      rows: 0
    }
  },
  computed: {
    userId() {
      let user = this.$store.getters['user/user'];
      return user.id;
    },
  },
  created() {
    this.fetchMovie();
    this.getMovieInfos();
    this.getSimilar();
  },
  watch: {
    currentPage: function() {
      this.getSimilar();
    }
  },
  methods: {
    scrollTop() {
      window.scrollTo(0,0);
    },
    hour(time) {
      let quotient = Math.floor(time/60);
      let remainder = time % 60;

      return (quotient + "h " + remainder + "m")
    },
    date(dateString) {
      if(dateString !== ""){
        let date = new Date(dateString);
        return date.toLocaleDateString();
      } else {
        return ""
      }
    },
    year(dateString) {
      if(dateString !== ""){
        let date = new Date(dateString);
        return date.getFullYear();
      } else {
        return ""
      }
    },
    getMovieInfos: async function() {
       let response = await this.$axiosNode.post('/movie/initialize', {movieId: this.$route.params.id, userId: this.userId});
       this.movieInfo = response.data.movie;
    },
    switchFav: async function() {
      this.movieInfo.fav = !this.movieInfo.fav;
      let response = await this.$axiosNode.post('/movie/fav', {movieId: this.$route.params.id, userId: this.userId, fav: this.movieInfo.fav});
      this.movieInfo = response.data.movie;
    },
    switchWatched: async function() {
      this.movieInfo.watched = !this.movieInfo.watched;
      let response = await this.$axiosNode.post('/movie/watched', {movieId: this.$route.params.id, userId: this.userId, watched: this.movieInfo.watched});
      this.movieInfo = response.data.movie;
    },
    switchRate: async function() {
      let response = await this.$axiosNode.post('/movie/rate', {movieId: this.$route.params.id, userId: this.userId, rate: this.movieInfo.rate});
      this.movieInfo = response.data.movie;
    },
    fetchMovie: async function () {
      let response = await this.$axios.get('/movie/' + this.$route.params.id);
      this.movie = response.data;
    },
    getSimilar: async function () {
     let response = await this.$axios.get('/movie/' + this.$route.params.id + '/similar?page=' + this.currentPage);
     this.similars = response.data.results;
     this.rows = response.data.total_results;
    }
  }
}
</script>

<style scoped lang="css">
  .item::after {
    content: "|";
  }
  .blue {
    color: var(--primary);
  }
  .orange {
    color: var(--gray-dark);
  }
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
