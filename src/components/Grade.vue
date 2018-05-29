<template>
  <div class="hello">
    Grade
  </div>
</template>

<script>
import firebase from 'firebase'
var config = {
  databaseURL: 'https://grade-6b43d.firebaseio.com'
}
firebase.initializeApp(config)

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
