<template>
  <div class="about">
    <h1>Film</h1>
    <p>{{ movie.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      movie: {}
    }
  },
  created() {
    this.fetchMovie();
  },
  methods: {
    fetchMovie: async function () {
      let response = await this.$axios.get('/movie/' + this.$route.params.id);
      this.movie = response.data;
    }
  }
}
</script>
