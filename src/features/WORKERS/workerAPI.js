import { MY_SERVER } from '../../app/env'
import axios from 'axios'


export function getWorkers() {
    return new Promise((resolve) =>
        axios.get(MY_SERVER).then(res => resolve({ data: res.data }))
    );
}
export function addWorker(worker) {
    console.log("add",worker)
    return new Promise((resolve) => 
        axios.post(MY_SERVER,{"id":worker.sStudent.split('-')[0],"firstName":worker.sStudent.split('-')[1],"lastName":worker.sStudent.split('-')[2],"course":worker.sCourse, "grade":worker.sGrade  
            }).then(res => resolve({ data: res.data }))
    );
}

export function delWorker(email) {
    return new Promise((resolve) =>
        axios.delete(MY_SERVER+"/"+ email).then(res => resolve({ data: res.data }))
    );
}

export function updWorker(worker) {
    console.log(worker)
    
    return new Promise((resolve) =>
        axios.put(MY_SERVER+"/"+ worker.wemail,{"id":worker.sStudent.split('-')[0],"firstName":worker.sStudent.split('-')[1],"lastName":worker.sStudent.split('-')[2],"course":worker.sCourse, "grade":worker.sGrade  
    }).then(res => resolve({ data: res.data }))
    );
}