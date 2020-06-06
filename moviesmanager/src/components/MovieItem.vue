<template>
    <div class="MovieItem">
        <b-card
            no-body
            class="movieCard"
            >
            <b-card-body>
              <b-card-img 
              class="mb-3"
              height="500px"
              :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://figurinepop.com/public/flash3_2.jpg'"
              alt="Image"
              top></b-card-img>
              <b-card-title>{{movie.title}}</b-card-title>
              <b-card-text>
                {{shortDesc(movie.overview)}}
              </b-card-text>
            </b-card-body>
            <b-card-footer>
              <b-button @click="redirectTo(movie.id)" size="lg" variant="primary">Details</b-button>
            </b-card-footer>
          </b-card>
    </div>
</template>

<script>
export default {
    name: "movieItem",
    props: {
        movie: Object
    },
    methods: {
        redirectTo: function (id) {
            this.$router.push("/about/" + id)
        },
        shortDesc: function (desc) {
            if (desc === null || desc === "")
                {
                return "...";
                }
            else if (desc.length > 101 && desc !=null)
            {
                return desc.toString().substring(0, 100) + '...';
            }
            else 
            {
                return desc;
            }
        }
    }
}
</script>

<style lang="css">
     .movieCard {
         max-width: 100%;
         height: 800px;
     }
</style>