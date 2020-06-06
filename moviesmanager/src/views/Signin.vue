<template>
    <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
        <h1>Connexion</h1>
        <b-form @submit.prevent="trySubmit" class="text-left">
            <b-form-group
                    id="input-group-1"
                    label="Email:"
                    label-for="input-1"
            >
                <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Email"
                />
            </b-form-group>
            <b-form-group
                    id="input-group-2"
                    label="Mot de passe:"
                    label-for="input-2"
            >
                <b-form-input
                        id="input-2"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="Mot de passe"
                />
            </b-form-group>
            <b-list-group v-if="errors.length">
                <b-list-group-item v-for="error in errors" :key="error" variant="danger">{{error}}</b-list-group-item>
            </b-list-group>
            <b-button type="submit" variant="primary">Connexion</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "Signin",
        data() {
            return {
                form: {
                    email: "",
                    password: ""
                }
            };
        },
        computed: {
            errors() {
                return this.$store.getters['user/errors'];
            }
        },
        methods: {
            async trySubmit() {
                this.$store.dispatch("user/trySignin", this.form);
            },
        }
    }
</script>

<style scoped>

</style>