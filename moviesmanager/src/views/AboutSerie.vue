<template>
    <div class="about">
        <div>
            <b-card no-body class="overflow-hidden mw-100 m-5">
                <b-row no-gutters>
                    <b-col v-if="serie.videos.results.length > 0" md="3">
                        <a class="trailer" :href="'https://www.youtube.com/watch?v=' + serie.videos.results[0].key"><b-card-img :src="serie.poster_path ? 'https://image.tmdb.org/t/p/w500' + serie.poster_path : 'https://figurinepop.com/public/flash3_2.jpg'" alt="Image" class="rounded-0"></b-card-img></a>
                    </b-col>
                    <b-col v-else md="3">
                        <b-card-img :src="serie.poster_path ? 'https://image.tmdb.org/t/p/w500' + serie.poster_path : 'https://figurinepop.com/public/flash3_2.jpg'" alt="Image" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6">
                        <b-card-body :title="serie.name">
                            <b-card-text>
                                Date de sortie: {{date(serie.first_air_date)}}
                            </b-card-text>
                            <b-card-text class="d-flex flex-row">
                                Genres:
                                <b-list-group horizontal="">
                                    <b-list-group-item v-for="genre in serie.genres" :key="genre.id">{{genre.name}}</b-list-group-item>
                                </b-list-group>
                            </b-card-text>
                            <b-card-text> Synopsis: {{serie.overview}}</b-card-text>
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'aboutSerie',
        data () {
            return {
                serie: {}
            }
        },
        created() {
            this.fetchSerie();
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
            fetchSerie: async function () {
                let response = await this.$axios.get('/tv/' + this.$route.params.id + '?append_to_response=videos');
                this.serie = response.data;
            }
        }
    }
</script>