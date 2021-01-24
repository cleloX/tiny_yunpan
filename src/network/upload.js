import {$axios} from "./index";

export function upload(obj) {
  console.log(obj)
  console.log(typeof obj.multipartFile,'--',obj.multipartFile)
  return  $axios({
    url:'/file/upload',
    method:'post',
    data:obj
  })
}
