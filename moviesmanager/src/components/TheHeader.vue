<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">
            <router-link class="mr-3" to="/">MoviesManager</router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item-dropdown text="Films">
                    <b-dropdown-item>
                        <router-link style="color: black;" class="mr-3" to="/movie">Recherche</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link style="color: black;" class="mr-3" to="/movie/list">Liste</router-link>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav v-if="isLoggedIn === true" class="ml-auto">
                <b-nav-item-dropdown right text="Profil">
                    <b-dropdown-item>
                        <router-link style="color: black;" class="mr-3" to="/profile">Edition profil
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link style="color: black;" class="mr-3" to="/profil/movie">Favoris</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link style="color: black;" class="mr-3" to="/profil/watched">Vus</router-link>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item v-if="isAdmin"><router-link class="mr-3" to="/admin">Admin</router-link></b-nav-item>
                <b-nav-item><router-link class="mr-3" to="/contact">Contactez nous</router-link></b-nav-item>
                <b-button variant="danger" @click="logout">Déconnexion</b-button>
            </b-navbar-nav>
            <b-navbar-nav v-else class="ml-auto">
                <router-link to="/signin" class="mr-2">Connexion</router-link>
                <router-link to="/signup">Inscription</router-link>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
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