<template>
<div>
<el-card class="box-card">
	<!--面包屑导航-->
	<el-breadcrumb separator-class="el-icon-arrow-right">
	  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
	  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
	</el-breadcrumb>
	<!--搜索区域-->
	<el-input placeholder="请输入内容" v-model="query" class="input-with-select">
	  <el-button slot="append" @click.prevent="search" icon="el-icon-search"></el-button>
	</el-input>
	<el-button type="success" @click="showAdd=true" plain>添加用户</el-button>
	<!--表格区域  :data="tableData" 数据源-->
	  <el-table border ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
	    <!-- el-table-column 表格组件容器-->
	    <el-table-column type="index" width="50"></el-table-column>
	    <el-table-column property="username"  label="姓名"></el-table-column>
	    <el-table-column property="email"  label="邮箱"></el-table-column>
	    <el-table-column  property="mobile" label="电话"></el-table-column>
	    <el-table-column label="用户状态">
	    	<template slot-scope="scope">
	    		<!--{{ scope.row.mg_state}}-->
	    		 <el-switch
	    		  @change="changeStatus(scope.row)"
				  v-model="scope.row.mg_state"
				  active-color="#13ce66"
				  inactive-color="#ff4949">
				</el-switch>
	    	</template>
	    </el-table-column>
	    <el-table-column label="操作">
	    	<template slot-scope="scope">
	    		<el-button @click="edit(scope.row.id)" type="primary" icon="el-icon-edit" plain size="mini"></el-button>
  				<el-button @click="setRole(scope.row)" type="success" icon="el-icon-check" plain size="mini"></el-button>
  				<el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" plain size="mini"></el-button>
	    	</template>
	    </el-table-column>
	  </el-table>
	  <!--分页区域
	  	layout 组件显示的结构
	  	@current-change="currentpage"  打开页面默认第几页
	  -->
	  <el-pagination
      	@size-change="sizeChange"
      	@current-change="currentChange"
      	:current-page="pagenum"
      	:page-sizes="sizes"
      	:page-size="pagesize"
      	layout="total, sizes, prev, pager, next, jumper"
      	:total="total">
      </el-pagination>
      <!--新增面板  
      el-dialog 对话框的组件
      :visible.sync 控制元素显示隐藏  值为布尔值
      -->
      <el-dialog title="添加用户" :visible.sync="showAdd">
	  <el-form :model="form" label-position="right">
	    <el-form-item label="用户名" :label-width="formLabelWidth">
	      <el-input v-model="form.username" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="密码" :label-width="formLabelWidth">
	      <el-input v-model="form.password" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="邮箱" :label-width="formLabelWidth">
	      <el-input v-model="form.email" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="电话" :label-width="formLabelWidth">
	      <el-input v-model="form.mobile" autocomplete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="cancleAdd">取 消</el-button>
	    <el-button type="primary" @click="add">确 定</el-button>
	  </div>
	</el-dialog>
	<!--修改面板-->
	<el-dialog title="修改用户" :visible.sync="showEdit">
	  <el-form :model="editForm" label-position="right">
	    <el-form-item label="用户名" :label-width="formLabelWidth">
	      <el-input disabled v-model="editForm.username" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="邮箱" :label-width="formLabelWidth">
	      <el-input v-model="editForm.email" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="电话" :label-width="formLabelWidth">
	      <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="cancleAdd">取 消</el-button>
	    <el-button type="primary" @click="postEdit">确 定</el-button>
	  </div>
	</el-dialog>
	<!--角色分配对话框-->
	<el-dialog title="角色分配" :visible.sync="showRole">
	  <el-form :model="objRole">
	    <el-form-item label="当前用户" :label-width="formLabelWidth">
	     <label>{{objRole.username}}</label>
	    </el-form-item>
	    <el-form-item label="分配角色" :label-width="formLabelWidth">
	      <el-select v-model="objRole.rid" placeholder="请选择">
	      	<el-option disabled label="请选择" :value="-1"></el-option>
	      		
	      	<!--abel="item.roleName"下拉框中显示的内容-->
		    <el-option
		      v-for="item in options"
		      :key="item.id"
		      :label="item.roleName"
		      :value="item.id">
		    </el-option>
		  </el-select>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="showRole = false">取 消</el-button>
	    <el-button type="primary" @click="postRole">确 定</el-button>
	  </div>
	</el-dialog>
</el-card>
</div>
</template>

<script>
	export default{
	data() {
      return {
      	 options: [],
        data:'',
        tableData: [],
        pagenum:1,
        pagesize:4,
        sizes:[2,4,6],
        pagesize:4,
        total:20,
        query:'',
        showAdd:false,
        showEdit:false,
        showRole:false,
        formLabelWidth: '100px',
        form:{
        	username:'',
        	password:'',
        	email:'',
        	mobile:''
        	
        },
        editForm:{
        	username:'',
        	email:'',
        	mobile:''
        },
        objRole:{
        	id:'',
        	username:'',
        	rid:''
        }
      }
    },
    methods:{
    	async getAllData(){
    	  var res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
    		var {data,meta:{msg,status}} = res.data
    		if(status === 200){
    			this.tableData = data.users
    			//将总数据量赋值给total
    			this.total = data.total
    		}
    	},
    	sizeChange(val){
    		//console.log('val');//页容量改变后的值
    		//改变页容量  并重新请求
    		this.pagesize=val
    		this.getAllData()
    	},
    	currentChange(val){
    		//console.log('currentChange');
    		//切换当前页,并重新请求
    		this.pagenum = val
			this.getAllData()
    	},
    	search(){
    		this.getAllData()
    		this.query=''
    	},
    	clearform(){
    		for(var item in this.form){
    			this.form[item]=''
    		}
    	},
    	async add(){
    		var res = await this.$http.post('users',this.form)
    		var {data,meta:{msg,status}}=res.data
    		if(status === 201){
    			this.$message({
    				message:msg,
    				type:'success'
    			})
    		}else{
    			this.$message.error(msg)
    		}
    		this.showAdd = false
    		//清除默认数据
    		this.clearform()
    	},
    	cancleAdd(){
    		//清除默认数据
    		this.clearform()
    	},
    	del(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
        //通过axios发送请求到服务器
        var res = await this.$http.delete(`users/${id}`)
        var {msg,status} =res.data.meta
        if(status===200){
        	this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.pagenum = 1
          this.getAllData()
        }else{
        	this.$message.error(msg)
        }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
		async edit(id){
			this.showEdit=true
			//通过axios发送请求到服务器
			var res = await this.$http.get(`users/${id}`)
			var {data,meta:{msg,status}}=res.data
			//console.log(data)
			if(status===200){
				this.editForm = data
			}
		},
		async postEdit(){
			var res = await this.$http.put(`users/${this.editForm.id}`,{
				mobile: this.editForm.mobile,
        		email: this.editForm.email
			})
			var {msg,status}=res.data.meta
			if(status === 200){
				this.$message({
					message:msg,
					type:'success'
				})
				this.getAllData()
			}else{
				this.$message.error(msg)
			}
			this.showEdit = false
		},
    	async changeStatus(row){
    		var res = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
    		var {msg,status} = res.data.meta
    		if(status === 200){
    			this.$message({
    				message:msg,
    				type:'success'
    			})
    		}else{
    			this.$message.error(msg);
    		}
    	},
    	async getAllRoles(){
    		var res = await this.$http.get('roles')
    		var {data,meta:{msg,status}}=res.data
    		if(status === 200){
    			this.options=data
    		}
    		
    	},
    	async setRole(row){
    		this.showRole=true
    		//发送请求到服务器,得到所有角色的数据
    		this.getAllRoles()
    		var res = await this.$http.get(`users/${row.id}`)
    		var {data,meta:{msg,status}}=res.data
    		if(status===200){
    			this.objRole=data
    		}
    	},
    	async postRole(){
    		var res = await this.$http.put(`users/${this.objRole.id}/role`,{
    			rid:this.objRole.rid
    		})
    		var {msg,status}=res.data.meta
    		if(status===200){
    			this.$message({
    				message:msg,
    				type:'success'
    			})
    		}else{
    			this.$message.error(msg)
    		}
    		this.showRole = false
    	},
    },
    created(){
    	this.getAllData()
    },
	}
</script>

<style>
	.input-with-select{
		width: 300px;
		margin-top: 20px;
	}
</style>