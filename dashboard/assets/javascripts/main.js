let siderbar, treeExample, tabsContent, treeMenu, togglesidebarMobile

const setClassSidebar = windowWidth => {
	if (windowWidth <= 768) {
		siderbar.classList.remove('collapse')
		siderbar.classList.add('mobile')
		togglesidebarMobile.style.display = ''
	}
	if (windowWidth > 768 && windowWidth <= 1200) {
		siderbar.classList.remove('mobile')
		siderbar.classList.add('collapse')
		togglesidebarMobile.style.display = 'none'
	}
	if (windowWidth > 1200) {
		siderbar.classList.remove('mobile', 'collapse')
		togglesidebarMobile.style.display = 'none'
	}
}

window.addEventListener('load', () => {
	siderbar = document.getElementById('sidebar-example')
	treeExample = document.getElementById('tree-example')
	togglesidebarMobile = document.getElementById('toggle-sidebar-mobile')

	treeMenu = new TreeMenuElement(treeExample)
	tabsContent = new TabsElement(document.getElementById('tabs-content'))
	tabsContent.listenActive = key => treeMenu.actionItem(key)
	tabsContent.listenCloseAll = () => treeMenu.clearAll()

	setClassSidebar(window.innerWidth)
})

window.addEventListener('resize', () => {
	setClassSidebar(window.innerWidth)
})

window.addEventListener('click', e => {
	if (!e.target.closest('.sidebar')) {
		siderbar.classList.remove('preview')
	}
	if (e.target.closest('#toggle-sidebar')) {
		siderbar.classList.toggle('collapse')
	}
	if (e.target.closest('#toggle-sidebar-mobile')) {
		siderbar.classList.toggle('preview')
	}
	if (e.target.closest('.tree-item')) {
		const treeItem = e.target.closest('.tree-item')
		tabsContent.add({
			key: treeItem.dataset.treeKey,
			label: treeItem.innerText,
			content: 'This is ' + treeItem.innerText,
		})
	}
})
