const LAYER_COLORS = ['#ff0080', '#00ffb4', '#ffc800', '#6464ff', '#00ff00']

const state = {
  imagePath: '',
  imageDataUrl: '',
  imageWidth: 0,
  imageHeight: 0,
  sessionId: '',
  layers: [],
  activeLayerId: null,
  mode: 1,
  layerCounter: 0,
  generatedModels: [],
  cameraInfo: null,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  panning: false,
  lastPanX: 0,
  lastPanY: 0
}

const els = {
  imageInput: document.getElementById('image-input'),
  uploadBtn: document.getElementById('upload-btn'),
  addLayerBtn: document.getElementById('add-layer-btn'),
  clearPointsBtn: document.getElementById('clear-points-btn'),
  resetBtn: document.getElementById('reset-btn'),
  checkStatusBtn: document.getElementById('check-status-btn'),
  fgModeBtn: document.getElementById('fg-mode-btn'),
  bgModeBtn: document.getElementById('bg-mode-btn'),
  saveMaskBtn: document.getElementById('save-mask-btn'),
  generate3dBtn: document.getElementById('generate-3d-btn'),
  serverUrlInput: document.getElementById('server-url-input'),
  sessionValue: document.getElementById('session-value'),
  imageValue: document.getElementById('image-value'),
  activeLayerValue: document.getElementById('active-layer-value'),
  maskValue: document.getElementById('mask-value'),
  modelsList: document.getElementById('models-list'),
  logOutput: document.getElementById('log-output'),
  stage: document.getElementById('stage'),
  stageEmpty: document.getElementById('stage-empty'),
  imageView: document.getElementById('image-view'),
  viewport: document.getElementById('viewport'),
  pointsLayer: document.getElementById('points-layer'),
  maskLayer: document.getElementById('mask-layer'),
  layersList: document.getElementById('layers-list'),
  hudCursor: document.getElementById('hud-cursor'),
  hudZoom: document.getElementById('hud-zoom'),
  loadingOverlay: document.getElementById('loading-overlay'),
  loadingTitle: document.getElementById('loading-title'),
  loadingDetail: document.getElementById('loading-detail')
}

function log(message) {
  els.logOutput.textContent = message
}

function showLoading(title, detail = '') {
  els.loadingTitle.textContent = title
  els.loadingDetail.textContent = detail
  els.loadingOverlay.classList.remove('hidden')
}

function updateLoading(title, detail = '') {
  els.loadingTitle.textContent = title
  els.loadingDetail.textContent = detail
}

function hideLoading() {
  els.loadingOverlay.classList.add('hidden')
}

function activeLayer() {
  return state.layers.find((layer) => layer.id === state.activeLayerId) || null
}

function sanitizeName(name, fallback) {
  const safe = String(name || '')
    .split('')
    .filter((char) => /[a-zA-Z0-9 _-]/.test(char))
    .join('')
    .trim()
  return safe || fallback
}

function setUiEnabled(enabled) {
  ;[
    els.uploadBtn,
    els.addLayerBtn,
    els.clearPointsBtn,
    els.resetBtn,
    els.checkStatusBtn,
    els.fgModeBtn,
    els.bgModeBtn,
    els.saveMaskBtn,
    els.generate3dBtn,
    els.serverUrlInput
  ].forEach((element) => {
    element.disabled = !enabled
  })
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })

  const result = await response.json()
  if (!response.ok || result.error) {
    throw new Error(result.error || `Request failed: ${path}`)
  }
  return result
}

function setMode(mode) {
  state.mode = mode
  els.fgModeBtn.classList.toggle('active', mode === 1)
  els.bgModeBtn.classList.toggle('active', mode === 0)
}

function applyViewportTransform() {
  els.viewport.style.transform = `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.scale})`
  els.hudZoom.textContent = `Zoom: ${Math.round(state.scale * 100)}%`
}

function fitToView() {
  if (!state.imageWidth || !state.imageHeight) {
    return
  }

  const availableWidth = els.stage.clientWidth - 40
  const availableHeight = els.stage.clientHeight - 40
  state.scale = Math.min(availableWidth / state.imageWidth, availableHeight / state.imageHeight, 1)
  state.offsetX = Math.round((els.stage.clientWidth - state.imageWidth * state.scale) / 2)
  state.offsetY = Math.round((els.stage.clientHeight - state.imageHeight * state.scale) / 2)
  applyViewportTransform()
}

function updateStatusPanel() {
  const layer = activeLayer()
  els.sessionValue.textContent = state.sessionId || '-'
  els.imageValue.textContent = state.imagePath || '-'
  els.activeLayerValue.textContent = layer ? layer.name : '-'
  els.maskValue.textContent = layer && layer.maskPath ? layer.maskPath : '-'
}

function renderLayerList() {
  els.layersList.innerHTML = ''

  state.layers.forEach((layer) => {
    const card = document.createElement('div')
    card.className = `layer-card${layer.id === state.activeLayerId ? ' selected' : ''}`
    card.addEventListener('click', () => {
      state.activeLayerId = layer.id
      renderAll()
    })

    const colorBar = document.createElement('div')
    colorBar.className = 'layer-color'
    colorBar.style.background = layer.color

    const main = document.createElement('div')
    main.className = 'layer-main'

    const input = document.createElement('input')
    input.className = 'layer-name'
    input.value = layer.name
    input.addEventListener('click', (event) => event.stopPropagation())
    input.addEventListener('change', () => {
      layer.name = input.value.trim() || layer.name
      renderAll()
    })

    const meta = document.createElement('div')
    meta.className = 'layer-meta'
    meta.textContent = `${layer.points.length} points`

    main.appendChild(input)
    main.appendChild(meta)

    const actions = document.createElement('div')
    actions.className = 'layer-actions'

    const visBtn = document.createElement('button')
    visBtn.className = 'icon-btn'
    visBtn.type = 'button'
    visBtn.textContent = layer.isVisible ? '👁' : '◌'
    visBtn.addEventListener('click', (event) => {
      event.stopPropagation()
      layer.isVisible = !layer.isVisible
      renderAll()
    })

    const delBtn = document.createElement('button')
    delBtn.className = 'icon-btn'
    delBtn.type = 'button'
    delBtn.textContent = '×'
    delBtn.addEventListener('click', async (event) => {
      event.stopPropagation()
      deleteLayer(layer.id)
    })

    actions.appendChild(visBtn)
    actions.appendChild(delBtn)

    card.appendChild(colorBar)
    card.appendChild(main)
    card.appendChild(actions)
    els.layersList.appendChild(card)
  })
}

function renderMasks() {
  els.maskLayer.innerHTML = ''

  state.layers.forEach((layer) => {
    if (!layer.isVisible || !layer.maskDataUrl) {
      return
    }

    const img = document.createElement('img')
    img.className = 'mask-overlay'
    img.src = layer.maskDataUrl
    img.style.background = layer.color
    img.style.mixBlendMode = 'screen'
    els.maskLayer.appendChild(img)
  })
}

function renderPoints() {
  els.pointsLayer.innerHTML = ''

  state.layers.forEach((layer) => {
    if (!layer.isVisible) {
      return
    }

    layer.points.forEach((point) => {
      const marker = document.createElement('div')
      marker.className = `point ${point.label === 1 ? 'fg' : 'bg'}`
      marker.style.left = `${point.x}px`
      marker.style.top = `${point.y}px`
      marker.style.color = layer.color
      marker.style.borderColor = point.label === 1 ? layer.color : ''
      marker.style.boxShadow = point.label === 1 ? `0 0 0 8px ${hexToRgba(layer.color, 0.18)}` : ''
      els.pointsLayer.appendChild(marker)
    })
  })
}

function renderGeneratedModels() {
  els.modelsList.innerHTML = ''

  state.generatedModels.forEach((item) => {
    const node = document.createElement('div')
    node.className = 'model-item'
    node.innerHTML = `<strong>${item.name}</strong><br><a href="${item.url}" target="_blank" rel="noreferrer">${item.fileName}</a>`
    els.modelsList.appendChild(node)
  })
}

function syncStageState() {
  const hasImage = Boolean(state.imageDataUrl)
  els.stageEmpty.style.display = hasImage ? 'none' : 'flex'
  els.imageView.style.display = hasImage ? 'block' : 'none'
  updateStatusPanel()
}

function renderAll() {
  renderLayerList()
  renderMasks()
  renderPoints()
  renderGeneratedModels()
  syncStageState()
}

function hexToRgba(hex, alpha) {
  const value = hex.replace('#', '')
  const bigint = Number.parseInt(value, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function createNewLayer() {
  state.layerCounter += 1
  const layer = {
    id: String(state.layerCounter),
    name: `object_${state.layerCounter}`,
    color: LAYER_COLORS[(state.layerCounter - 1) % LAYER_COLORS.length],
    points: [],
    maskDataUrl: '',
    maskPath: '',
    isVisible: true
  }
  state.layers.unshift(layer)
  state.activeLayerId = layer.id
  renderAll()
  return layer
}

function clearCurrentPoints() {
  const layer = activeLayer()
  if (!layer) {
    return
  }
  layer.points = []
  layer.maskDataUrl = ''
  layer.maskPath = ''
  renderAll()
  log('SYS >> CURRENT LAYER CLEARED.')
}

function clearAll() {
  state.layers = []
  state.activeLayerId = null
  state.generatedModels = []
  state.cameraInfo = null
  renderAll()
  log('SYS >> RESET COMPLETE.')
}

function deleteLayer(layerId) {
  state.layers = state.layers.filter((layer) => layer.id !== layerId)
  if (state.activeLayerId === layerId) {
    state.activeLayerId = state.layers[0] ? state.layers[0].id : null
  }
  renderAll()
}

function findNearestPoint(layer, x, y) {
  let nearest = -1
  let best = Infinity
  const threshold = 15 / state.scale

  layer.points.forEach((point, index) => {
    const dist = (point.x - x) ** 2 + (point.y - y) ** 2
    if (dist < best) {
      best = dist
      nearest = index
    }
  })

  return best <= threshold ** 2 ? nearest : -1
}

function undoLastPoint() {
  const layer = activeLayer()
  if (!layer || !layer.points.length) {
    return
  }

  layer.points.pop()
  if (layer.points.length === 0) {
    layer.maskDataUrl = ''
    layer.maskPath = ''
    renderAll()
    return
  }

  runSamUpdate(layer).catch((error) => log(error.message || String(error)))
}

async function checkStatus() {
  const result = await api('/api/v1/plugins/sam3-segmentation/status', { method: 'GET' })
  log(`sam3: ${result.sam3_server.available ? 'ok' : 'down'}\ngen3d: ${result.gen3d_server.available ? 'ok' : 'down'}`)
}

async function setImageOnBackend() {
  const result = await api('/api/v1/plugins/sam3-segmentation/set-image', {
    method: 'POST',
    body: JSON.stringify({
      image_path: state.imagePath,
      session_id: state.sessionId || undefined,
      camera_info: state.cameraInfo || undefined
    })
  })
  state.sessionId = result.session_id
  updateStatusPanel()
}

async function setCameraInfo(cameraInfo) {
  state.cameraInfo = cameraInfo
  if (!state.sessionId) {
    return
  }

  await api('/api/v1/plugins/sam3-segmentation/set-camera-info', {
    method: 'POST',
    body: JSON.stringify({
      session_id: state.sessionId,
      camera_info: cameraInfo
    })
  })
}

async function handleImageSelected(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('读取图片失败'))
    reader.readAsDataURL(file)
  })

  const uploadResult = await api('/api/v1/plugins/sam3-segmentation/upload-image', {
    method: 'POST',
    body: JSON.stringify({
      filename: file.name,
      data_url: dataUrl
    })
  })

  state.imagePath = uploadResult.image_path
  state.imageDataUrl = dataUrl
  state.sessionId = ''
  state.generatedModels = []
  clearAll()
  state.layers = []
  state.layerCounter = 0
  els.imageView.src = dataUrl
  log(`SYS >> IMPORTING SOURCE...\n${uploadResult.name}`)
}

async function runSamUpdate(layer) {
  if (!state.imagePath || !layer.points.length) {
    return
  }

  showLoading('正在更新 Mask...', layer.name)
  try {
    const result = await api('/api/v1/plugins/sam3-segmentation/predict', {
      method: 'POST',
      body: JSON.stringify({
        points: layer.points.map((point) => [point.x, point.y]),
        labels: layer.points.map((point) => point.label)
      })
    })

    layer.maskDataUrl = `data:image/png;base64,${result.mask_b64}`
    layer.maskPath = ''
    renderAll()
    log(`SYS >> MASK UPDATED.\n${layer.name}\nIoU: ${result.iou}\nPixels: ${result.pixels}\nRatio: ${result.ratio}`)
  } finally {
    hideLoading()
  }
}

async function saveCurrentMask() {
  const layer = activeLayer()
  if (!layer || !layer.maskDataUrl || !state.sessionId) {
    throw new Error('Active object has no mask.')
  }

  const result = await api('/api/v1/plugins/sam3-segmentation/save-masks', {
    method: 'POST',
    body: JSON.stringify({
      session_id: state.sessionId,
      masks: [
        {
          name: layer.name,
          mask_b64: layer.maskDataUrl.split(',')[1]
        }
      ]
    })
  })

  if (!result.masks[0]) {
    throw new Error('Mask 保存失败')
  }

  layer.maskPath = result.masks[0].path
  renderAll()
  log(`SYS >> MASK EXPORTED.\n${layer.name}\n${layer.maskPath}`)
}

async function saveVisibleMasks() {
  const visibleLayers = state.layers.filter((layer) => layer.isVisible && layer.maskDataUrl)
  if (!visibleLayers.length || !state.sessionId) {
    throw new Error('No visible objects with masks found.')
  }

  const result = await api('/api/v1/plugins/sam3-segmentation/save-masks', {
    method: 'POST',
    body: JSON.stringify({
      session_id: state.sessionId,
      masks: visibleLayers.map((layer) => ({
        name: layer.name,
        mask_b64: layer.maskDataUrl.split(',')[1]
      }))
    })
  })

  result.masks.forEach((mask, index) => {
    if (visibleLayers[index]) {
      visibleLayers[index].maskPath = mask.path
    }
  })
  renderAll()
}

async function generate3dModel() {
  const visibleLayers = state.layers.filter((layer) => layer.isVisible && layer.maskDataUrl)
  if (!visibleLayers.length) {
    throw new Error('No visible objects with masks found.')
  }

  setUiEnabled(false)
  showLoading('正在生成 3D 模型...', `共 ${visibleLayers.length} 个对象`)

  try {
    await saveVisibleMasks()
    state.generatedModels = []

    for (let index = 0; index < visibleLayers.length; index += 1) {
      const layer = visibleLayers[index]
      updateLoading(`正在生成: ${index + 1}/${visibleLayers.length}`, layer.name)
      const result = await api('/api/v1/plugins/sam3-segmentation/generate-3d', {
        method: 'POST',
        body: JSON.stringify({
          image_path: state.imagePath,
          mask_path: layer.maskPath,
          format: 'glb',
          server_url: els.serverUrlInput.value.trim(),
          camera_info: state.cameraInfo || undefined,
          name: layer.name,
          session_id: state.sessionId
        })
      })

      state.generatedModels.push({
        name: layer.name,
        fileName: result.file.name,
        url: `/api/v1/files/serve?name=${encodeURIComponent(result.file.name)}`
      })
    }

    renderAll()
    log(`SYS >> BATCH GEN COMPLETE.\n成功生成 ${state.generatedModels.length} 个对象`)
  } finally {
    hideLoading()
    setUiEnabled(true)
  }
}

function screenToImage(clientX, clientY) {
  const rect = els.stage.getBoundingClientRect()
  const x = (clientX - rect.left - state.offsetX) / state.scale
  const y = (clientY - rect.top - state.offsetY) / state.scale
  return { x, y }
}

function handleCanvasClick(event, labelOverride = null) {
  if (!state.imagePath || !state.imageWidth || state.panning) {
    return
  }

  const point = screenToImage(event.clientX, event.clientY)
  if (point.x < 0 || point.y < 0 || point.x >= state.imageWidth || point.y >= state.imageHeight) {
    return
  }

  let layer = activeLayer()
  if (!layer) {
    layer = createNewLayer()
  }

  layer.points.push({
    x: point.x,
    y: point.y,
    label: labelOverride === null ? state.mode : labelOverride
  })
  renderAll()
  runSamUpdate(layer).catch((error) => log(error.message || String(error)))
}

function removeNearestPoint(event) {
  const layer = activeLayer()
  if (!layer || !layer.points.length) {
    return
  }

  const point = screenToImage(event.clientX, event.clientY)
  const nearest = findNearestPoint(layer, point.x, point.y)
  if (nearest === -1) {
    return
  }

  layer.points.splice(nearest, 1)
  if (!layer.points.length) {
    layer.maskDataUrl = ''
    layer.maskPath = ''
    renderAll()
    return
  }

  renderAll()
  runSamUpdate(layer).catch((error) => log(error.message || String(error)))
}

els.uploadBtn.addEventListener('click', () => {
  els.imageInput.click()
})

els.imageInput.addEventListener('change', async (event) => {
  const file = event.target.files && event.target.files[0]
  if (!file) {
    return
  }

  try {
    await handleImageSelected(file)
  } catch (error) {
    log(error.message || String(error))
  } finally {
    els.imageInput.value = ''
  }
})

els.imageView.addEventListener('load', async () => {
  state.imageWidth = els.imageView.naturalWidth
  state.imageHeight = els.imageView.naturalHeight
  els.viewport.style.width = `${state.imageWidth}px`
  els.viewport.style.height = `${state.imageHeight}px`
  fitToView()
  if (!state.layers.length) {
    createNewLayer()
  }
  await setImageOnBackend()
  renderAll()
  log('SYS >> SOURCE LOADED.')
})

els.stage.addEventListener('wheel', (event) => {
  if (!state.imageWidth) {
    return
  }

  event.preventDefault()
  const oldScale = state.scale
  const factor = event.deltaY < 0 ? 1.15 : 0.85
  const newScale = Math.max(0.05, Math.min(oldScale * factor, 50))
  const rect = els.stage.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  state.offsetX = mouseX - ((mouseX - state.offsetX) / oldScale) * newScale
  state.offsetY = mouseY - ((mouseY - state.offsetY) / oldScale) * newScale
  state.scale = newScale
  applyViewportTransform()
})

els.stage.addEventListener('mousedown', (event) => {
  if (event.button === 1) {
    state.panning = true
    state.lastPanX = event.clientX
    state.lastPanY = event.clientY
    els.stage.classList.add('panning')
    event.preventDefault()
  }
})

window.addEventListener('mousemove', (event) => {
  const point = screenToImage(event.clientX, event.clientY)
  els.hudCursor.textContent = `X:${Math.round(point.x)} Y:${Math.round(point.y)}`

  if (!state.panning) {
    return
  }

  state.offsetX += event.clientX - state.lastPanX
  state.offsetY += event.clientY - state.lastPanY
  state.lastPanX = event.clientX
  state.lastPanY = event.clientY
  applyViewportTransform()
})

window.addEventListener('mouseup', (event) => {
  if (event.button === 1) {
    state.panning = false
    els.stage.classList.remove('panning')
  }
})

els.stage.addEventListener('click', (event) => {
  if (event.button === 0) {
    handleCanvasClick(event)
  }
})

els.stage.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  removeNearestPoint(event)
})

window.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
    event.preventDefault()
    undoLastPoint()
  }
})

window.addEventListener('resize', () => {
  if (state.imageWidth) {
    fitToView()
    renderAll()
  }
})

els.fgModeBtn.addEventListener('click', () => setMode(1))
els.bgModeBtn.addEventListener('click', () => setMode(0))
els.addLayerBtn.addEventListener('click', () => createNewLayer())
els.clearPointsBtn.addEventListener('click', () => clearCurrentPoints())
els.resetBtn.addEventListener('click', () => clearAll())

els.checkStatusBtn.addEventListener('click', async () => {
  try {
    await checkStatus()
  } catch (error) {
    log(error.message || String(error))
  }
})

els.saveMaskBtn.addEventListener('click', async () => {
  try {
    await saveCurrentMask()
  } catch (error) {
    log(error.message || String(error))
  }
})

els.generate3dBtn.addEventListener('click', async () => {
  try {
    await generate3dModel()
  } catch (error) {
    hideLoading()
    setUiEnabled(true)
    log(error.message || String(error))
  }
})

setMode(1)
applyViewportTransform()
renderAll()
checkStatus().catch((error) => {
  log(error.message || String(error))
})

window.sam3Plugin = {
  setCameraInfo
}
