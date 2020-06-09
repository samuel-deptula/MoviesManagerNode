<template>
    <b-list-group id="usersList" class="listGroup">
        <b-list-group-item class="movieItem" v-for="user in users" :key="user.id">
            <p>{{user.email}}</p>
            <p>{{user.login}}</p>
            <b-button @click="ban(user._id)" v-if="!user.isBanned">Ban</b-button>
            <b-button  @click="ban(user._id)" v-else>Deban</b-button>
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
            },
            ban: async function(id) {
                try {
                    await this.$axiosNode.post('user/ban',{id: id});
                    this.getUsers();
                } catch (e) {
                    console.log(e);
                }

            }
        }
    }
</script>

<style scoped>

</style>