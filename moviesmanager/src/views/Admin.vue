<template>
    <b-list-group horizontal="" id="usersList" class="listGroup">
        <b-list-group-item class="movieItem" v-for="user in users" :key="user.id">
            <p>{{user}}</p>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    export default {
        name: "Admin",
        data() {
            return {
                users: [],
            };
        },
        created() {
            this.getUsers();
        },
        methods: {
            getUsers: async function() {
                try {
                    let response = await this.$axiosNode('users');
                    this.users = response.data;
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
</script>

<style scoped>

</style>