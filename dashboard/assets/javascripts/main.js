const treeMenuDataExample = [
	{ type: 'tree-item', label: 'Dashboard', data: 'dashboard', icon: 'layers' },
	{ type: 'tree-label', label: 'Pages' },
	{
		type: 'tree-group',
		label: 'Application',
		icon: 'dashboard',
		children: [
			{ type: 'tree-item', label: 'Chat', data: 'chat' },
			{ type: 'tree-item', label: 'Inbox', data: 'inbox' },
		],
	},
]

let siderbar, treeExample, toggleSidebar, toggleSidebarMobile, tabsContent, treeMenu

const setClassSidebar = windowWidth => {
	if (windowWidth <= 768) {
		siderbar.classList.remove('collapse')
		siderbar.classList.add('mobile')
	}
	if (windowWidth > 768 && windowWidth <= 1200) {
		siderbar.classList.remove('mobile')
		siderbar.classList.add('collapse')
	}
	if (windowWidth > 1200) {
		siderbar.classList.remove('mobile', 'collapse')
	}
}

window.addEventListener('load', () => {
	siderbar = document.getElementById('sidebar-example')
	treeExample = document.getElementById('tree-example')
	toggleSidebar = document.getElementById('toggle-sidebar')
	toggleSidebarMobile = document.getElementById('toggle-sidebar-mobile')

	treeMenu = new TreeMenuElement(treeExample)
	tabsContent = new TabsElement(document.getElementById('tabs-content'))

	setClassSidebar(window.innerWidth)

	toggleSidebar.onclick = () => {
		siderbar.classList.toggle('collapse')
	}
	toggleSidebarMobile.onclick = () => {
		siderbar.classList.toggle('preview')
	}
})

window.addEventListener('resize', () => {
	setClassSidebar(window.innerWidth)
})

window.addEventListener('click', e => {
	if (!e.target.closest('.sidebar')) {
		siderbar.classList.remove('preview')
	}
	if (e.target.closest('.tree-item')) {
		const treeItem = e.target.closest('.tree-item')
		tabsContent.add({
			key: treeItem.dataset.treeItem,
			label: treeItem.innerText,
			content: 'This is ' + treeItem.innerText,
		})
	}
	if (e.target.closest('.tabs-title-item')) {
		const tabsItem = e.target.closest('.tabs-title-item')
		const key = tabsItem.dataset.tabsKey
		treeMenu.actionItem(key)
	}
})
