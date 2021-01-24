import {$axios} from "./index";

export function delFile(obj) {
  return  $axios({
    url:'/file/delete',
    method:'post',
    data:obj
  })
}

export function recycle(obj) {
  return  $axios({
    url:'/file/recycle',
    method:'post',
    data:obj
  })
}

