<template>
  <div class="user">
    <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
    <h1>Editer Profile</h1>
    <b-form @submit.prevent="trySubmit" class="text-left">
      <b-form-group
              id="input-group-1"
              label="Email:"
              label-for="input-1"
      >
        <b-form-input
                id="input-1"
                value="samuel.deptula@viacesi.fr"
                v-model="user.email"
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
                value="Farenays"
                v-model="user.login"
                type="text"
                required
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
                value="Wypeh189"
                v-model="newPassword"
                type="password"
                required
                placeholder="Nouveau mot de passe"
        />
      </b-form-group>
      <b-button @click="trySubmit" type="submit" :class="{'disabled': isLoading}" variant="primary">Appliquer</b-button>
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
      newPassword: ""
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
}}
</script>

<style lang="css">
</style>