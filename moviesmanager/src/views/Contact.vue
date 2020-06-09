<template>
    <div class="user">
        <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
            <h1 class="p-4">Message</h1>
            <b-form @submit.prevent="trySubmit" class="text-left d-flex flex-column mx-auto col-lg-4">
                <b-form-group
                        id="input-group-1"
                        label="titre:"
                        label-for="input-1"
                >
                    <b-form-input
                            id="input-1"
                            v-model="message.title"
                            type="text"
                            placeholder="Titre"
                    />
                </b-form-group>
                <b-form-group
                        id="input-group-2"
                        label="Message:"
                        label-for="input-2"
                >
                    <b-form-textarea
                            id="textarea"
                            v-model="message.body"
                            placeholder="Message..."
                            rows="3"
                            max-rows="6"/>
                </b-form-group>
                <b-button class="col-lg-4 mx-auto mt-2" type="submit"  variant="primary">Envoyer</b-button>
                <b-alert class="mt-5" :show="show" variant="success">{{alert}}</b-alert>
            </b-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'contact',
        data () {
            return {
                user: {},
                message: {
                    title: "",
                    body: "",
                    author_id: "",
                    author_email: "",
                    date: ""
                },
                newPassword: "",
                alert: "",
                show: false
            }
        },
        components: {
        },
        created() {
            this.getUser();
        },
        computed: {
            userId() {
                let user = this.$store.getters['user/user'];
                return user.id;
            },
            date() {
                let date = new Date();
                return date.toLocaleDateString();
            }
        },
        methods: {
            getUser: async function () {
                let response = await this.$axiosNode.get('/user/' + this.userId);
                this.user = response.data.user;
            },
            trySubmit: async function () {
                this.message.author_id = this.user._id;
                this.message.author_email = this.user.email;
                this.message.date = this.date;
                this.alert = "";
                this.show = false;
                let response = await this.$axiosNode.post('post', this.message);
                this.alert = response.data.message;
                this.show = true;
                this.message.title = "";
                this.message.body = "";
            }
        }}
</script>

<style lang="css">
</style>