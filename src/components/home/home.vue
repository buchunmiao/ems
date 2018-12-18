<template>
<el-container>
  <el-header>
  	<Top></Top>
  </el-header>
  <el-container>
    <el-aside width="200px">
    	<navBar></navBar>
    </el-aside>
    <el-main>
    	<router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Top from '@/components/common/top.vue'
import navBar from '@/components/common/navBar.vue'
export default {
	components:{
		Top,
		navBar
	},
	//当进入页面时需要验证否存在token
	created(){
		//得到token
		var token = localStorage.getItem('token');
		//判断是否存在token
		if(!token) {
			//跳转回登录首页
			this.$router.push({name:'login'});
		}
		//给所有的axios请求设置请求头
    this.$http.defaults.headers.common['Authorization'] = token;
	}
}
</script>

<style>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
   /*line-height: 200px;*/ 
  height: 100%;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}

</style>