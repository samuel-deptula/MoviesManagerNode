<template>
  <div class="user">
    <h1>Bonjour {{user.login}}</h1>
    <b-list-group v-if="favs.length > 0" horizontal="" id="moviesList" class="listGroup">
      <b-list-group-item class="movieItem" v-for="movie in favs" :key="movie.id">
        <movie-item :isMovie="true" :movie="movie"/>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  import MovieItem from "../components/MovieItem";
export default {
  name: 'profile',
  data () {
    return {
      user: {},
      favs: [],
    }
  },
  components: {
    MovieItem
  },
  created() {
    this.getUser();
    this.getFavs();
  },
  computed: {
    userId() {
      let user = this.$store.getters['user/user'];
      return user.id;
    }
  },
  methods: {
    getUser: async function () {
      let response = await this.$axiosNode.get('/user/' + this.userId);
      this.user = response.data.user;
    },
    getFavs: async function() {
      let promises = [];
        let response = await this.$axiosNode.get(
                "/movie/fav/list/" + this.userId);
        let favs = response.data.favs;
        favs.forEach((fav) => {
          promises.push(this.$axios.get('/movie/' + fav.id));
        });
      Promise.all(promises).then( (results) => {
        results.forEach( (response) => {
          this.favs.push(response.data);
        });
    })
  }
}}
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