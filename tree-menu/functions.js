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
	clearAllActiveItem() {
		this.treeMenu.querySelectorAll('tree-item').forEach(element => {
			element.classList.remove('active')
		})
	}
	clearAllExpandGroup() {
		this.treeMenu.querySelectorAll('tree-group').forEach(item => {
			if (item.classList.contains('expand')) {
				item.classList.remove('expand')
			}
		})
	}
	clearAllActiveExpand() {
		this.clearAllActiveItem()
		this.clearAllExpandGroup()
	}
	expandGroupAndParentByElement(element) {
		let treeGroup = element
		while (treeGroup) {
			if (treeGroup.nodeName === 'TREE-GROUP') {
				treeGroup.classList.add('expand')
			}
			treeGroup = treeGroup.parentElement
		}
	}
	closeExpandGroupAndChildrenByElement(element) {
		element.querySelectorAll('tree-group').forEach(item => {
			item.classList.remove('expand')
		})
	}
	activeItem(data) {
		this.clearAllActiveExpand()
		const treeItem = this.treeMenu.querySelector(`tree-item[data-tree-item='${data}']`)
		this.expandGroupAndParentByElement(treeItem)
		treeItem.classList.add('active')
	}
	activeGroup(treeGroup) {
		if (treeGroup.classList.contains('expand')) {
			this.closeExpandGroupAndChildrenByElement(treeGroup)
            treeGroup.classList.remove('expand')
		} else {
			this.clearAllExpandGroup()
			this.expandGroupAndParentByElement(treeGroup)
		}
	}
}

window.addEventListener('load', () => {
	new TreeMenuElement(document.getElementById('tree-menu'))
})
