import {$axios} from "./index";

export function adminBatch(obj) {
  console.log(obj)
  return  $axios({

    url:'/admin/batch',
    method:'post',
    data:obj
  })
}

export function adminSingle(obj) {
  console.log(obj)
  return  $axios({

    url:'/admin/single',
    method:'post',
    data:obj
  })
}

