class TreeMenuElement {
	constructor(element) {
		this.treeMenu = element
		this.listenEvent()
	}
	listenEvent() {
		const that = this
		this.treeMenu.addEventListener('click', e => {
			if (e.target.closest('.tree-item')) {
				const target = e.target.closest('.tree-item')
				const data = target.dataset.treeItem
				that.activeItem(data)
			}
			if (e.target.closest('.tree-group-title')) {
				const treeGroupTitle = e.target.closest('.tree-group-title')
				const treeGroup = treeGroupTitle.parentElement
				that.activeGroup(treeGroup)
			}
		})
	}
	setMaxHeightTreeGroupChildren(treeGroup, bool) {
		// const treeGroupChildren = treeGroup.querySelector('.tree-group-children')
		// if (bool) {
		// 	// treeGroupChildren.style.maxHeight = treeGroupChildren.scrollHeight + 'px'
		// 	treeGroupChildren.style.maxHeight = '1000px'
		// } else {
		// 	treeGroupChildren.style.maxHeight = null
		// }
	}
	clearAllActiveItem() {
		this.treeMenu.querySelectorAll('.tree-item').forEach(element => {
			element.classList.remove('active')
		})
	}
	clearAllExpandGroup() {
        const that = this
		this.treeMenu.querySelectorAll('.tree-group').forEach(item => {
			if (item.classList.contains('expand')) {
				item.classList.remove('expand')
				that.setMaxHeightTreeGroupChildren(item, false)
			}
		})
	}
	clearAllActiveExpand() {
		this.clearAllActiveItem()
		this.clearAllExpandGroup()
	}
	expandGroupAndParentByElement(element) {
        const that = this
		let treeGroup = element
		while (treeGroup) {
			if (treeGroup.classList.contains('tree-group')) {
				treeGroup.classList.add('expand')
				that.setMaxHeightTreeGroupChildren(treeGroup, true)
			}
			treeGroup = treeGroup.parentElement
		}
	}
	closeExpandGroupAndChildrenByElement(element) {
        const that = this
		element.querySelectorAll('.tree-group').forEach(item => {
			item.classList.remove('expand')
			that.setMaxHeightTreeGroupChildren(item, false)
		})
	}
	activeItem(data) {
		this.clearAllActiveExpand()
		const treeItem = this.treeMenu.querySelector(`.tree-item[data-tree-item='${data}']`)
		this.expandGroupAndParentByElement(treeItem)
		treeItem.classList.add('active')
	}
	activeGroup(treeGroup) {
		if (treeGroup.classList.contains('expand')) {
			treeGroup.classList.remove('expand')
			// this.closeExpandGroupAndChildrenByElement(treeGroup)
		} else {
            treeGroup.classList.add('expand')
			// this.clearAllExpandGroup()
			// this.expandGroupAndParentByElement(treeGroup)
		}
	}
}

window.addEventListener('load', () => {
	new TreeMenuElement(document.getElementById('tree-example'))
})
