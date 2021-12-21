const treeMenuData = [
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

const dataTabsExample = [
	{
		key: 'i1',
		label: 'item 1',
		content: '<div>This is item 1</div>',
	},
	{
		key: 'i2',
		label: 'item 2',
		content: '<div>This is item 2</div>',
	},
	{
		key: 'i3',
		label: 'item 3',
		content: '<div>This is item 3</div>',
	},
	{
		key: 'i4',
		label: 'item 4',
		content: '<div>This is item 4</div>',
	},
	{
		key: 'i5',
		label: 'item 5',
		content: '<div>This is item 5</div>',
	},
	{
		key: 'i6',
		label: 'item 6',
		content: '<div>This is item 6</div>',
	},
	{
		key: 'i7',
		label: 'item 7',
		content: '<div>This is item 7</div>',
	},
	{
		key: 'i8',
		label: 'item 8',
		content: '<div>This is item 8</div>',
	},
]

let siderbar, treeMenu, toggleSidebar, toggleSidebarMobile, tabsContent

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
	treeMenu = document.getElementById('tree-example')
	toggleSidebar = document.getElementById('toggle-sidebar')
	toggleSidebarMobile = document.getElementById('toggle-sidebar-mobile')

	const treeExample = new TreeMenuElement(treeMenu)
	tabsContent = new TabsElement(document.getElementById('tabs-content'), dataTabsExample)

	setClassSidebar(window.innerWidth)

	toggleSidebar.onclick = () => {
		siderbar.classList.toggle('collapse')
	}
	toggleSidebarMobile.onclick = () => {
		siderbar.classList.toggle('preview')
	}

	document.getElementById('btn-test-click').onclick = () => {
		const exampleData = [
			'level-1.1.1.1.2',
			'sign-in',
			'sign-up',
			'google-map',
			'level-1.1.2',
			'toasts',
			'buttons',
			'chat',
			'inbox',
			'documents',
			'column-search',
			'charts',
			'editor',
			'validation',
			'input-basic',
			'input-groups',
			'layouts',
		]
		const random = Math.floor(Math.random() * exampleData.length)
		console.log(exampleData[random])
		treeExample.actionItem(exampleData[random])
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
		const key = treeItem.dataset.treeItem
		const label = treeItem.innerText
		const content = 'This is ' + label
		tabsContent.add({ key, label, content })
	}
})
