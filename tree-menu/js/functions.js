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
				that.actionItem(data)
			}
			if (e.target.closest('.tree-group-title')) {
				const treeGroupTitle = e.target.closest('.tree-group-title')
				const treeGroup = treeGroupTitle.parentElement
				that.actionGroup(treeGroup)
			}
		})
	}

	clearAllActiveItem() {
		this.treeMenu.querySelectorAll('.tree-item.active').forEach(item => {
			item.classList.remove('active')
		})
	}
	clearAllExpandGroup() {
		this.treeMenu.querySelectorAll('.tree-group.expand').forEach(item => {
			item.classList.remove('expand')
			item.querySelector('.tree-group-children').style.maxHeight = null
		})
	}
	activeItem(treeItem) {
		this.clearAllActiveItem()
		this.clearAllExpandGroup()
		treeItem.classList.add('active')
	}
	activeGroup(treeGroup) {
		this.clearAllExpandGroup()
		let treeGroupParent = treeGroup
		while (treeGroupParent) {
			if (treeGroupParent.classList.contains('tree-group')) {
				treeGroupParent.classList.add('expand')
			}
			treeGroupParent = treeGroupParent.parentElement
		}
		this.setMaxHeightExpandTreeGroup()
	}
	deActiveGroup(treeGroup) {
		treeGroup.classList.remove('expand')
		treeGroup.querySelector('.tree-group-children').style.maxHeight = null
		treeGroup.querySelectorAll('.tree-group').forEach(item => {
			item.classList.remove('expand')
			item.querySelector('.tree-group-children').style.maxHeight = null
		})
	}
	setMaxHeightExpandTreeGroup() {
		const setMaxHeight = treeGroupExpand => {
			const groupChildren = treeGroupExpand.querySelector('.tree-group-children')
			let numberMaxHeight = 0
			for (let i = 0; i < groupChildren.children.length; i++) {
				if (groupChildren.children[i].classList.contains('expand')) {
					numberMaxHeight += groupChildren.children[i].querySelector('.tree-group-title').offsetHeight
					numberMaxHeight += setMaxHeight(groupChildren.children[i])
				} else {
					numberMaxHeight += groupChildren.children[i].offsetHeight
				}
			}
			groupChildren.style.maxHeight = numberMaxHeight + 'px'
			return numberMaxHeight
		}
		for (let i = 0; i < this.treeMenu.children.length; i++) {
			if (this.treeMenu.children[i].matches('.tree-group.expand')) {
				setMaxHeight(this.treeMenu.children[i])
			}
		}
	}

	actionItem(data) {
		const treeItem = this.treeMenu.querySelector(`.tree-item[data-tree-item='${data}']`)
		const treeGroup = treeItem.closest('.tree-group')
		this.activeItem(treeItem)
		if (treeGroup) {
			this.activeGroup(treeGroup)
		}
	}
	actionGroup(treeGroup) {
		if (treeGroup.classList.contains('expand')) {
			this.deActiveGroup(treeGroup)
		} else {
			treeGroup.classList.add('expand')
			this.activeGroup(treeGroup)
		}
	}
}

window.addEventListener('load', () => {
	new TreeMenuElement(document.getElementById('tree-example'))
	document.getElementById('toggle-collapse').onclick = () => {
		document.getElementById('tree-example').classList.toggle('collapse')
		document.getElementById('sidebar-example').classList.toggle('collapse')
	}
})
