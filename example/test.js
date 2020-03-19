let {zvcjs} = require ('../dist/index')
// import Zvcjs from '../dist/index'
console.dir(zvcjs);
const zvcjsss  = new zvcjs('http://node1.zvchain.io:8101/')
zvcjsss.Balance("zv9eae37dbc0c3a076fe9981fbb050ebd29dfa9f3a6b1a4a8ef91e9604356e8801").then((res) => {
  console.log(res)
})