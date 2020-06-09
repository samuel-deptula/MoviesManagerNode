<template>
  <div class="user">
    <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
    <h1 class="p-4">Edition Profil</h1>
    <b-form @submit.prevent="trySubmit" class="text-left d-flex flex-column mx-auto col-lg-4">
      <b-form-group
              id="input-group-1"
              label="Email:"
              label-for="input-1"
      >
        <b-form-input
                id="input-1"
                v-model="user.email"
                type="email"
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
                v-model="user.login"
                type="text"
                placeholder="Pseudo"
        />
      </b-form-group>
      <b-form-group
              id="input-group-3"
              label="Nouveau mot de passe:"
              label-for="input-3"
      >
        <b-form-input
                id="input-3"
                v-model="newPassword"
                type="password"
                placeholder="Nouveau mot de passe"
        />
      </b-form-group>
      <b-button class="col-lg-4 mx-auto mt-2" type="submit"  variant="primary">Appliquer</b-button>
      <b-alert class="mt-5" :show="show" variant="success">{{alert}}</b-alert>
    </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      user: {},
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
    }
  },
  methods: {
    getUser: async function () {
      let response = await this.$axiosNode.get('/user/' + this.userId);
      this.user = response.data.user;
    },
    trySubmit: async function () {
      this.alert = "";
      this.show = false;
      this.user.password = this.newPassword;
      let response = await this.$axiosNode.put('user', this.user);
      this.alert = response.data.message;
      this.show = true;
      this.newPassword = "";
    }
}}
</script>

<style lang="css">
</style>