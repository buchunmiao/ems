<template>
<div class="login">
	<!--label-position="top"定对齐-->
	<el-form v-model="loginObj" status-icon ref="ruleForm2" label-position="top" label-width="100px" class="demo-ruleForm">
	  <h2>用户登录</h2>
	  <el-form-item label="用户名">
	    <el-input v-model="loginObj.username" type="text" autocomplete="off"></el-input>
	  </el-form-item>
	  <el-form-item  label="密码" prop="checkPass">
	    <el-input v-model="loginObj.password" type="password" autocomplete="off"></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button class="btn" type="primary" @click.prevent = "login">登录</el-button>
	  </el-form-item>
	</el-form>
</div>
</template>

<script>
	export default {
		data(){
			return {
				loginObj:{
					username:'admin',
					password:'123456'
				}
			}
		},
		methods:{
			async login(){
				var res =  await this.$http.post('login',this.loginObj)
				var {data,meta:{msg,status}} =res.data
					if(status === 200){
						//保存token
						window.localStorage.setItem('token',data.token);
						this.$message({
							message:msg,
							type:'success'
						})
						this.$router.push('/')
					}else{
					this.$message.error(msg)
					}
			}
		}
	}
</script>

<style>
	.login {
		position: relative;
	}
	.el-form {
		width: 500px;
		background: #fff;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		margin-top: 120px;
		padding: 40px;
	}
	.btn{
		width:100%
	}
</style>