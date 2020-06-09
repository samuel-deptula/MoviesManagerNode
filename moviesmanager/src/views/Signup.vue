<template>
    <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
        <h1>Inscription</h1>
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
                    label="Pseudo:"
                    label-for="input-2"
            >
                <b-form-input
                        id="input-2"
                        v-model="form.login"
                        type="text"
                        required
                        placeholder="Pseudo"
                />
            </b-form-group>
            <b-form-group
                    id="input-group-3"
                    label="Mot de passe:"
                    label-for="input-3"
            >
                <b-form-input
                        id="input-3"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="Mot de passe"
                />
            </b-form-group>
            <b-list-group v-if="formErrors.length">
                <b-list-group-item class="mb-3" v-for="error in formErrors" :key="error" variant="danger">{{error}}</b-list-group-item>
            </b-list-group>
            <b-button @click="trySubmit" type="submit" :class="{'disabled': isLoading}" variant="primary">Inscription</b-button>
        </b-form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Signup",
        data() {
            return {
                formErrors: [],
                form: {
                    email: "",
                    login: "",
                    password: ""
                }
            };
        },
        computed: {
            ...mapGetters("user", ["isLoading", "errors"])
        },
        watch: {
            errors(newValue) {
                this.formErrors = newValue;
            }
        },
        methods: {
            trySubmit() {
                if (!this.isLoading) {
                    this.$store.dispatch("user/trySignup", this.form)
                }
            },
        }
    }
</script>

<style scoped>

</style>