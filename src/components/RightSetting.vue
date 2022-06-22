<template>
	<div ref="rightPanel" class="rightPanel-container" :class="{show:show}">
		<div class="rightPanel-background" />
		<div class="rightPanel">
			<div class="handle-button" @click.stop="show=!show" v-if="isLogin">
				<close-outlined v-if="show" />
				<setting-outlined v-if="!show" />
			</div>
			<div class="rightPanel-items">
				<div>
					<h3 class="drawer-title">系统布局设置</h3>
					<div class="drawer-item">
						<span>主题</span>
						<a-radio-group v-model:value="themeClass" style="float: right;" @change="radioChange">
							<a-radio :value="'dark'">黑色</a-radio>
							<a-radio :value="'light'">皓白</a-radio>
						</a-radio-group>
					</div>
					<div class="drawer-item">
						<span>开启 Tags-View</span>
						<a-switch v-model:checked="showTags" style="float: right;"
							@change="this.$store.dispatch('common/swichTags')" />
					</div>
					<div class="drawer-item">
						<span>开启面包屑导航</span>
						<a-switch v-model:checked="breadCrumbsShow" style="float: right;"
							@change="this.$store.dispatch('common/swichBreadCrumbsShows')" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue';
	import {
		addClass,
		removeClass
	} from '@/utils'
	export default defineComponent({
		components: {

		},
		setup() {
			return {
				show: ref(false),
        isLogin: ref(true),
				clickNotClose: ref(false)
			};
		},
		computed: {
			showTags() {
				return this.$store.state.common.showTags
			},
			breadCrumbsShow() {
				return this.$store.state.common.breadCrumbsShow
			},
			themeClass() {
				return this.$store.state.common.themeClass
			},
		},
		watch: {
			show(value) {
				if (value && !this.clickNotClose) {
					this.addEventClick()
				}
				if (value) {
					addClass(document.body, 'showRightPanel')
				} else {
					removeClass(document.body, 'showRightPanel')
				}
			},
      $route(val) {
        if(val.path == '/' || val.path == '/login') {
          this.isLogin = false
        } else {
          this.isLogin = true
        }
      }
		},
		mounted() {
      this.insertToBody()
		},
		methods: {
			radioChange(val) {
				this.$store.dispatch('common/saveThemeClass', val.target.value)
			},
			addEventClick() {
				window.addEventListener('click', this.closeSidebar)
			},
			closeSidebar(evt) {
				const parent = evt.target.closest('.rightPanel')
				if (!parent) {
					this.show = false
					window.removeEventListener('click', this.closeSidebar)
				}
			},
			insertToBody() {
				const elx = this.$refs.rightPanel
				const body = document.querySelector('body')
				body.insertBefore(elx, body.firstChild)
			}
		}

	});
</script>

<style lang="scss">
	.rightPanel-items {
		padding: 40px 24px;
		font-size: 14px;
		line-height: 1.5;
		word-wrap: break-word;

		.drawer-title {
			margin-bottom: 12px;
			color: rgba(0, 0, 0, .85);
			font-size: 14px;
			font-weight: 600;
			line-height: 22px;
		}

		.drawer-item {
			color: rgba(0, 0, 0, .65);
			font-size: 14px;
			padding: 14px 0;
		}

		.drawer-switch {
			float: right
		}
	}

	.rightPanel-background {
		position: fixed;
		top: 0;
		left: 0;
		opacity: 0;
		transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
		background: rgba(0, 0, 0, .3);
		z-index: -1;
	}

	.rightPanel {
		width: 100%;
		max-width: 260px;
		height: 100vh;
		position: fixed;
		top: 0;
		right: 0;
		box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
		transition: all .25s cubic-bezier(.7, .3, .1, 1);
		transform: translate(100%);
		background: #fff;
		z-index: 40000;
	}

	.show {
		transition: all .3s cubic-bezier(.7, .3, .1, 1);

		.rightPanel-background {
			z-index: 20000;
			opacity: 1;
			width: 100%;
			height: 100%;
		}

		.rightPanel {
			transform: translate(0);
		}
	}

	.handle-button {
		width: 48px;
		height: 48px;
		position: absolute;
		left: -48px;
		text-align: center;
		font-size: 24px;
		border-radius: 6px 0 0 6px !important;
		z-index: 0;
		pointer-events: auto;
		cursor: pointer;
		color: #fff;
		line-height: 48px;
		top: 250px;
		background-color: #1890ff;

		i {
			font-size: 24px;
			line-height: 48px;
		}
	}
</style>
