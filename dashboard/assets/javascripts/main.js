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

let siderbar, treeMenu, toggleSidebar, toggleSidebarMobile

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
	if (!e.target.closest('.sidebar') ) {
		siderbar.classList.remove('preview')
	}
})
