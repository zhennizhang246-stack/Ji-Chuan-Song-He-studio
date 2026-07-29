(() => {
  "use strict"

  const CONFIG = {
    owner: "zhennizhang246-stack",
    repo: "Ji-Chuan-Song-He-studio",
    branch: "main",
    dataPath: "content.json",
    pagesUrl: "https://zhennizhang246-stack.github.io/Ji-Chuan-Song-He-studio/"
  }

  const API = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}`
  const TOKEN_KEY = "songhe_owner_session_token"
  const selectors = [
    "h1", "h2", "h3", "h4", "p", ".lead", ".visual-note",
    ".t-meta", ".t-cat", ".d-value", ".brief-title", ".brief-note",
    ".col-ttl", ".col-desc", ".name", ".desc", ".fc-title"
  ].join(",")

  let state = {
    version: 1,
    updatedAt: "",
    theme: { accent: "#002FA7" },
    elements: {},
    images: {}
  }
  let token = ""
  let selected = null
  let saveTimer = 0
  let saving = false
  let saveAgain = false
  let editorEnabled = false

  const byId = id => document.getElementById(id)

  function createUI() {
    const launch = document.createElement("button")
    launch.id = "owner-editor-launch"
    launch.type = "button"
    launch.title = "本人编辑"
    launch.textContent = "EDIT"
    launch.hidden = true

    const panel = document.createElement("aside")
    panel.id = "owner-editor-panel"
    panel.hidden = true
    panel.innerHTML = `
      <div class="oe-head">
        <div>
          <div class="oe-title">Owner Editor</div>
          <div class="oe-meta">仅 ${CONFIG.owner}</div>
        </div>
        <button class="oe-btn" id="oe-close" type="button">关闭</button>
      </div>
      <div class="oe-section">
        <div class="oe-status" id="oe-status">等待编辑</div>
        <div class="oe-help" style="margin-top:9px">修改后约 2 秒自动提交，GitHub Pages 通常会在随后一分钟内更新</div>
      </div>
      <div class="oe-section">
        <span class="oe-label">当前文字</span>
        <div id="oe-selected" class="oe-help">点击页面中的文字进行编辑</div>
        <div class="oe-row" style="margin-top:10px">
          <button class="oe-btn" id="oe-font-down" type="button">字号 −</button>
          <button class="oe-btn" id="oe-font-reset" type="button">重置</button>
          <button class="oe-btn" id="oe-font-up" type="button">字号 ＋</button>
        </div>
        <label class="oe-label" style="margin-top:14px" for="oe-text-color">文字颜色</label>
        <input class="oe-color" id="oe-text-color" type="color" value="#0a0a0a">
      </div>
      <div class="oe-section">
        <label class="oe-label" for="oe-theme-color">全站强调色</label>
        <input class="oe-color" id="oe-theme-color" type="color" value="#002fa7">
        <div class="oe-row" style="margin-top:10px">
          <button class="oe-btn oe-preset" data-color="#002FA7" type="button">IKB 蓝</button>
          <button class="oe-btn oe-preset" data-color="#FFD500" type="button">柠檬黄</button>
          <button class="oe-btn oe-preset" data-color="#FF6B35" type="button">安全橙</button>
        </div>
      </div>
      <div class="oe-section">
        <span class="oe-label">项目图片</span>
        <div class="oe-help">直接点击页面中的图片即可选择新图片，新文件会上传到仓库并自动发布</div>
        <input id="oe-image-file" type="file" accept="image/jpeg,image/png,image/webp" hidden>
      </div>
      <div class="oe-section">
        <button class="oe-btn primary" id="oe-save-now" type="button" style="width:100%">立即保存并发布</button>
        <button class="oe-btn" id="oe-signout" type="button" style="width:100%;margin-top:9px">退出本人编辑</button>
      </div>
      <div class="oe-help">公开访客无法保存修改，编辑令牌只保存在当前浏览器会话中</div>
    `

    const auth = document.createElement("div")
    auth.id = "owner-editor-auth"
    auth.hidden = true
    auth.innerHTML = `
      <div class="oe-auth-card">
        <h2>本人编辑验证</h2>
        <p>请输入仅授权此仓库 Contents 读写权限的 GitHub Fine-grained token</p>
        <input class="oe-input" id="oe-token" type="password" autocomplete="off" placeholder="GitHub 编辑令牌">
        <div class="oe-row" style="grid-template-columns:1fr 1fr;margin-top:12px">
          <button class="oe-btn primary" id="oe-auth-submit" type="button">验证并编辑</button>
          <button class="oe-btn" id="oe-auth-cancel" type="button">取消</button>
        </div>
        <a class="oe-btn oe-token-help" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">首次使用请创建编辑令牌</a>
        <p class="oe-help" style="margin-top:14px;margin-bottom:0">令牌必须属于 ${CONFIG.owner}，建议仅选择 ${CONFIG.repo} 仓库并只授予 Contents Read and write</p>
      </div>
    `

    const toast = document.createElement("div")
    toast.id = "owner-editor-toast"
    toast.hidden = true

    document.body.append(launch, panel, auth, toast)
  }

  function tagEditableNodes() {
    document.querySelectorAll(".slide").forEach((slide, slideIndex) => {
      const candidates = [...slide.querySelectorAll(selectors)]
        .filter(el => !el.closest("#owner-editor-panel"))
        .filter(el => !candidatesContainsEditableChild(el))
      candidates.forEach((el, textIndex) => {
        const id = `s${slideIndex + 1}-t${textIndex + 1}`
        el.dataset.editId = id
        el.dataset.ownerEditable = "true"
      })

      slide.querySelectorAll("img").forEach((img, imageIndex) => {
        img.dataset.imageId = `s${slideIndex + 1}-img${imageIndex + 1}`
        img.dataset.ownerImage = "true"
      })
    })
  }

  function candidatesContainsEditableChild(el) {
    return [...el.children].some(child => child.matches(selectors))
  }

  async function loadState() {
    try {
      const response = await fetch(`content.json?v=${Date.now()}`, { cache: "no-store" })
      if (!response.ok) return
      const loaded = await response.json()
      state = {
        version: 1,
        updatedAt: loaded.updatedAt || "",
        theme: loaded.theme || { accent: "#002FA7" },
        elements: loaded.elements || {},
        images: loaded.images || {}
      }
    } catch {
      // 首次部署或离线预览时使用页面内默认内容
    }
  }

  function applyState() {
    if (state.theme?.accent) {
      document.documentElement.style.setProperty("--accent", state.theme.accent)
      byId("oe-theme-color").value = normalizeColor(state.theme.accent)
    }

    Object.entries(state.elements).forEach(([id, value]) => {
      const el = document.querySelector(`[data-edit-id="${cssEscape(id)}"]`)
      if (!el) return
      if (typeof value.html === "string") el.innerHTML = value.html
      if (value.fontSize) el.style.fontSize = value.fontSize
      if (value.color) el.style.color = value.color
    })

    Object.entries(state.images).forEach(([id, src]) => {
      const img = document.querySelector(`[data-image-id="${cssEscape(id)}"]`)
      if (img && src) img.src = `${src}?v=${encodeURIComponent(state.updatedAt || Date.now())}`
    })
  }

  function cssEscape(value) {
    return window.CSS?.escape ? CSS.escape(value) : value.replace(/"/g, '\\"')
  }

  function normalizeColor(value) {
    if (/^#[0-9a-f]{6}$/i.test(value || "")) return value
    return "#0a0a0a"
  }

  function enableOwnerEditing() {
    editorEnabled = true
    document.body.classList.add("owner-editing")
    byId("owner-editor-panel").hidden = false
    byId("owner-editor-launch").hidden = true
    document.querySelectorAll('[data-owner-editable="true"]').forEach(el => {
      el.contentEditable = "true"
      el.spellcheck = false
    })
    showToast("本人编辑已开启")
  }

  function disableOwnerEditing() {
    editorEnabled = false
    document.body.classList.remove("owner-editing")
    byId("owner-editor-panel").hidden = true
    byId("owner-editor-launch").hidden = false
    document.querySelectorAll('[data-owner-editable="true"]').forEach(el => {
      el.contentEditable = "false"
      delete el.dataset.ownerSelected
    })
    selected = null
  }

  async function authenticate(candidate) {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${candidate}`,
        "X-GitHub-Api-Version": "2022-11-28"
      }
    })
    if (!response.ok) throw new Error("GitHub 验证失败")
    const user = await response.json()
    if ((user.login || "").toLowerCase() !== CONFIG.owner.toLowerCase()) {
      throw new Error(`只有 ${CONFIG.owner} 可以编辑`)
    }
    token = candidate
    sessionStorage.setItem(TOKEN_KEY, candidate)
    return user
  }

  function apiHeaders() {
    return {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json"
    }
  }

  function utf8ToBase64(value) {
    const bytes = new TextEncoder().encode(value)
    let binary = ""
    bytes.forEach(byte => { binary += String.fromCharCode(byte) })
    return btoa(binary)
  }

  async function getRepoFile(path) {
    const response = await fetch(`${API}/contents/${encodePath(path)}?ref=${encodeURIComponent(CONFIG.branch)}&t=${Date.now()}`, {
      headers: apiHeaders(),
      cache: "no-store"
    })
    if (response.status === 404) return null
    if (!response.ok) throw new Error(`读取 ${path} 失败`)
    return response.json()
  }

  function encodePath(path) {
    return path.split("/").map(encodeURIComponent).join("/")
  }

  async function putRepoFile(path, base64Content, message, sha = "") {
    const body = {
      message,
      content: base64Content,
      branch: CONFIG.branch
    }
    if (sha) body.sha = sha
    const response = await fetch(`${API}/contents/${encodePath(path)}`, {
      method: "PUT",
      headers: apiHeaders(),
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      const detail = await response.json().catch(() => ({}))
      throw new Error(detail.message || `写入 ${path} 失败`)
    }
    return response.json()
  }

  function scheduleSave() {
    if (!editorEnabled || !token) return
    setStatus("saving", "等待自动保存")
    clearTimeout(saveTimer)
    saveTimer = window.setTimeout(saveState, 1800)
  }

  async function saveState() {
    if (!token) return
    if (saving) {
      saveAgain = true
      return
    }
    saving = true
    saveAgain = false
    setStatus("saving", "正在提交到 GitHub")
    try {
      state.updatedAt = new Date().toISOString()
      const current = await getRepoFile(CONFIG.dataPath)
      const json = JSON.stringify(state, null, 2) + "\n"
      await putRepoFile(
        CONFIG.dataPath,
        utf8ToBase64(json),
        `Update studio content ${new Date().toLocaleString("zh-CN")}`,
        current?.sha || ""
      )
      setStatus("saved", "已提交，正在自动部署")
      showToast("已保存到 GitHub，公开链接即将更新")
    } catch (error) {
      setStatus("error", error.message || "保存失败")
      showToast(error.message || "保存失败")
    } finally {
      saving = false
      if (saveAgain) saveState()
    }
  }

  function captureElement(el) {
    const id = el.dataset.editId
    if (!id) return
    state.elements[id] = {
      ...(state.elements[id] || {}),
      html: el.innerHTML
    }
    scheduleSave()
  }

  function selectElement(el) {
    if (selected) delete selected.dataset.ownerSelected
    selected = el
    selected.dataset.ownerSelected = "true"
    const label = el.innerText.trim().replace(/\s+/g, " ").slice(0, 42) || el.dataset.editId
    byId("oe-selected").textContent = label
    byId("oe-text-color").value = rgbToHex(getComputedStyle(el).color)
  }

  function changeSelectedSize(delta) {
    if (!selected) return
    const id = selected.dataset.editId
    const current = parseFloat(getComputedStyle(selected).fontSize)
    const next = Math.max(12, Math.min(180, current + delta))
    selected.style.fontSize = `${Math.round(next)}px`
    state.elements[id] = {
      ...(state.elements[id] || {}),
      html: selected.innerHTML,
      fontSize: selected.style.fontSize
    }
    scheduleSave()
  }

  function resetSelectedSize() {
    if (!selected) return
    const id = selected.dataset.editId
    selected.style.removeProperty("font-size")
    state.elements[id] = {
      ...(state.elements[id] || {}),
      html: selected.innerHTML
    }
    delete state.elements[id].fontSize
    scheduleSave()
  }

  function changeSelectedColor(color) {
    if (!selected) return
    const id = selected.dataset.editId
    selected.style.color = color
    state.elements[id] = {
      ...(state.elements[id] || {}),
      html: selected.innerHTML,
      color
    }
    scheduleSave()
  }

  function rgbToHex(value) {
    const match = (value || "").match(/\d+/g)
    if (!match || match.length < 3) return "#0a0a0a"
    return `#${match.slice(0, 3).map(v => Number(v).toString(16).padStart(2, "0")).join("")}`
  }

  async function uploadImage(file) {
    if (!selected || selected.tagName !== "IMG") return
    if (file.size > 8 * 1024 * 1024) throw new Error("图片需小于 8MB")
    const id = selected.dataset.imageId
    const ext = (file.name.split(".").pop() || "jpg").replace(/[^a-z0-9]/gi, "").toLowerCase()
    const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg"
    const path = `images/uploads/${Date.now()}-${id}.${safeExt}`
    const dataUrl = await readAsDataURL(file)
    const base64 = dataUrl.split(",")[1]
    setStatus("saving", "正在上传图片")
    await putRepoFile(path, base64, `Upload image for ${id}`)
    selected.src = dataUrl
    state.images[id] = path
    await saveState()
  }

  function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error("读取图片失败"))
      reader.readAsDataURL(file)
    })
  }

  function setStatus(kind, text) {
    const status = byId("oe-status")
    if (!status) return
    status.className = `oe-status ${kind || ""}`
    status.textContent = text
  }

  function showToast(text) {
    const toast = byId("owner-editor-toast")
    toast.textContent = text
    toast.hidden = false
    clearTimeout(showToast.timer)
    showToast.timer = setTimeout(() => { toast.hidden = true }, 2800)
  }

  function openAuth() {
    byId("owner-editor-auth").hidden = false
    setTimeout(() => byId("oe-token").focus(), 30)
  }

  function bindEvents() {
    byId("owner-editor-launch").addEventListener("click", async () => {
      const saved = sessionStorage.getItem(TOKEN_KEY)
      if (saved) {
        try {
          await authenticate(saved)
          enableOwnerEditing()
          return
        } catch {
          sessionStorage.removeItem(TOKEN_KEY)
        }
      }
      openAuth()
    })

    byId("oe-auth-submit").addEventListener("click", async () => {
      const candidate = byId("oe-token").value.trim()
      if (!candidate) return
      byId("oe-auth-submit").disabled = true
      try {
        await authenticate(candidate)
        byId("owner-editor-auth").hidden = true
        byId("oe-token").value = ""
        enableOwnerEditing()
      } catch (error) {
        showToast(error.message || "验证失败")
      } finally {
        byId("oe-auth-submit").disabled = false
      }
    })

    byId("oe-auth-cancel").addEventListener("click", () => {
      byId("owner-editor-auth").hidden = true
    })

    byId("oe-close").addEventListener("click", disableOwnerEditing)
    byId("oe-font-down").addEventListener("click", () => changeSelectedSize(-2))
    byId("oe-font-up").addEventListener("click", () => changeSelectedSize(2))
    byId("oe-font-reset").addEventListener("click", resetSelectedSize)
    byId("oe-text-color").addEventListener("input", event => changeSelectedColor(event.target.value))
    byId("oe-theme-color").addEventListener("input", event => {
      state.theme.accent = event.target.value
      document.documentElement.style.setProperty("--accent", event.target.value)
      scheduleSave()
    })
    document.querySelectorAll(".oe-preset").forEach(button => {
      button.addEventListener("click", () => {
        const color = button.dataset.color
        state.theme.accent = color
        byId("oe-theme-color").value = color
        document.documentElement.style.setProperty("--accent", color)
        scheduleSave()
      })
    })
    byId("oe-save-now").addEventListener("click", saveState)
    byId("oe-signout").addEventListener("click", () => {
      sessionStorage.removeItem(TOKEN_KEY)
      token = ""
      disableOwnerEditing()
      showToast("已退出本人编辑")
    })

    document.addEventListener("click", event => {
      if (!editorEnabled) return
      const img = event.target.closest('[data-owner-image="true"]')
      if (img) {
        event.preventDefault()
        event.stopPropagation()
        if (selected) delete selected.dataset.ownerSelected
        selected = img
        selected.dataset.ownerSelected = "true"
        byId("oe-selected").textContent = `图片 ${img.dataset.imageId}`
        byId("oe-image-file").click()
        return
      }
      const editable = event.target.closest('[data-owner-editable="true"]')
      if (editable) {
        event.stopPropagation()
        selectElement(editable)
      }
    }, true)

    document.addEventListener("input", event => {
      const editable = event.target.closest?.('[data-owner-editable="true"]')
      if (editorEnabled && editable) captureElement(editable)
    })

    byId("oe-image-file").addEventListener("change", async event => {
      const file = event.target.files?.[0]
      event.target.value = ""
      if (!file) return
      try {
        await uploadImage(file)
      } catch (error) {
        setStatus("error", error.message || "图片上传失败")
        showToast(error.message || "图片上传失败")
      }
    })

    document.addEventListener("keydown", event => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "e") {
        event.preventDefault()
        byId("owner-editor-launch").hidden = false
        byId("owner-editor-launch").click()
      }
    })
  }

  async function boot() {
    createUI()
    tagEditableNodes()
    await loadState()
    applyState()
    bindEvents()

    const editRequested = new URLSearchParams(location.search).get("edit") === "1"
    if (editRequested) {
      byId("owner-editor-launch").hidden = false
      byId("owner-editor-launch").click()
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true })
  } else {
    boot()
  }
})()
