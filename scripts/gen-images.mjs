// Generates 5 atmospheric background images for the portfolio themes.
// Run with: node scripts/gen-images.mjs
import { createCanvas } from 'canvas'
import { writeFileSync, mkdirSync } from 'fs'

const W = 1280, H = 800
mkdirSync('public/img', { recursive: true })

// ── helpers ───────────────────────────────────────────────────────────────────

function save(canvas, name) {
  const buf = canvas.toBuffer('image/jpeg', { quality: 0.88 })
  writeFileSync(`public/img/${name}.jpg`, buf)
  console.log(`✓ public/img/${name}.jpg  (${(buf.length / 1024).toFixed(0)} KB)`)
}

// Cheap noise: scatter semi-transparent pixels at random positions
function scatter(ctx, color, count, size = 2) {
  ctx.fillStyle = color
  for (let i = 0; i < count; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    ctx.globalAlpha = Math.random() * 0.35
    ctx.beginPath()
    ctx.arc(x, y, Math.random() * size + 0.5, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

// Soft radial glow
function glow(ctx, x, y, r, color, alpha = 0.4) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, color.replace(')', `,${alpha})`).replace('rgb', 'rgba'))
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
}

// Soft linear fog band
function fogBand(ctx, y1, y2, color) {
  const g = ctx.createLinearGradient(0, y1, 0, y2)
  g.addColorStop(0, 'rgba(0,0,0,0)')
  g.addColorStop(0.5, color)
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
}

// ── 1. Obsidian — dark smoke ───────────────────────────────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  // base
  ctx.fillStyle = '#0A0A0A'; ctx.fillRect(0, 0, W, H)

  // smoke columns
  for (let i = 0; i < 5; i++) {
    const x = W * (0.1 + i * 0.2)
    const g = ctx.createRadialGradient(x, H * 0.7, 10, x, H * 0.2, H * 0.65)
    g.addColorStop(0, `rgba(${55 + i * 8},${50 + i * 6},${45 + i * 5},0.22)`)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  }

  // scattered grey particles
  scatter(ctx, 'rgba(130,125,120,1)', 2200, 1.2)
  scatter(ctx, 'rgba(90,85,80,1)', 1200, 2)

  // gold undertone glow
  glow(ctx, W * 0.5, H * 0.4, W * 0.55, 'rgb(180,145,50)', 0.07)
  fogBand(ctx, H * 0.3, H * 0.7, 'rgba(70,65,55,0.12)')

  // vignette
  const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.85)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(0,0,0,0.72)')
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H)

  save(cv, 'obsidian')
}

// ── 2. Witch — amethyst crystals ──────────────────────────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  ctx.fillStyle = '#09060F'; ctx.fillRect(0, 0, W, H)

  // deep violet atmosphere
  glow(ctx, W * 0.35, H * 0.45, W * 0.6, 'rgb(120,45,200)', 0.32)
  glow(ctx, W * 0.72, H * 0.28, W * 0.4, 'rgb(80,20,160)', 0.24)
  glow(ctx, W * 0.5, H * 0.8,  W * 0.45, 'rgb(100,30,180)', 0.18)

  // crystal shards — bright violet specks
  scatter(ctx, 'rgba(180,130,255,1)', 1800, 1)
  scatter(ctx, 'rgba(220,180,255,1)', 600, 0.6)
  scatter(ctx, 'rgba(140,80,230,1)',  1200, 1.4)

  // subtle gold crystal tips
  scatter(ctx, 'rgba(212,175,55,1)', 180, 0.8)

  fogBand(ctx, 0, H * 0.4, 'rgba(90,20,160,0.14)')

  const vig = ctx.createRadialGradient(W/2, H/2, H*0.15, W/2, H/2, H*0.9)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(5,2,12,0.8)')
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H)

  save(cv, 'witch')
}

// ── 3. Jade — dark forest mist ────────────────────────────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  ctx.fillStyle = '#060D07'; ctx.fillRect(0, 0, W, H)

  // forest depth layers
  glow(ctx, W * 0.25, H * 0.6, W * 0.55, 'rgb(15,80,25)', 0.35)
  glow(ctx, W * 0.75, H * 0.35, W * 0.5, 'rgb(10,65,20)', 0.28)
  glow(ctx, W * 0.5,  H * 0.85, W * 0.6, 'rgb(5,55,15)', 0.2)

  // forest mist particles — fine green dust
  scatter(ctx, 'rgba(80,160,90,1)',  1600, 0.9)
  scatter(ctx, 'rgba(50,120,60,1)',  2000, 1.3)
  scatter(ctx, 'rgba(110,180,100,1)', 500, 0.6)

  // gold accent — rare glints
  scatter(ctx, 'rgba(212,175,55,1)', 120, 0.7)

  fogBand(ctx, H * 0.2, H * 0.65, 'rgba(10,60,18,0.15)')

  const vig = ctx.createRadialGradient(W/2, H/2, H*0.18, W/2, H/2, H*0.88)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(2,8,3,0.78)')
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H)

  save(cv, 'jade')
}

// ── 4. Ritual — candlelight ────────────────────────────────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  ctx.fillStyle = '#0D0708'; ctx.fillRect(0, 0, W, H)

  // warm flame cores
  glow(ctx, W * 0.5,  H * 0.55, W * 0.45, 'rgb(200,80,30)', 0.28)
  glow(ctx, W * 0.28, H * 0.65, W * 0.35, 'rgb(180,60,20)', 0.2)
  glow(ctx, W * 0.72, H * 0.60, W * 0.3,  'rgb(190,70,25)', 0.18)

  // golden candlelight scatter
  scatter(ctx, 'rgba(212,175,55,1)',  800, 1)
  scatter(ctx, 'rgba(240,160,50,1)',  400, 0.8)
  scatter(ctx, 'rgba(180,100,40,1)', 1400, 1.3)

  // rose-bordeaux smoke
  scatter(ctx, 'rgba(160,70,80,1)',  600, 1.2)
  scatter(ctx, 'rgba(200,100,110,1)', 200, 0.7)

  fogBand(ctx, H * 0.25, H * 0.75, 'rgba(160,60,25,0.13)')

  const vig = ctx.createRadialGradient(W/2, H/2, H*0.12, W/2, H/2, H*0.9)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(10,4,5,0.82)')
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H)

  save(cv, 'ritual')
}

// ── 5. Celestial — starfield + moon ───────────────────────────────────────────
{
  const cv = createCanvas(W, H), ctx = cv.getContext('2d')

  ctx.fillStyle = '#060810'; ctx.fillRect(0, 0, W, H)

  // moon glow in upper-right
  glow(ctx, W * 0.68, H * 0.22, W * 0.38, 'rgb(190,205,240)', 0.28)
  glow(ctx, W * 0.68, H * 0.22, W * 0.18, 'rgb(230,240,255)', 0.35)

  // subtle nebula hints
  glow(ctx, W * 0.2, H * 0.7, W * 0.5, 'rgb(40,55,120)', 0.18)
  glow(ctx, W * 0.8, H * 0.6, W * 0.4, 'rgb(25,35,90)', 0.14)

  // star field — tiny bright specks
  scatter(ctx, 'rgba(240,245,255,1)', 2800, 0.6)
  scatter(ctx, 'rgba(200,215,240,1)', 1200, 0.9)
  scatter(ctx, 'rgba(180,200,230,1)',  600, 1.2)

  // gold stars — large and rare
  scatter(ctx, 'rgba(212,175,55,1)', 90, 1.1)

  fogBand(ctx, 0, H * 0.35, 'rgba(30,40,100,0.12)')

  const vig = ctx.createRadialGradient(W/2, H/2, H*0.22, W/2, H/2, H*0.88)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(4,5,14,0.78)')
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H)

  save(cv, 'celestial')
}

console.log('\nDone. Reference as /it/img/{name}.jpg in production.')
