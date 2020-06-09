<template>
  <div class="about">
    <div>
      <b-card no-body class="overflow-hidden mw-100 m-5">
        <b-row no-gutters>
          <b-col md="3">
            <b-card-img :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://figurinepop.com/public/flash3_2.jpg'" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="movie.title">
              <b-card-text>
                Date de sortie: {{date(movie.release_date)}}
              </b-card-text>
              <b-card-text class="d-flex flex-row">
                Genres:
                <b-list-group horizontal="">
                  <b-list-group-item v-for="genre in movie.genres" :key="genre.id">{{genre.name}}</b-list-group-item>
                </b-list-group>
              </b-card-text>
              <b-card-text> Synopsis: {{movie.overview}}</b-card-text>
              <b-button @click="switchFav">Favori</b-button>
              <b-card-text v-if="this.movieInfo.fav">{{this.movieInfo.fav}}</b-card-text>
              <b-button @click="switchWatched">Vu</b-button>
              <b-card-text v-if="this.movieInfo.watched">{{this.movieInfo.watched}}</b-card-text>
              <b-form-rating @change="switchRate" variant="warning" v-model="movieInfo.rate"></b-form-rating>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aboutMovie',
  data () {
    return {
      movie: {},
      movieInfo: {}
    }
  },
  computed: {
    userId() {
      let user = this.$store.getters['user/user'];
      return user.id;
    }
  },
  created() {
    this.fetchMovie();
    this.getMovieInfos();
  },
  methods: {
    date(dateString) {
      if(dateString !== ""){
        let date = new Date(dateString);
        return date.toLocaleDateString();
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
    }
  }
}
</script>
