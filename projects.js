(() => {
  "use strict"

  const PROJECTS = {
    case01: {
      caseLabel: "CASE 01 · RETAIL",
      region: "云南 Yunnan",
      title: "把购物变成穿越",
      author: "SXJ MX ZMJ",
      materials: ["青绿石材", "粗粝岩面", "白色金属格栅", "镜面不锈钢"],
      concept: "地质通道 Geological Passage",
      story: "云南的山体与矿物色泽成为空间原型 入口被压低并收紧 随后在主展区突然打开 让人的行进像一次穿越地层的旅程 商品不是被陈列在墙边 而是像从岩层中被发现",
      scenes: ["巨石门厅", "悬浮展台", "金属峡谷", "矿物内核"],
      images: ["case01-01.jpg", "case01-02.jpg", "case01-03.jpg", "case01-04.jpg"]
    },
    case02: {
      caseLabel: "CASE 02 · PRIVATE CLUBHOUSE",
      region: "南昌红谷滩 Nanchang",
      title: "礼序不必来自装饰",
      author: "SXJ MX ZMJ",
      materials: ["灰色石材", "深色金属网", "发光亚克力", "水纹玻璃"],
      concept: "安静的仪式 Quiet Ceremony",
      story: "红谷滩的新城尺度需要一处能让情绪慢下来的会客空间 设计用轴线与光的递进建立礼序 灰色石材提供重量 金属网过滤视线 发光体成为远处的引导 让克制本身产生尊贵感",
      scenes: ["迎宾轴线", "悬浮会客", "静默长廊"],
      images: ["case02-01.jpg", "case02-02.jpg", "case02-03.jpg"]
    },
    case03: {
      caseLabel: "CASE 03 · PRIVATE RESIDENCE",
      region: "扬州 Yangzhou",
      title: "让安静拥有深度",
      author: "SXJ MX ZMJ",
      materials: ["深色木饰面", "铜色金属网", "透光石", "灰色玻璃"],
      concept: "夜色中的内庭 Interior Garden at Night",
      story: "扬州园林不靠直白复制 而靠遮挡 转折与借景被重新理解 深木构成夜色 铜网像一层薄雾 透光石在深处发亮 住宅因此拥有内庭般的距离感 让日常活动在明暗之间被温柔分隔",
      scenes: ["深木客厅", "光石餐厅", "静谧套房"],
      images: ["case03-01.jpg", "case03-02.jpg", "case03-03.jpg"]
    },
    case04: {
      caseLabel: "CASE 04 · PRIVATE RESIDENCE",
      region: "温州 Wenzhou",
      title: "把城市留在室内",
      author: "SXJ MX ZMJ",
      materials: ["白色石材", "深色木饰面", "黑白织物", "透明玻璃"],
      concept: "城市即材料 City as Material",
      story: "高层住宅最珍贵的材料是窗外不断变化的城市 设计削弱室内边界 让家具保持低位 让白色石材接住天光 深木把视线拉回生活核心 空间不与景观竞争 而是把城市变成房间的一部分",
      scenes: ["城市客厅", "低位起居", "石木餐厨", "私密套房"],
      images: ["case04-01.jpg", "case04-02.jpg", "case04-03.jpg", "case04-04.jpg"]
    },
    case05: {
      caseLabel: "CASE 05 · HOSPITALITY",
      region: "杭州 Hangzhou",
      title: "宴席从门槛开始",
      author: "SXJ MX ZMJ",
      materials: ["暖色木材", "透明玻璃", "手作陶器", "自然石材"],
      concept: "相聚的门槛 Threshold to Gathering",
      story: "杭州的待客文化讲究抵达之前的铺陈 入口用窄而长的过渡降低速度 木材带来温度 玻璃释放庭院景色 陶器与自然石材保存手工触感 每一次转身都在为最终的相聚积累情绪",
      scenes: ["入席门槛", "庭院会客", "围合宴厅"],
      images: ["case05-01.jpg", "case05-02.jpg", "case05-03.jpg"]
    },
    case06: {
      caseLabel: "CASE 06 · SHOW RESIDENCE H1",
      region: "成都 Chengdu",
      title: "让光替代多余形式",
      author: "SXJ MX ZMJ",
      materials: ["浅色木材", "暖白肌理", "亚麻织物", "哑光金属"],
      concept: "缓慢的光 Slow Light",
      story: "成都的阴柔天光适合被放大而不是被装饰遮蔽 浅木与暖白表面让光在室内停留 亚麻软化边界 收纳与门被压进同一条水平线 形式退后之后 居住者能更敏感地感受一天的变化",
      scenes: ["光感客厅", "连续餐厨", "柔白过廊", "安静卧室"],
      images: ["case06-01.jpg", "case06-02.jpg", "case06-03.jpg", "case06-04.jpg"]
    },
    case07: {
      caseLabel: "CASE 07 · SHOW RESIDENCE J1",
      region: "成都 Chengdu",
      title: "把边界画软",
      author: "SXJ MX ZMJ",
      materials: ["象牙白涂层", "灰色石材", "深蓝织物", "弧面木作"],
      concept: "柔软的地平线 Soft Horizon",
      story: "样板空间需要被记住 却不能依赖短暂的造型刺激 连续弧面把墙 门与柜体连接成柔软地平线 灰石稳定重心 深蓝织物建立远近层次 让空间在克制中留下清晰轮廓",
      scenes: ["弧线客厅", "蓝灰餐厅", "柔性套房"],
      images: ["case07-01.jpg", "case07-02.jpg", "case07-03.jpg"]
    },
    case08: {
      caseLabel: "CASE 08 · COMMUNITY SPACE",
      region: "郑州 Zhengzhou",
      title: "公共不等于空旷",
      author: "SXJ MX ZMJ",
      materials: ["暖灰石材", "编织屏风", "白色织物", "自然绿植"],
      concept: "院落中的房间 Rooms in a Courtyard",
      story: "共享空间真正需要的是多种距离 设计以屏风 绿植与家具围合出大小不同的房间 人可以独处 会谈或短暂停留 暖灰石材承接公共耐久性 编织与织物带回家的尺度",
      scenes: ["共享前厅", "绿意客厅", "编织书房", "围合会谈", "社区长桌"],
      images: ["case08-01.jpg", "case08-02.jpg", "case08-03.jpg", "case08-04.jpg", "case08-05.jpg"]
    }
  }

  let activeProject = null
  let activeIndex = 0
  let lastTrigger = null

  const imagePath = (projectId, index) => {
    const imageId = `${projectId}-gallery-img${index + 1}`
    const override = window.__ownerImageOverrides?.[imageId]
    return override || `images/projects/${PROJECTS[projectId].images[index]}`
  }

  function createGallery() {
    const gallery = document.createElement("div")
    gallery.className = "project-gallery"
    gallery.id = "project-gallery"
    gallery.hidden = true
    gallery.setAttribute("role", "dialog")
    gallery.setAttribute("aria-modal", "true")
    gallery.setAttribute("aria-label", "完整项目图片与设计理念")
    gallery.innerHTML = `
      <div class="project-gallery-stage">
        <div class="project-gallery-visual">
          <div class="project-gallery-index" id="pg-index"></div>
          <img class="project-gallery-image" id="pg-image" alt="">
        </div>
        <div class="project-gallery-controls">
          <button class="project-gallery-nav" id="pg-prev" type="button" aria-label="上一张">←</button>
          <div class="project-gallery-scenes" id="pg-scenes"></div>
          <button class="project-gallery-nav" id="pg-next" type="button" aria-label="下一张">→</button>
        </div>
      </div>
      <aside class="project-gallery-info">
        <button class="project-gallery-close" id="pg-close" type="button" aria-label="关闭">×</button>
        <div class="project-gallery-kicker" id="pg-kicker"></div>
        <h2 class="project-gallery-title" id="pg-title"></h2>
        <div class="project-gallery-author"><span id="pg-region"></span><span id="pg-author"></span></div>
        <div class="project-gallery-block">
          <span class="project-gallery-label">DESIGN CONCEPT</span>
          <p class="project-gallery-text" id="pg-concept"></p>
        </div>
        <div class="project-gallery-block">
          <span class="project-gallery-label">WHY THIS DESIGN</span>
          <p class="project-gallery-text" id="pg-story"></p>
        </div>
        <div class="project-gallery-block">
          <span class="project-gallery-label">MATERIAL PALETTE</span>
          <div class="project-gallery-materials" id="pg-materials"></div>
        </div>
        <div class="project-gallery-scene-name" id="pg-scene-name"></div>
      </aside>
    `
    document.body.appendChild(gallery)

    document.getElementById("pg-close").addEventListener("click", closeGallery)
    document.getElementById("pg-prev").addEventListener("click", () => stepScene(-1))
    document.getElementById("pg-next").addEventListener("click", () => stepScene(1))
    gallery.addEventListener("click", event => {
      if (event.target === gallery) closeGallery()
    })
  }

  function createMobilePortfolio() {
    const portfolio = document.createElement("main")
    portfolio.className = "mobile-project-portfolio"
    portfolio.id = "mobile-project-portfolio"
    portfolio.setAttribute("aria-label", "纪川松禾完整项目作品集")

    const projectEntries = Object.entries(PROJECTS)
    const projectNav = projectEntries.map(([projectId, project], index) => (
      `<a href="#mobile-${projectId}"><span>${String(index + 1).padStart(2, "0")}</span>${project.region.split(" ").slice(-1)[0]}</a>`
    )).join("")

    const projectArticles = projectEntries.map(([projectId, project], index) => {
      const scenes = project.images.map((imageName, sceneIndex) => {
        const imageId = `${projectId}-gallery-img${sceneIndex + 1}`
        return `
          <figure class="mobile-project-scene">
            <img
              src="${imagePath(projectId, sceneIndex)}"
              alt="${project.region} ${project.scenes[sceneIndex]}"
              loading="${index < 1 ? "eager" : "lazy"}"
              data-image-id="${imageId}"
              data-owner-image="true"
            >
            <figcaption>
              <span>SCENE ${String(sceneIndex + 1).padStart(2, "0")}</span>
              <strong>${project.scenes[sceneIndex]}</strong>
            </figcaption>
          </figure>
        `
      }).join("")

      return `
        <article class="mobile-project-entry" id="mobile-${projectId}">
          <header class="mobile-project-head">
            <div class="mobile-project-number">${String(index + 1).padStart(2, "0")} / ${String(projectEntries.length).padStart(2, "0")}</div>
            <div class="mobile-project-kicker">${project.caseLabel}</div>
            <h2>${project.title}</h2>
            <div class="mobile-project-meta">
              <span>REGION<br><strong>${project.region}</strong></span>
              <span>AUTHOR<br><strong>${project.author}</strong></span>
            </div>
          </header>

          <section class="mobile-project-story">
            <div class="mobile-project-story-label">DESIGN CONCEPT</div>
            <h3>${project.concept}</h3>
            <div class="mobile-project-story-label">WHY THIS DESIGN</div>
            <p>${project.story}</p>
          </section>

          <section class="mobile-project-materials">
            <div class="mobile-project-story-label">MATERIAL PALETTE</div>
            <div>${project.materials.map(item => `<span>${item}</span>`).join("")}</div>
          </section>

          <section class="mobile-project-scenes" aria-label="${project.title}完整项目图片">
            ${scenes}
          </section>
        </article>
      `
    }).join("")

    portfolio.innerHTML = `
      <header class="mobile-portfolio-cover">
        <div class="mobile-portfolio-topline">
          <span>JI CHUAN SONG HE STUDIO</span>
          <span>SHANGHAI · 2026</span>
        </div>
        <div class="mobile-portfolio-title">
          <div>INTERNATIONAL INTERIOR DESIGN PORTFOLIO</div>
          <h1>纪川松禾<br><em>室内设计事务所</em></h1>
          <p>以地域 材料 光与人的体验<br>讲述每一个空间为什么如此发生</p>
        </div>
        <div class="mobile-portfolio-authors">DESIGN AUTHORS · SXJ MX ZMJ</div>
      </header>

      <nav class="mobile-portfolio-nav" aria-label="项目目录">
        ${projectNav}
      </nav>

      <section class="mobile-portfolio-intro">
        <div>SELECTED WORKS · 08 PROJECTS</div>
        <h2>完整项目<br>连续阅读</h2>
        <p>向下滑动查看每个项目的地区 材质 设计理念 设计故事与全部空间图片</p>
      </section>

      ${projectArticles}

      <footer class="mobile-portfolio-footer">
        <div>JI CHUAN SONG HE STUDIO · SHANGHAI</div>
        <h2>空间回应地域<br>材料回应时间<br>设计回应生活</h2>
        <p>DESIGN AUTHORS · SXJ MX ZMJ</p>
        <a href="#mobile-project-portfolio">返回顶部 ↑</a>
      </footer>
    `

    document.body.insertBefore(portfolio, document.getElementById("project-gallery"))
  }

  function openGallery(projectId, trigger) {
    const project = PROJECTS[projectId]
    if (!project) return
    activeProject = projectId
    activeIndex = 0
    lastTrigger = trigger
    const gallery = document.getElementById("project-gallery")
    document.getElementById("pg-kicker").textContent = project.caseLabel
    document.getElementById("pg-title").textContent = project.title
    document.getElementById("pg-region").textContent = project.region
    document.getElementById("pg-author").textContent = `AUTHOR · ${project.author}`
    document.getElementById("pg-concept").textContent = project.concept
    document.getElementById("pg-story").textContent = project.story
    document.getElementById("pg-materials").innerHTML = project.materials.map(item => `<span>${item}</span>`).join("")
    const scenes = document.getElementById("pg-scenes")
    scenes.innerHTML = project.scenes.map((_, index) => (
      `<button class="project-gallery-scene" type="button" data-scene="${index}" aria-label="查看场景 ${index + 1}">${String(index + 1).padStart(2, "0")}</button>`
    )).join("")
    scenes.querySelectorAll("[data-scene]").forEach(button => {
      button.addEventListener("click", () => showScene(Number(button.dataset.scene)))
    })
    gallery.hidden = false
    document.body.classList.add("project-gallery-open")
    showScene(0)
    document.getElementById("pg-close").focus()
  }

  function showScene(index) {
    const project = PROJECTS[activeProject]
    if (!project) return
    activeIndex = (index + project.images.length) % project.images.length
    const image = document.getElementById("pg-image")
    const imageId = `${activeProject}-gallery-img${activeIndex + 1}`
    image.dataset.imageId = imageId
    image.dataset.ownerImage = "true"
    image.src = imagePath(activeProject, activeIndex)
    image.alt = `${project.region} ${project.scenes[activeIndex]}`
    document.getElementById("pg-index").textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(project.images.length).padStart(2, "0")}`
    document.getElementById("pg-scene-name").textContent = `SCENE ${String(activeIndex + 1).padStart(2, "0")} · ${project.scenes[activeIndex]}`
    document.querySelectorAll(".project-gallery-scene").forEach((button, sceneIndex) => {
      button.setAttribute("aria-current", sceneIndex === activeIndex ? "true" : "false")
    })
  }

  function stepScene(delta) {
    if (activeProject) showScene(activeIndex + delta)
  }

  function closeGallery() {
    const gallery = document.getElementById("project-gallery")
    gallery.hidden = true
    document.body.classList.remove("project-gallery-open")
    activeProject = null
    lastTrigger?.focus()
  }

  function bindCases() {
    document.querySelectorAll("[data-project-id]").forEach(section => {
      const projectId = section.dataset.projectId
      const project = PROJECTS[projectId]
      if (!project) return

      const preview = document.createElement("div")
      preview.className = "project-preview-dock"
      preview.setAttribute("aria-label", `${project.title}全部项目图片`)
      preview.innerHTML = project.images.map((_, imageIndex) => {
        const imageId = `${projectId}-gallery-img${imageIndex + 1}`
        return `
          <button class="project-preview-item" type="button" data-preview-index="${imageIndex}" aria-label="查看${project.scenes[imageIndex]}">
            <img
              src="${imagePath(projectId, imageIndex)}"
              alt="${project.region} ${project.scenes[imageIndex]}"
              loading="lazy"
              data-image-id="${imageId}"
              data-owner-image="true"
            >
            <span>${String(imageIndex + 1).padStart(2, "0")}</span>
          </button>
        `
      }).join("")
      preview.querySelectorAll("[data-preview-index]").forEach(button => {
        button.addEventListener("click", () => {
          openGallery(projectId, button)
          showScene(Number(button.dataset.previewIndex))
        })
      })
      section.appendChild(preview)

      const button = document.createElement("button")
      button.className = "project-gallery-trigger"
      button.type = "button"
      button.textContent = `完整项目 ${String(project.images.length).padStart(2, "0")} SCENES`
      button.setAttribute("aria-label", `打开${project.title}完整项目`)
      button.addEventListener("click", () => openGallery(projectId, button))
      section.appendChild(button)
    })
  }

  function bindKeyboard() {
    document.addEventListener("keydown", event => {
      if (!activeProject) return
      if (event.key === "Escape") closeGallery()
      if (event.key === "ArrowLeft") stepScene(-1)
      if (event.key === "ArrowRight") stepScene(1)
    })
  }

  function boot() {
    createGallery()
    createMobilePortfolio()
    bindCases()
    bindKeyboard()
    window.SONGHE_PROJECTS = PROJECTS
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true })
  } else {
    boot()
  }
})()
