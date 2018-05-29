<template>
  <div class="hello container">
    <div>
     <img src = "/static/logo.png" width="200">
    </div>
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
    <div class="columns">
      <div class="column">
        <b-field label="รหัสวิชา">
          <b-input v-model="subid"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="ชื่อวิชา">
          <b-input v-model="subname"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="หน่วยกิต">
          <b-select placeholder="เลือกหน่วยกิต">
            <option :value="3">3 หน่วยกิต</option>
            <option :value="1">1 หน่วยกิต</option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-field label="เกรด">
          <b-select placeholder="เลือกเกรด">
            <option v-for="option in grades" :value="option.value" :key="option.show">
              {{ option.show }}
            </option>
          </b-select>
        </b-field>
      </div>
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
      name: 'kanyaruk',
      grades: [
        {
          show: 'A',
          value: 4
        },
        {
          show: 'B+',
          value: 3.5
        },
        {
          show: 'B',
          value: 3
        },
        {
          show: 'C+',
          value: 2.5
        },
        {
          show: 'C',
          value: 2
        },
        {
          show: 'D+',
          value: 1.5
        },
        {
          show: 'D',
          value: 1
        },
        {
          show: 'F',
          value: 0
        }
      ]
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
