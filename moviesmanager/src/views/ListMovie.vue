<template>
    <div class="home">
        <h1 class="p-4">Liste Films</h1>
        <b-form @submit.prevent="searchMovies" class="d-flex flex-column text-left col-lg-4 mx-auto">
            <b-form-group
                    label="Filtres"
            >
                <b-form-select v-model="selected" :options="options"/>
            </b-form-group>
            <b-form-group
                    label="Trier"
            >
                <b-form-select v-model="selected2" :options="options2"/>
            </b-form-group>
            <b-form-group
                    label="Catégorie"
            >
                <b-form-select v-model="selected3">
                    <b-form-select-option :value="null">Toutes Catégories</b-form-select-option>
                    <b-form-select-option v-for="genre in genres.genres" :key="genre.id" :value="genre.id">{{genre.name}}</b-form-select-option>
                </b-form-select>
            </b-form-group>
            <b-button class="col-lg-4 mx-auto mt-2" type="submit" variant="primary">Recherche</b-button>
        </b-form>
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
        name: "listMovie",
        components: {
            MovieItem
        },
        data() {
            return {
                selected: 'popularity',
                selected2: 'popularity.desc',
                selected3: null,
                options: [
                    {value: 'popularity', text: 'Les mieux notés'},
                    {value: 'date', text: 'Actuellement en salle'},
                    {value: 'next', text: 'Prochainement'},
                ],
                options2: [
                    {value: 'popularity.desc', text: 'Popularité descendante'},
                    {value: 'popularity.asc', text: 'Popularité ascendante'},
                    {value: 'vote_average.desc', text: 'Note descendante'},
                    {value: 'vote_average.asc', text: 'Note ascendante'},
                    {value: 'release_date.desc', text: 'Date de sortie descendante'},
                    {value: 'release_date.asc', text: 'Date de sortie ascendante'},
                ],
                genres: [],
                movies: [],
                info: [],
                query: "",
                perPage: 20,
                currentPage: 1,
                rows: 0
            };
        },
        created() {
            this.getGenres();
        },
        computed: {
            token() {
                return this.$store.state.user.jwtToken;
            }
        },
        watch: {
            currentPage: function () {
                this.searchMovies();
            }
        },
        methods: {
            getGenres: async function () {
                let response = await this.$axios.get('/genre/movie/list');
                this.genres = response.data;
            },
            scrollTop() {
                window.scrollTo(0, 0);
            },
            searchMovies: async function () {
                let filter;
                let genre;
                if (this.selected == 'popularity') {
                    filter = 'vote_average.gte=8&vote_count.gte=10'
                } else if (this.selected == 'date') {
                    let today = new Date();
                    let last3 = new Date(today.getFullYear(),today.getMonth()-1,0);
                    last3.setDate(Math.min(today.getDate(),last3.getDate()));
                    filter = 'primary_release_date.gte='+last3.toISOString().slice(0,10);
                } else if (this.selected == 'next') {
                    let date = new Date();
                    filter = 'primary_release_date.gte=' + date.toISOString().slice(0, 10);
                }
                if(this.selected3 === null) {
                    genre = "";
                } else {
                    genre = "&with_genres=" + this.selected3;
                }
                let response = await this.$axios.get(
                    "/discover/movie?" + filter + "&sort_by=" + this.selected2 + genre + "&page=" + this.currentPage
                );

                this.movies = response.data.results;

                this.rows = response.data.total_results;

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