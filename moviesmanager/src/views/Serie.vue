<template>
    <div class="home">
        <h1>Séries</h1>
        <b-input-group prepend="Recherche" class="mt-3 col-md-3 offset-8">
            <b-form-input @keyup.enter="searchSeries" v-model="query"/>
            <b-input-group-append>
                <b-button @click="searchSeries" variant="info">Ok</b-button>
            </b-input-group-append>
        </b-input-group>
        <b-list-group horizontal="" id="seriesList" class="listGroup">
            <b-list-group-item class="movieItem" v-for="serie in series" :key="serie.id">
                <movie-item  :isMovie="false" :movie="serie"/>
            </b-list-group-item>
        </b-list-group>
        <b-pagination
                v-show="series.length > 0"
                align="center"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="seriesList"
        />
    </div>
</template>

<script>
    import MovieItem from "../components/MovieItem";

    export default {
        name: "serie",
        components: {
            MovieItem
        },
        data() {
            return {
                series: [],
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
                this.searchSeries();
            }
        },
        methods: {
            searchSeries: async function() {
                if (this.query !== "") {
                    let response = await this.$axios.get(
                        "/search/tv?query=" + this.query + "&page=" + this.currentPage
                    );

                    this.series = response.data.results;

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