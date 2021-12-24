class TreeMenuElement {
	constructor(element, data) {
		this.treeMenu = element
		this.render(data)
		this.listenEvent()
		this.basicHeight = 44
	}
	render(data) {
		if (!data) return
		const htmlContent = data => {
			let content = ''
			data.forEach(item => {
				let iconContent = ''
				if (item.icon) {
					iconContent = `<span class="material-icons">${item.icon}</span>`
				}
				if (item.type === 'tree-item') {
					content += `<div class="tree-item" data-tree-key="${item.data}">
                                    ${iconContent} 
                                    ${item.label}
                                </div>`
				}
				if (item.type === 'tree-label') {
					content += `<div class="tree-label">${item.label}</div>`
				}
				if (item.type === 'tree-group') {
					content += `<div class="tree-group">
                                    <div class="tree-group-title">
                                        ${iconContent}
                                        <span> ${item.label} </span>
                                    </div>
                                    <div class="tree-group-children">${htmlContent(item.children)}</div>
                                </div>`
				}
			})
			return content
		}

		this.treeMenu.innerHTML = htmlContent(data)
	}
	listenEvent() {
		const that = this
		this.treeMenu.addEventListener('click', e => {
			if (e.target.closest('.tree-item')) {
				const target = e.target.closest('.tree-item')
				const data = target.dataset.treeKey
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
	clearAll() {
		this.clearAllActiveItem()
		this.clearAllExpandGroup()
	}
	activeItem(treeItem) {
		this.clearAll()
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
					numberMaxHeight +=
						groupChildren.children[i].querySelector('.tree-group-title').offsetHeight || this.basicHeight
					numberMaxHeight += setMaxHeight(groupChildren.children[i])
				} else {
					numberMaxHeight += groupChildren.children[i].offsetHeight || this.basicHeight
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

	actionItem(key) {
		const treeItem = this.treeMenu.querySelector(`.tree-item[data-tree-key='${key}']`)
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
