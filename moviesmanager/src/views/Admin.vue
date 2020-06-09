<template>
    <b-tabs content-class="mt-5" fill class="mt-4 col-lg-8 mx-auto">
        <b-tab title="Utilisateurs" active>
            <table class="table col-lg-8 mx-auto">
                <thead>
                <tr>
                    <td>Email</td>
                    <td>Login</td>
                    <td>Action</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.email}}</td>
                    <td>{{user.login}}</td>
                    <td>
                        <b-button @click="ban(user._id)" style="cursor: pointer;" class="btn btn-danger"
                                  v-if="!user.isBanned">Ban
                        </b-button>
                        <b-button @click="ban(user._id)" style="cursor: pointer;" class="btn btn-success" v-else>Deban
                        </b-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </b-tab>
        <b-tab title="Commentaires">
            <table class="table col-lg-8 mx-auto">
                <thead>
                <tr>
                    <td>Email utilisateur</td>
                    <td>Titre</td>
                    <td>Contenu</td>
                    <td>Date</td>
                </tr>
                </thead>
                <tbody>
                <tr class="post" @click="redirectToDetails(post._id)" v-for="post in posts" :key="post._id">
                    <td>{{post.author_email}}</td>
                    <td>{{post.title}}</td>
                    <td>{{shortDesc(post.body)}}</td>
                    <td>{{post.date}}</td>
                </tr>
                </tbody>
            </table>
        </b-tab>
    </b-tabs>
</template>

<script>
    export default {
        name: "Admin",
        data() {
            return {
                users: [],
                posts: []
            };
        },
        created() {
            this.getUsers();
            this.getPosts();
        },
        methods: {
            getUsers: async function () {
                try {
                    let response = await this.$axiosNode('users/');
                    this.users = response.data;
                } catch (e) {
                    console.log(e);
                }
            },
            getPosts: async function () {
                try {
                    let response = await this.$axiosNode('post');
                    this.posts = response.data;
                } catch (e) {
                    console.log(e);
                }
            },
            ban: async function (id) {
                try {
                    await this.$axiosNode.post('user/ban', {id: id});
                    this.getUsers();
                } catch (e) {
                    console.log(e);
                }
            },
            shortDesc: function (desc) {
                if (desc === null || desc === "") {
                    return "...";
                } else if (desc.length > 51 && desc != null) {
                    return desc.toString().substring(0, 50) + '...';
                } else {
                    return desc;
                }
            },
            redirectToDetails(id) {
                this.$router.push("/post/" + id)
            }
        }
    }
</script>

<style scoped>

    .post {
        cursor: pointer;
    }

    .post:hover {
        background-color: var(--primary);
    }
</style>