const getters = {
	visitedViews: state => state.tagsView.visitedViews,
	showTags: state => state.common.showTags,
	breadCrumbs: state => state.common.breadCrumbs,
	breadCrumbsShow: state => state.common.breadCrumbsShow,
	themeClass: state => state.common.themeClass,
	language: state => state.common.language,
	smallQueryData: state => state.molecules.smallQueryData,
	smallDetailData: state => state.molecules.smallDetailData,
	orderBy: state => state.molecules.orderBy,
}
export default getters
