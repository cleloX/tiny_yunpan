import {$axios} from "./index";

export function getFileList(obj) {
  return  $axios({
    url:'/file/find',
    method:'post',
    data:obj
  })
}
