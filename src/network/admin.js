import {$axios} from "./index";

export function adminBatch(obj) {
  console.log(obj)
  return  $axios({

    url:'http://localhost:7070'+'/admin/batch',
    method:'post',
    data:obj
  })
}

export function adminSingle(obj) {
  console.log(obj)
  return  $axios({

    url:'http://localhost:7070'+'/admin/single',
    method:'post',
    data:obj
  })
}

