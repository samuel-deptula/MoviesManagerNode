<template>
    <div class="container-header d-flex w-100 flex-row justify-content-center align-items-center p-3">
        <router-link class="mr-3" to="/">MoviesManager</router-link>
        <router-link class="mr-3" to="/movie">Films</router-link>
        <router-link to="/serie">Séries</router-link>
        <div class="flex-fill"></div>
        <div class="d-flex flex-row">
            <div v-if="isLoggedIn === true">
                <b-nav-item-dropdown text="Lang">
                    <b-dropdown-item href="#"><router-link style="color: black;" class="mr-3" to="/profile">Profile</router-link></b-dropdown-item>
                </b-nav-item-dropdown>
                <router-link class="mr-3" to="/profile">Profile</router-link>
                <router-link class="mr-3" v-if="isAdmin" to="/admin">Admin</router-link>
                <b-button @click="logout">deconnexion</b-button>
            </div>
            <div v-else>
                <router-link to="/signin" class="mr-2">Connexion</router-link>
                <router-link to="/signup">Inscription</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TheHeader",
        methods: {
            logout() {
                this.$store.commit('user/signOut')
            },
        },
        computed: {
            isLoggedIn() {
               return this.$store.getters['user/isLoggedIn']
            },
            isAdmin() {
                let user = this.$store.getters['user/user'];
                return user.isAdmin;
            }
        }
    }
</script>

<style scoped>
    .container-header {
        background-color: #192a56;
        color: white;
    }

    a {
        color: white;
        text-decoration: none;
    }
</style>