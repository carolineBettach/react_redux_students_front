import { MY_SERVER_Students } from '../../app/env'
import axios from 'axios'

export function getStudents() {
    return new Promise((resolve) =>
        axios.get(MY_SERVER_Students).then(res => resolve({ data: res.data }))
    );
}
export function addStudent(student) {
    console.log("add",student)
    return new Promise((resolve) => 
        axios.post(MY_SERVER_Students,{"id":student.sID,"first_name":student.firstname,"last_name":student.lastname
            }).then(res => resolve({ data: res.data }))
    );
}
