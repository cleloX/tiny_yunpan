import Axios from 'axios'




export function $axios(config){
  let http = Axios.create({
    baseURL: 'http://localhost:7070',
    timeout: 5000
  })

// 请求拦截
  http.interceptors.request.use((request) => {
    // request.headers['Authorization'] = sessionStorage.getItem('token')
    return request
  })

// 响应拦截
  http.interceptors.response.use((response) => {
    let res = response.data
    return {'status': true, 'msg': '请求成功！', 'data': res}
  },(err) => {
    let status = err.response.status
    console.log(status)
    if(status === 401){
      console.warn(`未登陆 or 登陆超时！`)
      sessionStorage.removeItem('token')
      return $router.push('/login')
    }else if(status === 403){
      console.warn(`没有操作权限！`)
      return $router.back()
    }else if(status === 400){
      return {'status': false, 'msg': err.response.data.detail}
    }else if(status === 422){   // 数据验证错误
      return {'status': false, 'msg': '数据验证错误！'}
    }
    // 异常处理
    const { code, message } = err
    if (code === 'ECONNABORTED' || message === 'Network Error') { // 请求超时
      console.warn(`请求超时，将在秒后重试`)
      return {'status': false, 'msg': '请求超时，将稍后重试！'}
    }
  })

  return http(config)
}
