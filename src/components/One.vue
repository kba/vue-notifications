<template>
  <div>
    <h4>This is ONE</h4>
    <button type="button" @click="successMsg()">Show from component One</button>
  </div>
</template>

<script>
  export default {
    name: 'One',
    data () {
      return {}
    },
    notifications: {
      successMsg: {
        type: 'success',
        title: 'Success!',
        message: 'Component 1 success'
      }
    }
  }
</script>

