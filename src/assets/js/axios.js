import axios from 'axios'
//将axios封装为vue的插件
var Axios = {};
Axios.install = function(Vue){
	axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
	//将axios作为实例方法添加vue中
	//$http一个约定
	Vue.prototype.$http = axios;
}
export default Axios
