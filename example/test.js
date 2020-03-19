let {Account,Rpc} = require ('../dist/index')
// import Zvcjs from '../dist/index'
// console.dir(zvcjs);
// const zvcjsss  = new zvcjs.Rpc('https://api.firepool.pro:8101')
// zvcjsss.Balance("zvb65a9d007994f1d6f20e523c10b4905eafed8493ca579f8003b2933785d8966b").then((res) => {
//   console.log(res)
// })
const acont = new Account()
console.log(acont.createdPrivKeyAndpubKeyAndaddr())