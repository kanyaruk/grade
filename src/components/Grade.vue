<template>
  <div class="hello container">
    Grade
    <div class="columns">
      <div class="column">
        <b-field label="รหัสนักศึกษา">
          <b-input v-model="sid"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="ชื่อ-สกุล">
          <b-input v-model="name"></b-input>
        </b-field>
      </div>
    </div>
    <div class="columns column is-centered">
      <button class="button is-success" @click="addStudent(sid, name)">ADD</button>
    </div>
    <div class="columns">
      <ui :key="student.sid" v-for="student in students">
        <li>{{student.sid}} {{student.name}}</li>
      </ui>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
var config = {
  databaseURL: 'https://grade-6b43d.firebaseio.com'
}
firebase.initializeApp(config)
var db = firebase.database()
var gradeRef = db.ref('/grade')
export default {
  name: 'HelloWorld',
  data () {
    return {
      students: {},
      sid: '5806021631017',
      name: 'kanyaruk'
    }
  },
  methods: {
    addStudent (sid, name) {
      gradeRef.child(sid).set({
        sid,
        name
      })
      this.sid = ''
      this.name = ''
    }
  },
  created () {
    gradeRef.on('value', snap => {
      this.students = snap.val()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
