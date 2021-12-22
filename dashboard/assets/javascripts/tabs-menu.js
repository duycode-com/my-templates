class TabsElement {
	constructor(tabsElement, data) {
		this.tabsElement = tabsElement
		this.tabsTitleContent = this.tabsElement.querySelector('.tabs-title-contents')
		this.tabsPanel = this.tabsElement.querySelector('.tabs-panel')

		this.currentPage = 0
		this.arrayPages = []
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
				if (that.currentPage <= 0) return
				that.currentPage--
				that.movePositionPage()
			}
			if (e.target.classList.contains('tabs-next') || e.target.closest('.tabs-next')) {
				if (that.currentPage >= that.arrayPages.length - 1) return
				that.currentPage++
				that.movePositionPage()
			}
		})
	}
	createArrayPage() {
		const wrapperWidth = this.tabsElement.querySelector('.tabs-title-wrapper').offsetWidth
		const listPoint = []
		const listTabsTitle = this.tabsElement.querySelectorAll('.tabs-title-item')

		let tempPlusWidth = 0,
			onWidth = 0,
			pageStart = 0

		for (let i = 0; i < listTabsTitle.length; i++) {
			let itemWidth = listTabsTitle[i].offsetWidth

			tempPlusWidth += itemWidth
			onWidth += itemWidth

			if (tempPlusWidth > wrapperWidth) {
				listPoint.push({
					pageStart,
					pageEnd: i - 1,
					onWidth: onWidth - itemWidth,
				})
				pageStart = i
				tempPlusWidth = itemWidth
			}
			if (i === listTabsTitle.length - 1) {
				listPoint.push({
					pageStart,
					pageEnd: i,
					onWidth,
				})
			}
		}
		this.arrayPages = listPoint
	}
	movePositionPage() {
		const wrapperWidth = this.tabsElement.querySelector('.tabs-title-wrapper').offsetWidth
		if (this.currentPage === 0) {
			this.tabsTitleContent.style.left = '0px'
		}
		if (this.currentPage !== 0) {
			this.tabsTitleContent.style.left = wrapperWidth - this.arrayPages[this.currentPage].onWidth + 'px'
		}

		const tabsPrev = this.tabsElement.querySelector('.tabs-prev')
		const tabsNext = this.tabsElement.querySelector('.tabs-next')
		tabsPrev.classList.remove('deactive')
		tabsNext.classList.remove('deactive')
		if (this.currentPage === 0) {
			tabsPrev.classList.add('deactive')
		} else if (this.currentPage === this.arrayPages.length - 1) {
			tabsNext.classList.add('deactive')
		}
	}
	setCurrentPage(key) {
		const listTabsTitle = this.tabsElement.querySelectorAll('.tabs-title-item')
		let indexElement = 0
		for (let i = 0; i < listTabsTitle.length; i++) {
			if (listTabsTitle[i].dataset.tabsKey === key) {
				indexElement = i
				break
			}
		}
		this.currentPage = this.arrayPages.findIndex(item => {
			return item.pageStart <= indexElement && item.pageEnd >= indexElement
		})
		this.movePositionPage()
	}
	add({ key, label, content }) {
		if (!this.contains(key)) {
			this.tabsTitleContent.innerHTML += `<div class="tabs-title-item" data-tabs-key="${key}">
                <div class="tabs-title-item-label">${label}</div>
                <div class="tabs-title-item-close"><span class="material-icons">close</span></div>
            </div>`
			this.tabsPanel.innerHTML += `<div class="tabs-panel-item" data-tabs-key="${key}" style="display:none">${content}</div>`
			this.createArrayPage()
		}
		this.active(key)
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

		this.setCurrentPage(key)
	}
	remove(key) {
		this.tabsElement.querySelector(`.tabs-title-item[data-tabs-key='${key}']`).remove()
		this.tabsElement.querySelector(`.tabs-panel-item[data-tabs-key='${key}']`).remove()
	}
	contains(key) {
		return !!this.tabsElement.querySelector(`.tabs-title-item[data-tabs-key='${key}']`)
	}
}
