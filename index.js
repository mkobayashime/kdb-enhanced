// ==UserScript==
// @name         KdB Enhanced
// @namespace    https://kdb.tsukuba.ac.jp/
// @version      1.0
// @description  Browser userscript to improve semantics of KdB
// @author       @m_kobayashi_me  https://twitter.com/m_kobayashi_me
// @match        https://kdb.tsukuba.ac.jp/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.onload = () => {
    changeTagOfBtn("btnFirst")
    changeTagOfBtn("btnPrev")
    changeTagOfBtn("btnNext")
    changeTagOfBtn("btnEnd")
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
})();