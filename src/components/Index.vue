<template>
	<div id="main-container" :class="themeClass">
		<side-bar>
			<router-view />
		</side-bar>
	</div>
</template>

<script>
	import SideBar from './SideBar'
	import {
		defineComponent,
		ref
	} from 'vue';
	export default defineComponent({
		components: {
			SideBar
		},
		setup() {
			return {
				visible: ref([false])
			}
		},
		computed: {
			themeClass() {
				return this.$store.state.common.themeClass
			}
		},
		mounted() {
			let view = {
				path: this.$route.path,
				query: '',
				fullPath: this.$route.fullPath,
				title: this.$route.meta.title,
			}
			this.$store.dispatch('tagsView/addView', view)
			let breadCrumbs = []
			if (this.$route.meta.parentTitle) breadCrumbs.push(this.$route.meta.parentTitle)
			if (this.$route.meta.title) breadCrumbs.push(this.$route.meta.title)
			this.$store.dispatch('common/saveBreadCrumbs', breadCrumbs)
		},
	})
</script>

<style lang="scss">
	.ant-table-thead>tr>th,
	.ant-table-tbody>tr>td {
		padding: 10px;
	}
	
	.ant-layout.ant-layout-has-sider {
		height: auto !important;
	}

	.ant-form-item {
		margin-bottom: 10px;
	}

	.ant-breadcrumb-separator {
		margin: 0px;
	}

	.ant-layout-content {
		padding: 0px 10px !important;
	}

	.ant-layout.ant-layout-has-sider {
		min-height: 100vh;
	}
</style>
