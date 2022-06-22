<template>
  <div class="login">
    <div>
      <h2>
        <svg-icon icon-class="logo" style="width:135px;height: 46px;color:#fff"></svg-icon>
        <p>光之树后台管理系统</p>
      </h2>
    </div>
    <div>
      <a-form
          :model="formState"
          name="basic"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
          @finish="onFinish">
        <a-form-item label="" style="margin-bottom: 10px">
          <p style="font-size: 30px;margin: 0px;font-weight:600;text-align: left;color: #333333">欢迎登录</p>
        </a-form-item>
        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名！' }]">
          <a-input v-model:value="formState.username" placeholder="用户名">
            <template #prefix>
              <svg-icon icon-class="user" style="width: 16px;height: 16px"></svg-icon>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码！' }]">
          <a-input type="password" v-model:value="formState.password" placeholder="密码">
            <template #prefix>
              <svg-icon icon-class="password" style="width: 16px;height: 16px"></svg-icon>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" shape="round" html-type="submit" class="loginBtn">登录</a-button>
        </a-form-item>
        <a-form-item>
          <div class="flex">
            <a-checkbox v-model:checked="formState.remember" style="color: #666666">自动登录</a-checkbox>
            <span style="color: #3C99F9;">忘记密码？</span>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref
} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {login} from '../serves/index'
import {setLocalStorage} from '../serves/localStorage'

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },

  setup() {
    const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });
    return {
      formState
    };
  },
  mounted() {
  },
  methods: {
    onFinish(value) {
      let params = {
        username: value.username,
        password: value.password
      }
      login(params).then(res => {
        console.log(res);
        setLocalStorage('access_token',`${res.token_type} ${res.access_token}`)
        this.$router.push({
          path: '/index'
        })
      })
    }
  }
});
</script>

<style lang="scss">
.login {
  background-image: url("../assets/bgc.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  padding: 250px 300px;
  display: flex;
  justify-content: space-between;

  h2 {
    font-size: 48px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 67px;
    text-align: left;
  }

  .ant-form {
    width: 360px;
    background: #fff;
    border-radius: 5px;
    padding: 50px 40px 26px;
  }

  .ant-form-item {
    text-align: center;
    margin-bottom: 24px;
  }

  .loginBtn {
    width: 100%;
    border: none;
    background: linear-gradient(139deg, #FFAE42 0%, #FF7835 100%);
    border-radius: 2px;
  }

  .ant-checkbox-checked::after {
    border: none;
  }

  .ant-input-affix-wrapper > input.ant-input {
    color: #666666;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background: linear-gradient(139deg, #FFAE42 0%, #FF7835 100%);
    border: none;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #d9d9d9;
  }

}

</style>