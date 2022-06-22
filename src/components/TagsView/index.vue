<template>
	<div id="tags-view-container" class="tags-view-container">
		<router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag)?'active':''"
			:to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span" class="tags-view-item"
			@click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
			@contextmenu.prevent.native="openMenu(tag,$event)">
			{{ tag.title }}
			<close-outlined style="font-size:8px;padding: 2px;text-align: center;border-radius: 50%"
				@click.prevent.stop="closeSelectedTag(tag)" />
			<!-- <span  class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" /> -->
		</router-link>
		<!-- <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu"> -->
		<!-- <li @click="refreshSelectedTag(selectedTag)">Refresh</li> -->
		<!-- <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li> -->
		<!-- 	<li @click="closeOthersTags">Close Others</li>
			<li @click="closeAllTags(selectedTag)">Close All</li> -->
		<!-- </ul> -->
	</div>
</template>

<script>
	import {
		message
	} from 'ant-design-vue';
	import {
		defineComponent,
		ref
	} from 'vue';
	export default defineComponent({
		components: {

		},
		setup() {
			return {

			};
		},
		computed: {
			visitedViews() {
        return this.$store.state.tagsView.visitedViews
			},
		},
		mounted() {

		},
		methods: {
			isActive(route) {
				return route.path === this.$route.path
			},
			isAffix(tag) {
				return tag.meta && tag.meta.affix
			},
			closeSelectedTag(view) {
				if (this.visitedViews.length == 1) {
					message.info('已经是最后一个页面了');
				} else {
					this.$store.dispatch('tagsView/delView', view).then(({
						visitedViews
					}) => {
						if (this.isActive(view)) {
							this.toLastView(visitedViews, view)
						}
					})
				}
			},
			toLastView(visitedViews, view) {
				const latestView = visitedViews.slice(-1)[0]
				if (latestView) {
					this.$router.push(latestView.fullPath)
				} else {
					this.$router.push('/homePage')
					this.$store.dispatch('tagsView/addView', view)
				}
			},
		}

	});
</script>

<style lang="scss">
	.tags-view-container {
		text-align: left;

		.tags-view-item {
			display: inline-block;
			position: relative;
			cursor: pointer;
			line-height: 26px;
			border: 1px solid #d8dce5;
			color: #495060;
			background: #fff;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			margin-top: 4px;

			.anticon-close:hover {
				background: #b4bccc;
			}

			&:first-of-type {
				margin-left: 15px;
			}

			&:last-of-type {
				margin-right: 15px;
			}

			&.active {
				background-color: #42b983;
				color: #fff;
				border-color: #42b983;

				&::before {
					content: '';
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
					margin-right: 2px;
				}
			}
		}
	}
</style>
