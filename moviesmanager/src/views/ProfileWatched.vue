<template>
    <div class="user">
        <h1 class="p-4">Films Vus</h1>
        <b-list-group v-if="watcheds.length > 0" horizontal="" id="watchedsList" class="listGroup">
            <b-list-group-item class="movieItem" v-for="movie in watcheds" :key="movie.id">
                <movie-item :isMovie="true" :movie="movie"/>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    import MovieItem from "../components/MovieItem";
    export default {
        name: 'profileWatched',
        data () {
            return {
                user: {},
                watcheds: [],
            }
        },
        components: {
            MovieItem
        },
        created() {
            this.getUser();
            this.getWatcheds();
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
            getWatcheds: async function() {
                let promises = [];
                let response = await this.$axiosNode.get(
                    "/movie/watched/list/" + this.userId);
                let watcheds = response.data.watcheds;
                watcheds.forEach((watched) => {
                    promises.push(this.$axios.get('/movie/' + watched.id));
                });
                Promise.all(promises).then( (results) => {
                    results.forEach( (response) => {
                        this.watcheds.push(response.data);
                    });
                })
            },
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
    @media screen and (max-width: 480px) {
        .movieItem {
            width: 100% !important;
        }
    }
</style>