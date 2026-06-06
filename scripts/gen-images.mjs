// Generates 5 atmospheric background images for the portfolio themes.
// Run with: node scripts/gen-images.mjs
import { createCanvas } from 'canvas'
import { writeFileSync, mkdirSync } from 'fs'

const W = 1280, H = 800
mkdirSync('public/img', { recursive: true })

function save(canvas, name) {
  const buf = canvas.toBuffer('image/jpeg', { quality: 0.9 })
  writeFileSync(`public/img/${name}.jpg`, buf)
  console.log(`✓ public/img/${name}.jpg  (${(buf.length / 1024).toFixed(0)} KB)`)
}

function scatter(ctx, color, count, size = 1) {
  ctx.fillStyle = color
  for (let i = 0; i < count; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    ctx.globalAlpha = Math.random() * 0.5
    ctx.beginPath()
    ctx.arc(x, y, Math.random() * size + 0.3, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function glow(ctx, x, y, r, color, alpha = 0.4) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, color.replace(')', `,${alpha})`).replace('rgb', 'rgba'))
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
}

// ── 1. Obsidian — rising smoke tendrils ───────────────────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  ctx.fillStyle = '#080808'
  ctx.fillRect(0, 0, W, H)

  // smoke columns — wide bezier strokes rising from bottom
  for (let col = 0; col < 9; col++) {
    const bx = W * (0.05 + col * 0.115)
    const drift = (col % 2 === 0 ? 1 : -1) * (30 + (col * 17) % 60)
    const midShift = ((col * 31) % 80) - 40

    for (let layer = 0; layer < 5; layer++) {
      const lw = 130 - layer * 18
      const alpha = 0.035 + layer * 0.01

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(bx, H + 20)
      ctx.bezierCurveTo(
        bx + midShift * 0.4, H * 0.65,
        bx + drift * 0.6 + midShift, H * 0.35,
        bx + drift, -20,
      )
      ctx.lineWidth = lw
      ctx.strokeStyle = `rgba(105,100,95,${alpha})`
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.restore()
    }
  }

  scatter(ctx, 'rgba(130,125,120,1)', 1800, 0.9)
  glow(ctx, W * 0.5, H * 0.45, W * 0.45, 'rgb(160,130,40)', 0.06)

  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.18, W / 2, H / 2, H * 0.88)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(0,0,0,0.78)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)

  save(cv, 'obsidian')
}

// ── 2. Witch — amethyst crystal cave ──────────────────────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  ctx.fillStyle = '#060310'
  ctx.fillRect(0, 0, W, H)

  glow(ctx, W * 0.42, H * 0.65, W * 0.55, 'rgb(90,25,170)', 0.38)
  glow(ctx, W * 0.72, H * 0.3, W * 0.38, 'rgb(60,10,130)', 0.22)
  glow(ctx, W * 0.18, H * 0.4, W * 0.3, 'rgb(70,15,140)', 0.18)

  // crystal shards — triangles rising from bottom and sides
  const palette = [
    [100, 45, 185], [130, 65, 210], [80, 28, 160],
    [160, 110, 240], [65, 18, 140], [190, 150, 255],
  ]
  const crystalDefs = [
    [0.08, 0.95, 0.28, 22, 0.3], [0.18, 0.88, 0.18, 32, -0.15],
    [0.28, 0.92, 0.34, 18, 0.1], [0.38, 1.0, 0.22, 28, 0.22],
    [0.5, 0.85, 0.38, 15, -0.08],[0.6, 0.95, 0.26, 24, 0.18],
    [0.7, 0.9, 0.32, 20, -0.2], [0.8, 1.0, 0.2, 30, 0.12],
    [0.88, 0.88, 0.28, 16, -0.25],[0.95, 0.95, 0.18, 22, 0.2],
    [0.12, 0.75, 0.16, 14, 0.3], [0.62, 0.72, 0.12, 18, -0.1],
    [0.45, 0.98, 0.15, 26, 0.05],[0.33, 0.78, 0.1, 12, 0.35],
    [0.75, 0.8, 0.14, 16, -0.3], [0.55, 0.88, 0.2, 22, 0.15],
    [0.22, 0.98, 0.12, 28, -0.18],[0.85, 0.72, 0.1, 14, 0.28],
    [0.42, 0.68, 0.08, 10, -0.32],[0.9, 0.98, 0.22, 20, 0.08],
    [0.05, 0.82, 0.14, 18, 0.25],[0.72, 0.65, 0.09, 12, -0.15],
  ]

  for (const [xf, yf, hf, sw, tilt] of crystalDefs) {
    const px = W * xf, baseY = H * yf, sh = H * hf
    const [r, g, b] = palette[Math.floor(xf * palette.length)]
    const alpha = 0.25 + (hf * 2)

    ctx.save()
    ctx.translate(px, baseY)
    ctx.rotate(tilt)
    ctx.beginPath()
    ctx.moveTo(0, -sh)
    ctx.lineTo(-sw / 2, 0)
    ctx.lineTo(sw / 2, 0)
    ctx.closePath()
    ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha, 0.65)})`
    ctx.fill()

    // bright tip glow
    const tipAlpha = 0.55 + hf
    const tipG = ctx.createRadialGradient(0, -sh, 0, 0, -sh, sw * 0.8)
    tipG.addColorStop(0, `rgba(225,195,255,${Math.min(tipAlpha, 0.9)})`)
    tipG.addColorStop(1, 'rgba(180,130,255,0)')
    ctx.fillStyle = tipG
    ctx.fillRect(-sw, -sh - sw, sw * 2, sw * 2)
    ctx.restore()
  }

  scatter(ctx, 'rgba(195,155,255,1)', 1200, 0.7)
  scatter(ctx, 'rgba(235,215,255,1)', 350, 0.5)
  scatter(ctx, 'rgba(212,175,55,1)', 70, 0.8)

  const vig = ctx.createRadialGradient(W / 2, H * 0.55, H * 0.08, W / 2, H * 0.55, H * 0.9)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(3,1,9,0.85)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)

  save(cv, 'witch')
}

// ── 3. Jade — forest at night with rising mist ────────────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  ctx.fillStyle = '#040A04'
  ctx.fillRect(0, 0, W, H)

  glow(ctx, W * 0.3, H * 0.5, W * 0.5, 'rgb(12,75,22)', 0.28)
  glow(ctx, W * 0.72, H * 0.4, W * 0.42, 'rgb(8,58,16)', 0.2)

  // tree silhouettes — varied heights spanning full width
  ctx.fillStyle = '#020502'
  for (let i = 0; i < 30; i++) {
    const tx = W * (i / 29)
    const tHeight = H * (0.22 + (Math.sin(i * 2.3 + 1) * 0.5 + 0.5) * 0.22)
    const tWidth = 18 + Math.sin(i * 1.7) * 10

    ctx.fillRect(tx - tWidth / 8, H - tHeight * 0.35, tWidth / 4, tHeight * 0.35)

    for (let layer = 0; layer < 3; layer++) {
      const ly = H - tHeight * (0.28 + layer * 0.24)
      const lw = tWidth * (1.8 - layer * 0.4)
      ctx.beginPath()
      ctx.moveTo(tx, ly - tHeight * 0.28)
      ctx.lineTo(tx - lw / 2, ly)
      ctx.lineTo(tx + lw / 2, ly)
      ctx.closePath()
      ctx.fill()
    }
  }

  // mist bands rising from forest floor
  for (let band = 0; band < 5; band++) {
    const by = H * (0.42 + band * 0.09)
    const bAlpha = 0.07 + band * 0.015
    const mg = ctx.createLinearGradient(0, by - 30, 0, by + 30)
    mg.addColorStop(0, 'rgba(0,0,0,0)')
    mg.addColorStop(0.5, `rgba(35,90,42,${bAlpha})`)
    mg.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = mg
    ctx.fillRect(0, by - 30, W, 60)
  }

  scatter(ctx, 'rgba(75,155,85,1)', 900, 0.8)
  scatter(ctx, 'rgba(45,115,55,1)', 600, 1.1)
  scatter(ctx, 'rgba(212,175,55,1)', 90, 0.65)

  const vig = ctx.createRadialGradient(W / 2, H * 0.4, H * 0.15, W / 2, H * 0.4, H * 0.88)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(1,4,1,0.84)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)

  save(cv, 'jade')
}

// ── 4. Ritual — single candle in darkness ─────────────────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  ctx.fillStyle = '#080304'
  ctx.fillRect(0, 0, W, H)

  glow(ctx, W * 0.5, H * 0.6, W * 0.15, 'rgb(245,210,100)', 0.55)
  glow(ctx, W * 0.5, H * 0.6, W * 0.3, 'rgb(220,120,35)', 0.38)
  glow(ctx, W * 0.5, H * 0.6, W * 0.52, 'rgb(170,60,25)', 0.2)
  glow(ctx, W * 0.5, H * 0.6, W * 0.7, 'rgb(130,40,15)', 0.1)

  // ember sparks — rising from center, fading with height and distance
  for (let i = 0; i < 140; i++) {
    const spreadX = (((i * 137) % 1000) / 1000 - 0.5) * W * 0.44
    const ex = W * 0.5 + spreadX
    const ey = H * (0.08 + ((i * 73) % 1000) / 1000 * 0.68)
    const size = 0.5 + ((i * 53) % 1000) / 1000 * 2.8

    const distFrac = Math.abs(spreadX) / (W * 0.22)
    const heightFrac = ey / H
    const alpha = Math.max(0, (1 - distFrac * 0.85) * (1 - heightFrac * 0.5)) * (0.3 + ((i * 41) % 100) / 100 * 0.7)

    if (alpha < 0.02) continue
    ctx.beginPath()
    ctx.arc(ex, ey, size, 0, Math.PI * 2)
    ctx.fillStyle = size > 1.8 ? `rgba(245,185,55,${alpha})` : `rgba(210,130,45,${alpha})`
    ctx.fill()
  }

  scatter(ctx, 'rgba(145,60,70,1)', 500, 1.1)
  scatter(ctx, 'rgba(185,95,105,1)', 180, 0.65)

  const vig = ctx.createRadialGradient(W * 0.5, H * 0.58, H * 0.06, W * 0.5, H * 0.58, H * 0.88)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(0.45, 'rgba(4,1,1,0.18)')
  vig.addColorStop(1, 'rgba(4,1,1,0.94)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)

  save(cv, 'ritual')
}

// ── 5. Celestial — night sky with moon and Milky Way ──────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  ctx.fillStyle = '#030510'
  ctx.fillRect(0, 0, W, H)

  // Milky Way — diagonal hazy band
  const mw = ctx.createLinearGradient(0, H * 0.65, W, 0)
  mw.addColorStop(0, 'rgba(0,0,0,0)')
  mw.addColorStop(0.25, 'rgba(45,58,115,0.1)')
  mw.addColorStop(0.5, 'rgba(60,78,145,0.18)')
  mw.addColorStop(0.75, 'rgba(45,58,115,0.1)')
  mw.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = mw
  ctx.fillRect(0, 0, W, H)

  glow(ctx, W * 0.22, H * 0.62, W * 0.4, 'rgb(30,45,105)', 0.15)
  glow(ctx, W * 0.78, H * 0.5, W * 0.35, 'rgb(20,32,85)', 0.12)

  // main star field
  scatter(ctx, 'rgba(240,246,255,1)', 3200, 0.45)
  scatter(ctx, 'rgba(215,228,250,1)', 1400, 0.75)
  scatter(ctx, 'rgba(185,205,240,1)', 550, 1.05)

  // dense Milky Way core stars
  for (let i = 0; i < 1000; i++) {
    const t = i / 999
    const mx = W * t
    const my = H * (0.65 - t * 0.65) + (((i * 137) % 1000) / 1000 - 0.5) * H * 0.28
    if (my < 0 || my > H) continue
    ctx.globalAlpha = ((i * 73) % 100) / 100 * 0.45
    ctx.fillStyle = 'rgba(225,238,255,1)'
    ctx.beginPath()
    ctx.arc(mx, my, ((i * 53) % 100) / 100 * 0.7, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  // Moon — visible disc, upper-right
  const moonX = W * 0.72, moonY = H * 0.2, moonR = 50

  const halo = ctx.createRadialGradient(moonX, moonY, moonR * 0.9, moonX, moonY, moonR * 5)
  halo.addColorStop(0, 'rgba(195,212,248,0.22)')
  halo.addColorStop(0.4, 'rgba(170,195,238,0.08)')
  halo.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = halo
  ctx.fillRect(0, 0, W, H)

  const moonGrad = ctx.createRadialGradient(moonX - moonR * 0.28, moonY - moonR * 0.28, 0, moonX, moonY, moonR)
  moonGrad.addColorStop(0, 'rgba(248,252,255,0.94)')
  moonGrad.addColorStop(0.55, 'rgba(225,238,255,0.88)')
  moonGrad.addColorStop(1, 'rgba(175,200,238,0.72)')
  ctx.fillStyle = moonGrad
  ctx.beginPath()
  ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2)
  ctx.fill()

  // subtle moon surface patches
  ctx.globalAlpha = 0.07
  ctx.fillStyle = '#607080'
  for (const [cx, cy, cr] of [[moonX + 14, moonY - 6, 11], [moonX - 16, moonY + 13, 8], [moonX + 6, moonY + 20, 9]]) {
    ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1

  scatter(ctx, 'rgba(212,175,55,1)', 65, 1.1)

  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(2,3,11,0.82)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)

  save(cv, 'celestial')
}

console.log('\nDone. Reference as /it/img/{name}.jpg in production.')

// ── 6. Warsaw — city at night ──────────────────────────────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  // deep night sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0, '#050508')
  sky.addColorStop(0.55, '#0A0C12')
  sky.addColorStop(1, '#1A1208')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)

  // city glow on horizon — warm amber haze
  const horizonGlow = ctx.createRadialGradient(W * 0.5, H * 0.72, 0, W * 0.5, H * 0.72, W * 0.7)
  horizonGlow.addColorStop(0, 'rgba(200,130,30,0.28)')
  horizonGlow.addColorStop(0.4, 'rgba(160,90,20,0.15)')
  horizonGlow.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = horizonGlow
  ctx.fillRect(0, 0, W, H)

  // Palace of Culture silhouette — central spire
  ctx.fillStyle = '#080810'
  const drawSpire = (cx, baseY, w, h) => {
    ctx.beginPath()
    ctx.moveTo(cx, baseY - h)
    ctx.lineTo(cx - w * 0.06, baseY - h * 0.75)
    ctx.lineTo(cx - w * 0.18, baseY - h * 0.6)
    ctx.lineTo(cx - w * 0.28, baseY - h * 0.45)
    ctx.lineTo(cx - w * 0.5, baseY - h * 0.32)
    ctx.lineTo(cx - w * 0.5, baseY)
    ctx.lineTo(cx + w * 0.5, baseY)
    ctx.lineTo(cx + w * 0.5, baseY - h * 0.32)
    ctx.lineTo(cx + w * 0.28, baseY - h * 0.45)
    ctx.lineTo(cx + w * 0.18, baseY - h * 0.6)
    ctx.lineTo(cx + w * 0.06, baseY - h * 0.75)
    ctx.closePath()
    ctx.fill()
  }
  drawSpire(W * 0.5, H * 0.78, 140, 340)

  // surrounding skyline — blocks of varying heights
  const buildings = [
    [0, 0.12, 0.76, 0.24], [0.08, 0.18, 0.82, 0.20], [0.14, 0.28, 0.88, 0.22],
    [0.22, 0.08, 0.72, 0.16], [0.3, 0.14, 0.76, 0.14], [0.38, 0.05, 0.74, 0.12],
    [0.55, 0.06, 0.76, 0.14], [0.62, 0.12, 0.80, 0.18], [0.70, 0.16, 0.84, 0.22],
    [0.76, 0.10, 0.78, 0.16], [0.84, 0.20, 0.88, 0.24], [0.90, 0.14, 0.82, 0.18],
  ]
  ctx.fillStyle = '#06060E'
  for (const [x1f, topF, x2f, botF] of buildings) {
    const bx = W * Math.min(x1f, x2f)
    const bw = W * Math.abs(x2f - x1f)
    const by = H * topF
    const bh = H * (botF - topF)
    ctx.fillRect(bx, by, bw, bh)
  }

  // windows — grid of tiny lit squares on buildings
  for (let i = 0; i < 700; i++) {
    const wx = Math.random() * W
    const wy = H * (0.05 + Math.random() * 0.72)
    const ws = 2 + Math.random() * 3
    const warm = Math.random() > 0.3
    const alpha = 0.35 + Math.random() * 0.55
    ctx.fillStyle = warm
      ? `rgba(255,${180 + Math.floor(Math.random()*50)},${60 + Math.floor(Math.random()*60)},${alpha})`
      : `rgba(${180 + Math.floor(Math.random()*60)},${200 + Math.floor(Math.random()*55)},255,${alpha * 0.6})`
    ctx.fillRect(wx, wy, ws, ws * 1.4)
  }

  // street light trails — two diagonal streaks
  for (let trail = 0; trail < 2; trail++) {
    const side = trail === 0 ? 1 : -1
    const g = ctx.createLinearGradient(W * 0.5, H * 0.78, W * (0.5 + side * 0.5), H * 0.92)
    g.addColorStop(0, 'rgba(220,160,40,0.35)')
    g.addColorStop(1, 'rgba(220,160,40,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, H * 0.78, W, H * 0.14)
  }

  // few bright stars
  for (let i = 0; i < 120; i++) {
    const sx = Math.random() * W
    const sy = Math.random() * H * 0.48
    ctx.globalAlpha = Math.random() * 0.5
    ctx.fillStyle = 'rgba(240,245,255,1)'
    ctx.beginPath()
    ctx.arc(sx, sy, Math.random() * 0.8, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  // vignette
  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(0,0,0,0.72)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)

  save(cv, 'warsaw')
}
