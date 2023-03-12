<template>
    <div>
        <p>用户：{{userName}}</p>
    </div> 
    <div class="flex flex-wrap items-center">
      <el-dropdown>
        <el-button type="primary">
          功能选择<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="show('insert')">密钥创建</el-dropdown-item>
            <el-dropdown-item @click="show('update')">密钥更新</el-dropdown-item>
            <el-dropdown-item @click="show('delete')">密钥删除</el-dropdown-item>
            <el-dropdown-item @click="show('token')">获取token</el-dropdown-item>
            <el-dropdown-item @click="show('encrypt')">对输入加密</el-dropdown-item>
            <el-dropdown-item @click="show('changepassword')">修改用户密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
    </el-dropdown> 
    </div>
    <div id="insert" class="mid" visual>
        <label></label>
        <el-button type="primary" @click="innsert">密钥创建</el-button>
    </div>
    <div id="update" class="mid" visual>
        <el-button type="primary" @click="update">密钥更新</el-button>
    </div>
    <div id="delete" class="mid" visual>
        <el-button type="primary" @click="deleteKey">密钥删除</el-button>
    </div>
    <div id="token" class="mid" visual>
        <p>请输入系统运行机器的ip地址</p>
        <el-input v-model="ip"></el-input>
        <p></p>
        <el-button type="primary" @click="token">获取token</el-button>
        <p></p>
        <p id="tokenMessage">{{tokenMessage}}</p>
    </div>
    <div id="encrypt" class="mid" visual>
        <p>请输入需要加密的明文</p>
        <el-input v-model="plainText"></el-input>
        <p></p>
        <el-button type="primary" @click="encrypt">对输入加密</el-button>
    </div>
    <div id="changepassword" class="mid" visual>
        <el-button type="primary" @click="changePassword">修改用户密码</el-button>
    </div>
  </template>
  
  <script>
  import { ArrowDown } from '@element-plus/icons-vue'
import { update } from 'lodash';
  class UserDto{
    id;
    userName;
    password;
    rootKey;
    userIp;
    token;
    logToken;
    message;
  }
  export default {
    data() {
        return {
            userName: window.sessionStorage.getItem('userName'),
            id: window.sessionStorage.getItem('id'),
            ip: '',
            plainText: '',
            tokenMessage: ''
        }
    },
    methods: {
        show(id){
            document.getElementById("insert").style.display = "none";
            document.getElementById("update").style.display = "none";
            document.getElementById("delete").style.display = "none";
            document.getElementById("token").style.display = "none";
            document.getElementById("encrypt").style.display = "none";
            document.getElementById("changepassword").style.display = "none";
            document.getElementById("tokenMessage").style.display = "none";
            document.getElementById(id).style.display = "block";
        },
        async innsert() {
            if(confirm('是否为用户 '+this.userName+' 创建密钥？')){
                let userDto = new UserDto();
                userDto.id = this.id;
                userDto.userName = this.userName;
                const { data: res } = await this.$http.post('key/generateKey', userDto);
                if (res.code !== 200) return this.$message.error(res.message)
                this.$message.success(res.message)
            }
        },
        async update() {
            if(confirm('是否为用户 '+this.userName+' 更新密钥？')){
                let userDto = new UserDto();
                userDto.id = this.id;
                userDto.userName = this.userName;
                const { data: res } = await this.$http.post('key/updateKey', userDto);
                if (res.code !== 200) return this.$message.error(res.message)
                this.$message.success(res.message)
            }
        },
        async deleteKey() {
            if(confirm('是否为用户 '+this.userName+' 删除密钥？')){
                let userDto = new UserDto();
                userDto.id = this.id;
                userDto.userName = this.userName;
                const { data: res } = await this.$http.post('key/deleteKey', userDto);
                if (res.code !== 200) return this.$message.error(res.message)
                this.$message.success(res.message)
            }
        },
        async token() {
            let userDto = new UserDto();
                userDto.id = this.id;
                userDto.userName = this.userName;
                userDto.userIp = this.ip;
                const { data: res } = await this.$http.post('key/getToken', userDto);
                if (res.code !== 200) return this.$message.error(res.message);
                alert(res.message);
                this.tokenMessage = res.body;
                document.getElementById("tokenMessage").style.display = 'block';
        },
        async encrypt() {
            let userDto = new UserDto();
                userDto.id = this.id;
                userDto.userName = this.userName;
                userDto.message = this.plainText;
                const { data: res } = await this.$http.post('key/encrypt', userDto);
                if (res.code !== 200) return this.$message.error(res.message)
                this.$message.success(res.message)
                alert('加密密文为:'+res.body);
        },
        changePassword(){
            alert('正在开发中');
        }
    }
}
  </script>
  <style scoped>
  .example-showcase .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }

  .mid{
	text-align: center;
	background-color: #fff;
	border-radius: 20px;
	width: 300px;
	height: 350px;
	margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
    display: none;
  }

  </style>
  