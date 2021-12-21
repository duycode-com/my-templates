class TabsElement {
	constructor(tabsElement, data) {
		this.tabsElement = tabsElement
		this.tabsTitleContent = this.tabsElement.querySelector('.tabs-title-contents')
		this.tabsPanel = this.tabsElement.querySelector('.tabs-panel')

		this.currentPagesTab = 0
		this.initial(data)
		this.listenEvent()
	}

	initial(data) {
		if (!data) return
		const that = this
		data.forEach(item => that.add(item))
	}
	listenEvent() {
		const that = this
		this.tabsElement.addEventListener('click', e => {
			if (e.target.classList.contains('tabs-title-item-label')) {
				const key = e.target.closest('.tabs-title-item').dataset.tabsKey
				that.active(key)
			}
			if (e.target.classList.contains('tabs-title-item-close') || e.target.closest('.tabs-title-item-close')) {
				const key = e.target.closest('.tabs-title-item').dataset.tabsKey
				that.remove(key)
			}
			if (e.target.classList.contains('tabs-close-all')) {
				that.tabsTitleContent.innerHTML = ''
				that.tabsPanel.innerHTML = ''
			}
			if (e.target.classList.contains('tabs-prev') || e.target.closest('.tabs-prev')) {
				if (that.currentPagesTab <= 0) return
				that.currentPagesTab--
				that.movePositionPageTabs(that.currentPagesTab)
			}
			if (e.target.classList.contains('tabs-next') || e.target.closest('.tabs-next')) {
				if (that.currentPagesTab >= that.tabsCreatePage().length - 1) return
				that.currentPagesTab++
				that.movePositionPageTabs(that.currentPagesTab)
			}
		})
	}
	tabsCreatePage() {
		const wrapperWidth = this.tabsElement.querySelector('.tabs-title-wrapper').offsetWidth
		const listPoint = []
		const listTabsTitle = this.tabsElement.querySelectorAll('.tabs-title-item')

		let tempPlusWidth = 0,
			onWidth = 0,
			pageStart = 0

		for (let index = 0; index < listTabsTitle.length; index++) {
			let itemWidth = listTabsTitle[index].offsetWidth

			tempPlusWidth += itemWidth
			onWidth += itemWidth

			if (tempPlusWidth > wrapperWidth) {
				listPoint.push({
					pageStart,
					pageEnd: index - 1,
					onWidth: onWidth - itemWidth,
				})
				pageStart = index
				tempPlusWidth = itemWidth
			}
			if (index === listTabsTitle.length - 1) {
				listPoint.push({
					pageStart,
					pageEnd: index,
					onWidth,
				})
			}
		}
		return listPoint
	}
	movePositionPageTabs(indexPage) {
		const wrapperWidth = this.tabsElement.querySelector('.tabs-title-wrapper').offsetWidth
		if (indexPage == 0) {
			this.tabsTitleContent.style.left = '0px'
		}
		if (indexPage != 0) {
			this.tabsTitleContent.style.left = wrapperWidth - this.tabsCreatePage()[indexPage].onWidth + 'px'
		}
	}
	add({ key, label, content }) {
		this.tabsTitleContent.innerHTML += `<div class="tabs-title-item" data-tabs-key="${key}">
                <div class="tabs-title-item-label">${label}</div>
                <div class="tabs-title-item-close"><span class="material-icons">close</span></div>
            </div>`
		this.tabsPanel.innerHTML += `<div class="tabs-panel-item" data-tabs-key="${key}">${content}</div>`
	}
	active(key) {
		const listTitleItem = this.tabsElement.querySelectorAll('.tabs-title-item')
		for (let i = 0; i < listTitleItem.length; i++) {
			listTitleItem[i].classList.remove('active')
		}
		const listPanelItem = this.tabsElement.querySelectorAll('.tabs-panel-item')
		for (let i = 0; i < listPanelItem.length; i++) {
			listPanelItem[i].style.display = 'none'
		}
		this.tabsElement.querySelector(`div.tabs-title-item[data-tabs-key='${key}']`).classList.add('active')
		this.tabsElement.querySelector(`div.tabs-panel-item[data-tabs-key='${key}']`).style.display = ''
	}
	remove(key) {
		this.tabsElement.querySelector(`.tabs-panel-item[data-tabs-key='${key}']`).remove()
		this.tabsElement.querySelector(`.tabs-title-item[data-tabs-key='${key}']`).remove()
	}
}
