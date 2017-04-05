<template>
  <div>
    <button type="button" v-on:click="showSuccess()">Success</button>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {}
    },
    beforeCreate () {
//      console.info(this)
    },
    mounted () {
//      console.info(this)
//      console.info(this.$n)
//      this.$n.show(this.$n.login.success)
    },
    methods: {
      showSuccess () {
        console.info(this)
        console.info(this.data)
        console.info(this.$n)
        // this.$n.show(this.$n.login.success)
      }// ,
//      login () {
//        let a = 1
//        let b = 0
//        if (a > b) {
//          this.$n.login.success()
// //          this.$n(this.login.success)
//          this.$n.show(this.$n.login.success)
//          this.$n.show(this.$n.error.login)
//          this.toast(this.error.login)
//        }
//      }
    },
//    notifications: {
//      successMsg: {
//        type: 'success',
//        message: 'some'
//      }
//    },
//    $n: {
    notifications: {
      login: {
        timeout: 800,
        title: 'Login: ',
        success: {
          type: 'success',
//          title: `${this.title} success`,
          successOne: { msg: 'This is success', timeout: 300 },
          successTwo: 'This is success',
          successTree () {
            return { msg: 'my msg', timeout: 400 }
          }
        },
        error: {
          type: 'error',
//          title: `${this.title} error`,
          successOne: { msg: 'This is error' },
          successTwo: 'This is error'
        }
      },
      error: {
        type: 'error',
        timeout: 300,
        login: {
          msg: 'This is error',
          title: 'error'
        },
        register: 'Some register error',
        serverError () {
          return 'Some register error'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
