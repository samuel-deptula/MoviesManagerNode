<template>
  <div class="user">
    <h1>Hello {{user.login}}</h1>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      user: {}
    }
  },
  created() {
    this.getUser();
  },
  computed: {
    userId() {
      let user = this.$store.getters['user/user'];
      return user.id;
    }
  },
  methods: {
    getUser: async function () {
      let response = await this.$axiosNode.get('/user/' + this.userId);
      this.user = response.data.user;
    }
  }
}
</script>