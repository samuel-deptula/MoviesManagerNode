<template>
    <div class="col-lg-4 mx-auto mt-5">
        <b-card :title="post.title">
            <b-card-text>
                {{post.body}}
            </b-card-text>
            <b-button class="btn btn-danger" @click="deletePost(post._id)">Supprimer</b-button>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "aboutPost",
            data () {
                return {
                    post: {}
                }
            },
        created() {
            this.getPost();
        },
        methods: {
            deletePost: async function (id) {
                await this.$axiosNode.delete('post/' + id);
                this.$router.push("/admin");
            },
            getPost: async function () {
                let response = await this.$axiosNode.get('post/' + this.$route.params.id);
                this.post = response.data.post
            }
        }
    }
</script>

<style scoped>

</style>