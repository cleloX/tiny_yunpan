import {$axios} from "./index";

export function login(obj) {
  return  $axios({

    url:'http://localhost:7070'+'/user/login',
    method:'post',
    data:obj
  })
}
