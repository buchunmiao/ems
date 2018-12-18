<template>
<el-row>
  <el-col :span="4">
  	<div class="grid-content bg-purple logo">我的logo</div>
  </el-col>
  <el-col :span="16">
  	<div class="grid-content bg-purple-light title">电商后台管理系统</div>
  </el-col>
  <el-col :span="4">
  	<div class="grid-content bg-purple logout"><a href="#" @click.prevent="logout">退出</a></div>
  </el-col>
</el-row>
</template>

<script>
	export default {
		 methods: {
      logout() {
        this.$confirm('确定退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	//清空localStorage
        	localStorage.removeItem('token');
        	//跳转回登录页面
        	this.$router.push({name:'login'});
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          }); 
        });
      }
    }
	}
</script>

<style>
	.logo {
		text-align: left;
	}
	.title{
		font-size: 24px;
		color: #fff;
	}
	.logout {
		text-align: right;
	}
</style>