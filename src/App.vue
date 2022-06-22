<template>
	<a-config-provider :locale="zh_CN">
		<div id="app">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
			<right-setting></right-setting>
		</div>
	</a-config-provider>
</template>

<script>
	import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
	import RightSetting from "./components/RightSetting.vue"
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  dayjs.locale('zh-cn');
	import {
		defineComponent,
		ref
	} from 'vue';
	export default defineComponent({
		components: {
			RightSetting
		},
		setup() {
			return {
				zh_CN
			}
		},
	})
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
	}

	#nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}

	#components-layout-demo-custom-trigger .trigger {
		font-size: 18px;
		line-height: 64px;
		padding: 0 24px;
		cursor: pointer;
		transition: color 0.3s;
	}

	#components-layout-demo-custom-trigger .trigger:hover {
		color: #1890ff;
	}
</style>
