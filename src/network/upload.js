import {$axios} from "./index";

export function upload(obj) {
  console.log(obj)
  return  $axios({

    url:'http://106.15.195.12:8000/'+'/login',
    method:'post',
    data:obj
  })
}
