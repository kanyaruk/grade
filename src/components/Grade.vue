<template>
  <div class="hello container">
    <div class="logo">
      <img src="/static/logo.png" width="150" height="150">
    </div>
    <div class="columns">
      <div class="column">
        <b-field label="รหัสนักศึกษา">
          <b-input type="number" v-model="sid"></b-input>
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
      <div>
        <li :key="student.sid" v-for="student in students">
          <div class="columns">
            <div class="column">
              {{student.sid}}
            </div>
            <div class="column">
              {{student.name}}
            </div>
            <div class="column">
              {{calGrade(student.subjects)}}
            </div>
            <div class="column columns">
              <div class="column">
                <button v-if="(student.subjects && Object.keys(student.subjects).length < 7) || !student.subjects" class="button" @click="showAddSub(student.sid)">เพิ่มวิชา</button>
                <button class="button" disabled v-else>ห้ามเพิ่มวิชามากกว่า 7 วิชาเรียน</button>
              </div>
            </div>
          </div>

          <ui>
            <li :key="subject.subid" v-for="subject in student.subjects">
              {{subject.subid}} {{subject.subname}} {{subject.unit}} {{subject.grade.show}}
              <button v-if="Object.keys(student.subjects).length > 3" class="button is-danger" @click="removeSub(student.sid,subject.subid, student, subject)">ถอนวิชานี้</button>
              <button class="button" disabled v-else>ถอนไม่ได้ วิชาน้อยเกินไป</button>
            </li>
          </ui>

        </li>
      </div>
    </div>
    <b-modal :active.sync="isModalActive">
      <div class="card card-content">

        <b-field label="รหัสวิชา">
          <b-input type="number" v-model="subid"></b-input>
        </b-field>

        <b-field label="ชื่อวิชา">
          <b-input v-model="subname"></b-input>
        </b-field>
        <div class="columns">
          <div class="column">
            <b-field label="หน่วยกิต">
              <b-select v-model="unit" placeholder="เลือกหน่วยกิต">
                <option :value="3">3 หน่วยกิต</option>
                <option :value="1">1 หน่วยกิต</option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <b-field label="เกรด">
              <b-select v-model="grade" placeholder="เลือกเกรด">
                <option v-for="option in grades" :value="option" :key="option.show">
                  {{ option.show }}
                </option>
              </b-select>
            </b-field>
          </div>
        </div>
        <div class="columns is-centered">
          <button class="button is-success" @click="addSub(subid, subname, unit, grade)">เพิ่มวิชา</button>
        </div>
      </div>
    </b-modal>
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
      isModalActive: false,
      students: {},
      sid: '',
      name: '',
      subid: '',
      subname: '',
      unit: '',
      grade: '',
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
      ],
      stdActive: ''
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
    },
    showAddSub (sid) {
      this.stdActive = sid
      this.isModalActive = true
    },
    addSub (subid, subname, unit, grade) {
      gradeRef.child(`${this.stdActive}/subjects/${subid}`).set({
        subid, subname, unit, grade
      })
      this.isModalActive = false
    },
    removeSub (sid, subid, std, sub) {
      console.log(sid, subid)
      this.$swal({
        title: `แน่ใจนะ ว่าจะถอนวิชา ${sub.subname} ออกจากระบบ?`,
        text: 'ไม่สามารถกลับมาแก้ไขได้นะ ถ้าถอนสำเร็จ!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่ ถอนวิชานี้!'
      }).then((result) => {
        if (result.value) {
          gradeRef.child(`${sid}/subjects/${subid}`).remove()
          this.$swal(
            'สำเร็จ!',
            'ถอนวิชาเสร็จสิ้นแล้ว.',
            'success'
          )
        }
      })
    },
    calGrade (subject) {
      if (!subject) {
        return '0.00'
      } else {
        const arrSub = Object.values(subject)
        const unitTotal = arrSub.reduce((prev, curr) => prev + curr.unit, 0)
        const pointTotal = arrSub.reduce((prev, curr) => prev + (curr.unit * curr.grade.value), 0)
        return parseFloat(pointTotal / unitTotal).toFixed(2)
      }
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
.logo {
text-align: center;
margin: 10px;
}
</style>
