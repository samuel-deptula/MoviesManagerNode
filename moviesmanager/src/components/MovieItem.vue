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
            <b-card-footer class="d-flex flex-row justify-content-around">
                <b-card-text :class="movie.vote_average > 7 ? 'green' : movie.vote_average > 3 ? 'orange' : 'red'" class="align-self-center">{{rate(movie.vote_average)}}</b-card-text>
                <b-card-text v-if="isMovie" class="align-self-center">{{date(movie.release_date)}}</b-card-text>
                <b-card-text v-else class="align-self-center">{{date(movie.first_air_date)}}</b-card-text>
              <b-button v-if="isMovie" class="align-self-center" @click="redirectToMovie(movie.id)" size="lg" variant="primary">Details</b-button>
              <b-button v-else class="align-self-center" @click="redirectToSerie(movie.id)" size="lg" variant="primary">Details</b-button>
            </b-card-footer>
          </b-card>
    </div>
</template>

<script>
export default {
    name: "movieItem",
    props: {
        movie: Object,
        isMovie: Boolean
    },
    computed: {
    },
    methods: {
        rate(movieRate) {
            let rate = movieRate * 10 + "%";
            return rate;
        },
        date(dateString) {
            if(dateString !== ""){
            let date = new Date(dateString);
                return date.toLocaleDateString();
            } else {
                return ""
            }
        },
        redirectToMovie: function (id) {
            this.$router.push("/movie/about/" + id)
        },
        redirectToSerie: function (id) {
            this.$router.push("/serie/about/" + id)
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
    .green {
        padding: 5px;
        background-color: green;
        color: white;
        border: 1px solid green;
        border-radius: 50%;
    }
     .orange {
         padding: 5px;
         background-color: orange;
         color: white;
         border: 1px solid orange;
         border-radius: 50%;
     }
     .red {
         padding: 5px;
         background-color: red;
         color: white;
         border: 1px solid red;
         border-radius: 50%;
     }
</style>