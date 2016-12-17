<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted () {
      this.successMsg()
    },
    method: {
      login () {
        let a = 1
        let b = 0
        if (a > b) {
          this.$n.login.success()
//          this.$n(this.login.success)
          this.$n.show(this.$n.login.success)
          this.$n.show(this.$n.error.login)
        }
      }
    },
    notifications: {
      successMsg: {
        type: 'success',
        message: 'some'
      }
    }// ,
//    $n: {
//      login: {
//        timeout: 800,
//        title: 'Login: ',
//        success: {
//          type: 'success',
//          title: `${this.title} success`,
//          successOne: { msg: 'This is success', timeout: 300 },
//          successTwo: 'This is success',
//          successTree () {
//            return { msg: 'my msg', timeout: 400 }
//          }
//        },
//        error: {
//          type: 'error',
//          title: `${this.title} error`,
//          successOne: { msg: 'This is error' },
//          successTwo: 'This is error'
//        }
//      },
//      error: {
//        type: 'error',
//        timeout: 300,
//        login: {
//          msg: 'This is error',
//          title: 'error'
//        },
//        register: 'Some register error',
//        serverError () {
//          return 'Some register error'
//        }
//      }
//    }
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
