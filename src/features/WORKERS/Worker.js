import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updWorker } from './workerAPI';
import { selectWorkers, getWorkersAsync, addWorkerAsync, delWorkerAsync, UpdWorkersAsync, selectUpdate } from './workerSlice'
import { selectStudents,getStudenstAsync,selectStudentUpdate,addNewStudentAsync } from './studentsSlice'


const Worker = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectStudents);
  const studentsUpdate = useSelector(selectStudentUpdate);
  const workers = useSelector(selectWorkers);
  const workersUpdate = useSelector(selectUpdate);
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [sID, setsID] = useState("")
  const [sCourse, setsCourse] = useState("Math")
  const [sGrade, setsGrade] = useState("")
  const [sStudent, setsStudent] = useState("1-Caroline-Bettach")
  const [sStudentFilter, setsStudentFilter] = useState("All Students")
  const checkValidGrade = event => {
    
    let grade=event.target.value;
    if(grade<0 || grade>100)
    {
      alert("Please enter a  grade between 0 and 100!")
      event.target.value=""
      setsGrade("");
    }
    else{
      setsGrade(event.target.value);
    }
   
  }

  const addGrade = event => {
    if(sGrade=="" || sGrade<0 || sGrade>100)
    {
      alert("Please enter a  grade between 0 and 100!")  
    }
    else{
      console.log("HELP")
      console.log(workers.filter (s =>  (s.id == sStudent.split("-")[0]) && (s.course ==sCourse) ))
      let newWorker=workers.filter (s =>  (s.id == sStudent.split("-")[0]) && (s.course ==sCourse) )
      if(newWorker.length>=1)
      {
        alert("there is already a grade for student:"+sStudent+", for the course:"+sCourse)  
      }
      else{
        dispatch(addWorkerAsync({sStudent, sCourse, sGrade}))
        
      }
    
    }
  }
  const addNewStudent = event => {
    console.log("addNewStudent")
    console.log(sID)
    console.log(firstname)
    console.log(lastname)
    console.log(students)
    if(sID=="" )
    {
      alert("Please enter a  id")  
    }
    else if(firstname=="" )
    {
      alert("Please enter  firstname")  
    }
    else if(lastname=="")
    {
      alert("Please enter lastname")  
    }
    else{
      // console.log("HELP")
      console.log(students.filter (s =>  (s.id == sID) ))
      let newStudent=students.filter (s =>  (s.id == sID) )
      if(newStudent.length>=1)
      {
        alert("there is already a Student with id:"+sID+" !")  
      }
      else{
         dispatch(addNewStudentAsync({sID, firstname, lastname}))
         window.location.reload(false);

      }
    
    }
  }
  useEffect(() => {
    console.log("USE EFFECT!!")
    console.table(workers)
  }, [workers, workersUpdate])

  useEffect(() => {
    dispatch(getWorkersAsync())
  }, [workersUpdate])

  useEffect(() => {
    console.log("USE EFFECT STUDENTS!!")
    console.table(students)
  }, [students, studentsUpdate])

  useEffect(() => {
    dispatch(getStudenstAsync())
  }, [studentsUpdate])

  
  return (
    <div><h1>Students</h1><br /><hr />
      ID:<input type="number" onChange={(e) => setsID(e.target.value)} />
      First Name:<input onChange={(e) => setfirstname(e.target.value)} />
      Last_name Name:<input onChange={(e) => setlastname(e.target.value)} />
      <button onClick={addNewStudent} ><h3>add Student</h3></button><hr />
      <br />
      {students.map((wor, i) =>
        <div key={i}>
          ID:{wor.id},  first_name: {wor.first_name},  last_name:{wor.last_name}<br /> 
          <hr />
        </div>)}
      <h1>Students Grade</h1><br /><hr />
      Students<select onChange={(event) => setsStudent(event.target.value)} value={sStudent}>
      {students.map((s, i) =>
        <option key={i} value={s.id+"-"+s.first_name+"-"+s.last_name}>{s.id+"-"+s.first_name+"-"+s.last_name}</option>
        )}
        </select>
      Courses:<select onChange={(event) => setsCourse(event.target.value)} value={sCourse}>
        <option value="Math">Math</option>
        <option value="English">English</option>
        <option value="Computer">Computer</option>
      </select>
      Grade:<input type="number" onChange={checkValidGrade} min="0" max="100" required/>
      <button onClick={addGrade}><h3>add Grade</h3></button><hr />
      Filter by Students<select onChange={(event) => setsStudentFilter(event.target.value)} value={sStudentFilter}>
      <option key='-1' value='All Students'>All Students</option>
      {students.map((s, i) =>
        <option key={i} value={s.id+"-"+s.first_name+"-"+s.last_name}>{s.id+"-"+s.first_name+"-"+s.last_name}</option>
        )}
        </select><br />
        {/* total rows: {workers.length} */}
        <hr />
   
      {workers.filter(wor =>(sStudentFilter=='All Students') || (sStudentFilter!='All Students'  && wor.id == sStudentFilter.split('-')[0])).map((wor, i) =>
        <div key={i}>
          ID:{wor.id}<br />
          first_name: {wor.firstName}<br />
          last_name:{wor.lastName}<br />
          course:{wor.course}<br /> 
          grade:{wor.grade}<br /> 
          
           {/* <button onClick={() => dispatch(UpdWorkersAsync({firstname,lastname,wemail,wposition,wsalary,wstart,wmanager}))}>update</button>  */}
           {/* <button onClick={() => dispatch(delWorkerAsync(wor.email))}>delete</button>  */}
          <hr />
        </div>)}
    </div>
  )
}



export default Worker