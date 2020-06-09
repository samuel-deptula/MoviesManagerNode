<template>
    <div class="home">
        <h1 v-if="movies.length > 0" class="p-4">Films populaires de la semaine</h1>
        <b-list-group horizontal="" id="moviesList" class="listGroup">
            <b-list-group-item class="movieItem" v-for="movie in movies" :key="movie.id">
                <movie-item :isMovie="true" :movie="movie"/>
            </b-list-group-item>
        </b-list-group>
<!--        <h1 v-if="series.length > 0">Séries populaires de la semaine</h1>-->
<!--        <b-list-group horizontal="" id="seriesList" class="listGroup">-->
<!--            <b-list-group-item class="movieItem" v-for="serie in series" :key="serie.id">-->
<!--                <movie-item :isMovie="false" :movie="serie"/>-->
<!--            </b-list-group-item>-->
<!--        </b-list-group>-->
    </div>
</template>

<script>
    import MovieItem from "../components/MovieItem";

    export default {
        name: "home",
        components: {
            MovieItem
        },
        data() {
            return {
                movies: [],
                series: [],
            };
        },
        created() {
            this.searchMovies();

        },
        computed: {
            token() {
                return this.$store.state.user.jwtToken;
            }
        },
        methods: {
            searchMovies: async function() {
                let response = await this.$axios.get(
                    "/trending/movie/week"
                );

                this.movies = response.data.results;
            },
        }
    };
</script>

<style lang="css">
    .listGroup {
        display: flex;
        margin-top: 10px;
        justify-content: center;
    }
    .movieItem {
        width: 20%;
    }
    @media screen and (max-width: 480px){
        .movieItem{
        width: 100% !important;
        }
    }
</style>