import {$axios} from "./index";

export function login(obj) {
  return  $axios({

    url:'/user/login',
    method:'post',
    data:obj
  })
}
