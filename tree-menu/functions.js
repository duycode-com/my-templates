class TreeMenuElement {
	constructor(element) {
		this.treeMenu = element
		this.listenEvent()
	}
	listenEvent() {
		const that = this
		this.treeMenu.addEventListener('click', e => {
			if (e.target.closest('tree-item')) {
				const target = e.target.closest('tree-item')
				const data = target.dataset.treeItem
				that.activeItem(data)
			}
			if (e.target.closest('tree-group-title')) {
				const treeGroupTitle = e.target.closest('tree-group-title')
				const treeGroup = treeGroupTitle.parentElement
				that.activeGroup(treeGroup)
			}
		})
	}

	clearActiveItem() {
		this.treeMenu.querySelectorAll('tree-item').forEach(element => {
			element.classList.remove('active')
		})
	}
	clearExpandGroup() {
		this.treeMenu.querySelectorAll('tree-group').forEach(item => {
			item.classList.remove('expand')
		})
	}
	clearActiveExpandAll() {
		this.clearActiveItem()
		this.clearExpandGroup()
	}

	expandGroupByElement(element) {
		let treeGroup = element
		while (treeGroup) {
			if (treeGroup.nodeName === 'TREE-GROUP') {
				treeGroup.classList.add('expand')
			}
			treeGroup = treeGroup.parentElement
		}
	}
	activeItem(data) {
		this.clearActiveExpandAll()
		const treeItem = this.treeMenu.querySelector(`tree-item[data-tree-item='${data}']`)
		this.expandGroupByElement(treeItem)
		treeItem.classList.add('active')
	}
	activeGroup(element) {
		const treeGroupChildren = element.querySelector('tree-group-children')
		if (element.classList.contains('expand')) {
			element.classList.remove('expand')
			// element.style.height = '100px'
			return
		}
		this.clearExpandGroup()
		this.expandGroupByElement(treeGroupChildren)
		// element.style.height = '300px'
		// console.log(element.style.height);
	}
}

window.addEventListener('load', () => {
	new TreeMenuElement(document.getElementById('tree-menu'))
})
