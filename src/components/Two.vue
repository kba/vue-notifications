<template>
  <div>
    <h4>This is TWO</h4>
    <button type="button" @click="warnMsg()">Show from component Two</button>
  </div>
</template>

<script>
  export default {
    name: 'Two',
    data () {
      return {}
    },
    notifications: {
      warnMsg: {
        type: 'warn',
        message: 'Component TWO warning'
      }
    }
  }
</script>

