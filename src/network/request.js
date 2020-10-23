import axios from 'axios'

export function request(config){  
      const instance=axios.create({
          baseURL:'http://www.wwyyyy.shop',
          timeout:5000
      })      
      return instance(config)
  
}

export function request1(config){
  const instance1=axios.create({
      baseURL:'http://116.62.181.150',
      timeout:5000
  })
  return instance1(config);
}

// export function allAxios (promiseArray) {
//     // 这个其实可以直接axios.all(promiseArray)，为何需要再增加一层Promise？
//     // 这里是有原因的：
//     // 1、如果直接axios.all(promiseArray)，请求成功或失败的处理是交由使用者
//     // 2、这里封装多一层Promise，是便于此处封装时考虑添加公共处理如开启遮罩层关闭遮罩层，之后才抛出调用结果给调用方，而不应该由调用方赖关闭遮罩层
//     return new Promise((resolve, reject) => {
//       axios.all(promiseArray)
  
//         .then(allResponse => {
//           resolve(allResponse)
//         })
//         .catch((error) => {
//           reject(error)
//         })
  
//     })
  
//   }