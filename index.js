// ==UserScript==
// @name         KdB Enhanced
// @namespace    https://kdb.tsukuba.ac.jp/
// @version      1.5
// @description  Browser userscript to improve semantics of KdB
// @author       @m_kobayashi_me  https://twitter.com/m_kobayashi_me
// @match        https://kdb.tsukuba.ac.jp/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict"

  window.onload = () => {
    changeTagOfBtn("btnFirst")
    changeTagOfBtn("btnPrev")
    changeTagOfBtn("btnNext")
    changeTagOfBtn("btnEnd")

    setShortcuts()

    observeTable()
  }

  const changeTagOfBtn = id => {
    const btn = document.getElementById(id)
    const btnChild = btn.children[0]
    const btnNew = document.createElement("a")
    btnNew.id = btn.id + "New"
    btnNew.className = btn.className
    btnNew.setAttribute("style", btn.getAttribute("style"))
    btn.parentNode.insertBefore(btnNew, btn)
    btnNew.appendChild(btnChild)
    btn.style.display = "none"

    btnNew.addEventListener("click", () => {
      btn.click()
    })
  }

  const changeTagOfTitle = () => {
    const titles = Array.from(document.getElementsByClassName("ut-title"))
    titles.forEach(title => {
      if (title.parentNode.className.indexOf("ut-preview-syllabus") !== -1) {
        const titleNew = document.createElement("a")
        titleNew.className = title.className
        titleNew.setAttribute("style", title.getAttribute("style"))
        titleNew.style.display = "block"
        titleNew.style.color = "inherit"
        titleNew.innerHTML = title.innerHTML
        title.parentNode.insertBefore(titleNew, title)
        title.remove()
      }
    })
  }

  const changeTagOfSummary = () => {
    const summaries = Array.from(document.getElementsByClassName("ut-body"))
    summaries.forEach(summary => {
      if (summary.parentNode.className.indexOf("ut-clickable") !== -1) {
        const summaryNew = document.createElement("a")
        summaryNew.className = summary.className
        summaryNew.setAttribute("style", summary.getAttribute("style"))
        summaryNew.style.display = "block"
        summaryNew.innerHTML = summary.innerHTML
        summary.parentNode.insertBefore(summaryNew, summary)
        summary.remove()
      }
    })
  }

  const setShortcuts = () => {
    const inputDoms = Array.from(document.querySelectorAll("input, select")).slice(8, 15)

    window.onkeydown = e => {
      switch (e.key) {
        case "ArrowRight":
          document.getElementById("btnNext").click()
          break
        case "l":
          document.getElementById("btnNext").click()
          break
        case "ArrowLeft":
          document.getElementById("btnPrev").click()
          break
        case "h":
          document.getElementById("btnPrev").click()
          break
      }

      if (e.ctrlKey && e.key === "Enter") {
        if (inputDoms.includes(document.activeElement)) {
          document.getElementById("btnSearch").click()
        }
      }
    }
  }

  const observeTable = () => {
    const tableBody = document.getElementById("ut-SB0070-list-body")
    tableBody.style.overflowX = "hidden"
    const observer = new MutationObserver(() => {
      changeTagOfTitle()
      changeTagOfSummary()
    })
    observer.observe(tableBody, {
      childList: true
    })
  }
})();