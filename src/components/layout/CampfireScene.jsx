import { useEffect, useId, useRef, useState } from 'react'
import { HandNote } from '@/components/ui/Sketch'
import { LIMBS, studs } from '@/lib/r6Rig'
import { DeveloperRig } from './DeveloperRig'
import { Box } from './R6Rig'
import { TurnedDeveloperHead } from './TurnedDeveloperHead'

const STUD_SIZE = 'min(calc((100vw - var(--container-stage)) * 0.06), 6.4vh)'
const TURN_DEG = 62
const TILT_DEG = -12
const RIG_TRANSFORM = `rotateX(${TILT_DEG}deg) rotateY(${TURN_DEG}deg)`
const FACE_CAMERA = `rotateY(${-TURN_DEG}deg) rotateX(${-TILT_DEG}deg)`

const SCENE = { width: 7.2, height: 7.7, rigX: -0.6, rigY: 1.85 }
const GROUND_Y = 4
const SITTING_POSE = { leftArm: 35, rightLeg: 80, leftLeg: 86 }
const BODY_PARTS = ['torso', ...LIMBS.map(({ id }) => id)]
const ROASTING_ARM = 'rightArm'
const ROASTING_ARM_MOTION = '[rotate:x_calc(var(--roast-arm)-var(--arm-drop))]'
const ARM_THICKNESS = 0.9
const THIN_ARM = '[&>div:first-child]:[scale:var(--arm-thickness)_1_var(--arm-thickness)]'
const ARM_CLASSES = {
  [ROASTING_ARM]: `${THIN_ARM} [&>div:first-child]:origin-right ${ROASTING_ARM_MOTION}`,
  leftArm: `${THIN_ARM} [&>div:first-child]:origin-left`,
}

const HAND_Y = 1.75
const STICK_DEG = 53
const ARM_DROP_DEG = 10
const STICK = { thickness: 0.16, start: -0.4, length: 4 }
const MARSHMALLOW = { size: 0.62, length: 0.5, at: 3.15 }
const MISHAP = { width: 1, height: 1.2 }
const UNDO_STICK = `rotateX(calc(-1 * var(--roast-arm) - ${STICK_DEG}deg)) ${FACE_CAMERA}`

const ARM_RANGE = { min: 44, max: 70 }
const HEAT = { full: 56, none: 66 }
const SECONDS_TO_BURN = 9
const PUT_OUT_MS = 900
const SMOKE_MS = 1100
const FLING_MS = 500
const GASP_MS = 700
const GOLDEN = { min: 0.25, max: 0.65 }
const TOAST_STOPS = [
  [0, [222, 168, 82, 0]],
  [0.4, [222, 168, 82, 0.6]],
  [0.7, [170, 98, 40, 0.8]],
  [1, [48, 28, 18, 0.92]],
]

const GIZMO_COLOR = '#ff4d4d'
const GIZMO_BALL =
  'rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffb3b3,#ff4d4d_55%,#c62828)] pointer-events-auto cursor-grab touch-none active:cursor-grabbing'
const GIZMO = { radius: 4.68, forward: 1.6, down: 0.6, offsetDeg: 37, ball: 0.36 }
const GIZMO_STROKE = 3.5
const ARROW = { length: 12, spread: 8 }
const GIZMO_FRAME = GIZMO.radius + 0.4
const BALL_TURN = `calc(90deg - var(--roast-arm) - ${GIZMO.offsetDeg}deg)`
const STICK_X = 1 - ARM_THICKNESS / 2
const ROAST_NOTE = { x: 5.45, y: 0.95 }

const STICK_SKIN = { tone: { hue: 26, saturation: 42, light: 28, range: 16 } }
const MARSHMALLOW_SKIN = {
  tone: { hue: 36, saturation: 40, light: 82, range: 14 },
  sides: 'linear-gradient(var(--toast), var(--toast))',
}

const HEAD = { x: 2, y: 1.08, width: 2.5, height: 2.9, anchor: [0.5, 275 / 290], depthOffset: 1 }
const STUMP = { x: 2, y: 3, width: 2.4, height: 1.7, anchor: [0.5, 40 / 170], depthOffset: -1.1 }
const FIRE = { x: 0.5, y: GROUND_Y, z: 4.4, width: 4.4, height: 4, anchor: [0.5, 318 / 400] }
const FIRE_VIEW = { width: 440, height: 400 }
const FIRE_LAYER = 'absolute inset-0 size-full overflow-visible'

const FLAME_COLORS = { outer: '#f2551d', mid: '#ff8f1f', inner: '#ffc23d', core: '#ffe9a3' }
const BARK = { light: '#8a5330', dark: '#5f361d' }
const WOOD_RINGS = [
  { scale: 1, color: '#e0b77e' },
  { scale: 0.55, color: '#c4925a' },
  { scale: 0.2, color: '#a87443' },
]
const STONE_LIT = { top: '#c9b6a8', front: '#a8897a', side: '#7f665d' }
const STONE_SHADED = { top: '#aab3c0', front: '#7b8494', side: '#5d6574' }

const round = (value) => Math.round(value * 10) / 10
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const heatAt = (angle) => clamp((HEAT.none - angle) / (HEAT.none - HEAT.full), 0, 1)

const toastColor = (toast) => {
  const upper = TOAST_STOPS.findIndex(([at]) => at >= toast)
  const [[fromAt, from], [toAt, to]] =
    upper > 0 ? [TOAST_STOPS[upper - 1], TOAST_STOPS[upper]] : [TOAST_STOPS[0], TOAST_STOPS[0]]
  const mix = toAt > fromAt ? (toast - fromAt) / (toAt - fromAt) : 0
  const [r, g, b, a] = from.map((channel, index) => channel + (to[index] - channel) * mix)
  return `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)} / ${a.toFixed(2)})`
}
const toPoints = (points) => points.map(([x, y]) => `${round(x)},${round(y)}`).join(' ')

const ellipsePoints = (cx, cy, rx, ry, count, offset = 0) =>
  Array.from({ length: count }, (_, index) => {
    const angle = ((index + offset) / count) * 2 * Math.PI
    return [cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry]
  })

const TONGUE_DIP = 0.07

const tonguePath = (width, height, lean) => {
  const half = width / 2
  const tip = width * lean
  return `M${round(-half)} 0C${round(-half)} ${round(-height * 0.45)} ${round(tip - width * 0.1)} ${round(-height * 0.62)} ${round(tip)} ${round(-height)}C${round(tip + width * 0.16)} ${round(-height * 0.56)} ${round(half)} ${round(-height * 0.4)} ${round(half)} 0Q0 ${round(width * 0.14)} ${round(-half)} 0Z`
}

const RING = { x: 220, y: 318, rx: 168, ry: 52 }
const STONE_COUNT = 11

const STONES = Array.from({ length: STONE_COUNT }, (_, index) => {
  const angle = ((index + 0.5) / STONE_COUNT) * 2 * Math.PI
  const depth = Math.sin(angle)
  return {
    x: RING.x + Math.cos(angle) * RING.rx,
    y: RING.y + depth * RING.ry,
    size: (54 + (index % 3) * 9) * (1 + depth * 0.14),
    flip: index % 2 === 1,
    front: depth > 0,
  }
}).sort((a, b) => a.y - b.y)

const ROCK_FACETS = [
  {
    shade: 'top',
    points: [
      [-0.42, -0.4],
      [-0.2, -0.66],
      [0.16, -0.72],
      [0.44, -0.48],
      [0.14, -0.36],
      [-0.18, -0.32],
    ],
  },
  {
    shade: 'front',
    points: [
      [-0.5, -0.02],
      [-0.42, -0.4],
      [-0.18, -0.32],
      [0.14, -0.36],
      [0.2, 0.02],
    ],
  },
  {
    shade: 'side',
    points: [
      [0.14, -0.36],
      [0.44, -0.48],
      [0.52, -0.14],
      [0.44, 0.01],
      [0.2, 0.02],
    ],
  },
]

const BACK_LOGS = [{ from: [306, 268], to: [196, 304], width: 30 }]
const FRONT_LOGS = [
  { from: [150, 312], to: [262, 286], width: 34, cap: 0.32 },
  { from: [292, 316], to: [176, 288], width: 34, cap: 0.32 },
  { from: [219, 322], to: [216, 294], width: 36, cap: 0.7 },
]

const COALS = [
  { points: '170,306 186,296 198,308 184,314', color: '#d9441c' },
  { points: '232,304 250,298 262,310 244,314', color: '#ff8c2a' },
  { points: '200,312 214,304 226,314 210,318', color: '#ffb347' },
]

const FLAME_BASE = { x: 220, y: 306 }
const FLAME_TONGUES = [
  { x: -46, width: 92, height: 150, lean: -0.35, tilt: -14, color: 'outer', duration: 1.3, delay: -0.2 },
  { x: 48, width: 96, height: 165, lean: 0.3, tilt: 16, color: 'outer', duration: 1.1, delay: -0.7 },
  { x: 0, width: 150, height: 215, lean: 0.12, tilt: 0, color: 'outer', duration: 1.5, delay: -0.4 },
  { x: -30, width: 66, height: 110, lean: -0.3, tilt: -10, color: 'mid', duration: 1, delay: -0.5 },
  { x: 34, width: 68, height: 122, lean: 0.25, tilt: 12, color: 'mid', duration: 1.2, delay: -0.1 },
  { x: 2, width: 112, height: 168, lean: -0.08, tilt: 0, color: 'mid', duration: 1.25, delay: -0.9 },
  { x: 18, width: 44, height: 80, lean: 0.2, tilt: 8, color: 'inner', duration: 0.9, delay: -0.3 },
  { x: -4, width: 78, height: 122, lean: 0.1, tilt: 0, color: 'inner', duration: 1.05, delay: -0.6 },
  { x: 0, width: 42, height: 68, lean: -0.1, tilt: 0, color: 'core', duration: 0.8, delay: -0.2 },
]

const FLAME_BITS = [
  { x: -52, y: -150, size: 18, duration: 1.6, delay: -0.3, drift: -14 },
  { x: 58, y: -140, size: 15, duration: 1.4, delay: -0.9, drift: 12 },
  { x: 12, y: -205, size: 13, duration: 1.8, delay: -1.2, drift: 6 },
]
const FLAME_BIT_RISE = -80

const EMBERS = [
  { x: -20, size: 7, duration: 2.8, delay: -0.4, drift: -30, color: '#ffcf5a' },
  { x: 30, size: 6, duration: 3.4, delay: -1.6, drift: 24, color: '#ff8a2a' },
  { x: 6, size: 8, duration: 3.1, delay: -2.5, drift: -12, color: '#ffcf5a' },
  { x: -48, size: 5, duration: 3.6, delay: -1.1, drift: -40, color: '#ff8a2a' },
  { x: 52, size: 6, duration: 2.6, delay: -2.1, drift: 36, color: '#ffcf5a' },
  { x: -2, size: 5, duration: 3.9, delay: -3.2, drift: 18, color: '#ff8a2a' },
]
const EMBER_Y = -110
const EMBER_RISE = -230

const SMALL_FLAME_VIEW = { width: 100, height: 120 }
const SMALL_FLAME_BASE = [50, 110]
const SMALL_FLAME = [
  { width: 70, height: 100, lean: 0.1, color: 'outer', duration: 0.7, delay: -0.2 },
  { width: 48, height: 70, lean: -0.1, color: 'mid', duration: 0.6, delay: -0.4 },
  { width: 26, height: 40, lean: 0.05, color: 'inner', duration: 0.5, delay: -0.1 },
]

const SMOKE_PUFFS = [
  { cx: 35, cy: 62, r: 22 },
  { cx: 62, cy: 52, r: 26 },
  { cx: 48, cy: 30, r: 20 },
]

const STUMP_TOP = { x: 120, y: 40, rx: 104, ry: 32 }
const STUMP_HEIGHT = 100
const STUMP_SIDES = 10
const STUMP_BARK = 0.88
const STUMP_FLARE = 1.08

const stumpOutline = (scale, drop = 0, flare = 1) =>
  ellipsePoints(STUMP_TOP.x, STUMP_TOP.y + drop, STUMP_TOP.rx * scale * flare, STUMP_TOP.ry * scale, STUMP_SIDES, 0.5)

const animated = (duration, delay, extra) => ({
  animationDuration: `${duration}s`,
  animationDelay: `${delay}s`,
  ...extra,
})

const percent = (value, total) => `${(value / total) * 100}%`
const fireUnits = (units) => studs((units * FIRE.width) / FIRE_VIEW.width)

const boxIn = (view, x, y, width, height) => ({
  left: percent(x, view.width),
  top: percent(y, view.height),
  width: percent(width, view.width),
  height: percent(height, view.height),
})

function Tongue({ view, base: [baseX, baseY], tilt = 0, width, height, lean, color, duration, delay }) {
  const half = width / 2
  const dip = width * TONGUE_DIP

  return (
    <div
      className="absolute"
      style={{
        ...boxIn(view, baseX - half, baseY - height, width, height + dip),
        transformOrigin: `50% ${percent(height, height + dip)}`,
        rotate: tilt ? `${tilt}deg` : undefined,
      }}
    >
      <svg
        viewBox={`${-half} ${-height} ${width} ${height + dip}`}
        className="size-full origin-bottom animate-flicker overflow-visible motion-reduce:animate-none"
        style={animated(duration, delay)}
      >
        <path d={tonguePath(width, height, lean)} fill={FLAME_COLORS[color]} />
      </svg>
    </div>
  )
}

function Rock({ x, y, size, flip, palette }) {
  return (
    <g transform={`translate(${round(x)} ${round(y)}) scale(${round(flip ? -size : size)} ${round(size)})`}>
      {ROCK_FACETS.map(({ shade, points }) => (
        <polygon key={shade} points={toPoints(points)} fill={palette[shade]} />
      ))}
    </g>
  )
}

function Log({ from: [x1, y1], to: [x2, y2], width, cap }) {
  const length = Math.hypot(x2 - x1, y2 - y1)
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  const upright = Math.abs(angle) > 90 ? -1 : 1
  const half = width / 2

  return (
    <g transform={`translate(${x1} ${y1}) rotate(${round(angle)}) scale(1 ${upright})`}>
      <rect y={-half} width={round(length)} height={half} fill={BARK.light} />
      <rect width={round(length)} height={half} fill={BARK.dark} />
      {cap &&
        WOOD_RINGS.map(({ scale, color }) => (
          <polygon
            key={scale}
            points={toPoints(ellipsePoints(0, 0, half * cap * scale, half * scale, 6))}
            fill={color}
          />
        ))}
    </g>
  )
}

function Flames() {
  return (
    <>
      {FLAME_TONGUES.map(({ x, ...tongue }, index) => (
        <Tongue key={index} view={FIRE_VIEW} base={[FLAME_BASE.x + x, FLAME_BASE.y]} {...tongue} />
      ))}
      {FLAME_BITS.map(({ x, y, size, duration, delay, drift }) => {
        const height = size * 1.6
        const dip = size * TONGUE_DIP
        return (
          <div
            key={x}
            className="absolute origin-center animate-ember motion-reduce:hidden"
            style={{
              ...boxIn(FIRE_VIEW, FLAME_BASE.x + x - size / 2, FLAME_BASE.y + y - height, size, height + dip),
              ...animated(duration, delay, {
                '--drift': fireUnits(drift),
                '--rise': fireUnits(FLAME_BIT_RISE),
                '--spin': '0deg',
              }),
            }}
          >
            <svg viewBox={`${-size / 2} ${-height} ${size} ${height + dip}`} className="size-full overflow-visible">
              <path d={tonguePath(size, height, 0)} fill={FLAME_COLORS.mid} />
            </svg>
          </div>
        )
      })}
      {EMBERS.map(({ x, size, duration, delay, drift, color }) => (
        <span
          key={x}
          className="absolute origin-center animate-ember motion-reduce:hidden"
          style={{
            ...boxIn(FIRE_VIEW, FLAME_BASE.x + x, FLAME_BASE.y + EMBER_Y, size, size),
            backgroundColor: color,
            ...animated(duration, delay, { '--drift': fireUnits(drift), '--rise': fireUnits(EMBER_RISE) }),
          }}
        />
      ))}
    </>
  )
}

function FireLayer({ className = '', children }) {
  return (
    <svg viewBox={`0 0 ${FIRE_VIEW.width} ${FIRE_VIEW.height}`} className={`${FIRE_LAYER} ${className}`}>
      {children}
    </svg>
  )
}

function Campfire() {
  const id = useId().replace(/[^\w-]/g, '')
  const backStones = STONES.filter(({ front }) => !front)
  const frontStones = STONES.filter(({ front }) => front)

  return (
    <div className="relative size-full">
      <FireLayer className="animate-glow motion-reduce:animate-none">
        <defs>
          <radialGradient id={`${id}-ground`}>
            <stop offset="0" stopColor="#ff7a28" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ff7a28" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-halo`}>
            <stop offset="0" stopColor="#ff8a32" stopOpacity="0.3" />
            <stop offset="1" stopColor="#ff8a32" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={RING.x} cy={RING.y + 4} rx="230" ry="78" fill={`url(#${id}-ground)`} />
        <circle cx={FLAME_BASE.x} cy="210" r="190" fill={`url(#${id}-halo)`} />
      </FireLayer>
      <FireLayer>
        {backStones.map((stone) => (
          <Rock key={stone.x} {...stone} palette={STONE_LIT} />
        ))}
        {BACK_LOGS.map((log) => (
          <Log key={log.from} {...log} />
        ))}
        {COALS.map(({ points, color }) => (
          <polygon key={points} points={points} fill={color} />
        ))}
      </FireLayer>
      <Flames />
      <FireLayer>
        {FRONT_LOGS.map((log) => (
          <Log key={log.from} {...log} />
        ))}
        {frontStones.map((stone) => (
          <Rock key={stone.x} {...stone} palette={STONE_SHADED} />
        ))}
      </FireLayer>
      <FireLayer className="animate-glow motion-reduce:animate-none">
        <defs>
          <radialGradient id={`${id}-light`}>
            <stop offset="0" stopColor="#ffb060" stopOpacity="0.3" />
            <stop offset="1" stopColor="#ffb060" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={FLAME_BASE.x} cy="300" rx="220" ry="120" fill={`url(#${id}-light)`} />
      </FireLayer>
    </div>
  )
}

function Stump() {
  const id = useId().replace(/[^\w-]/g, '')
  const top = stumpOutline(1)
  const bottom = stumpOutline(1, STUMP_HEIGHT, STUMP_FLARE)
  const sides = top.map((corner, index) => {
    const next = (index + 1) % STUMP_SIDES
    const facing = (corner[1] + top[next][1]) / 2 - STUMP_TOP.y
    const light = (corner[0] + top[next][0]) / 2 < STUMP_TOP.x ? 34 : 24
    return { points: [corner, top[next], bottom[next], bottom[index]], facing, light }
  })

  return (
    <svg viewBox="0 0 240 170" className="size-full overflow-visible">
      <defs>
        <radialGradient id={`${id}-shadow`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={STUMP_TOP.x - 10} cy={STUMP_TOP.y + STUMP_HEIGHT + 4} rx="150" ry="30" fill={`url(#${id}-shadow)`} />
      {sides
        .filter(({ facing }) => facing > 0)
        .map(({ points, light }) => (
          <polygon key={points[0].join()} points={toPoints(points)} fill={`hsl(24 40% ${light}%)`} />
        ))}
      <polygon points={toPoints(top)} fill={BARK.dark} />
      {WOOD_RINGS.map(({ scale, color }) => (
        <polygon key={scale} points={toPoints(stumpOutline(scale * STUMP_BARK))} fill={color} />
      ))}
    </svg>
  )
}

function SmallFlame({ lit }) {
  return (
    <div
      className={`absolute origin-[50%_92%] transition-[scale] duration-300 ${lit ? 'scale-100' : 'scale-0'}`}
      style={{ width: studs(1), height: studs(1.2), left: 0, top: studs(MISHAP.height - 1.1) }}
    >
      {SMALL_FLAME.map((tongue) => (
        <Tongue key={tongue.color} view={SMALL_FLAME_VIEW} base={SMALL_FLAME_BASE} {...tongue} />
      ))}
    </div>
  )
}

function SmokePuff() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute animate-smoke-puff opacity-0 motion-reduce:hidden"
      style={{ width: studs(0.8), height: studs(0.8), left: studs(0.1), top: studs(MISHAP.height - 0.9) }}
    >
      {SMOKE_PUFFS.map((puff) => (
        <circle key={puff.cx} {...puff} fill="#9aa0a8" />
      ))}
    </svg>
  )
}

const marshmallowMotion = (phase, batch) => {
  if (phase === 'flinging') return 'animate-marshmallow-fling'
  return batch > 0 ? 'animate-marshmallow-pop' : ''
}

function RoastingStick({ phase, batch, marshmallowRef, dragProps }) {
  return (
    <div
      className="absolute transform-3d"
      style={{ left: studs(STICK_X), top: studs(HAND_Y), rotate: `x ${STICK_DEG + ARM_DROP_DEG}deg` }}
    >
      <div
        className="absolute transform-3d"
        style={{
          left: studs(-STICK.thickness / 2),
          top: studs(STICK.start),
          width: studs(STICK.thickness),
          height: studs(STICK.length),
        }}
      >
        <Box
          width={STICK.thickness}
          height={STICK.length}
          depth={STICK.thickness}
          turnDeg={TURN_DEG}
          skin={STICK_SKIN}
        />
      </div>
      <div
        key={batch}
        ref={marshmallowRef}
        className={`pointer-events-auto absolute cursor-grab touch-none [--toast:transparent] transform-3d active:cursor-grabbing motion-reduce:animate-none ${marshmallowMotion(phase, batch)}`}
        style={{
          left: studs(-MARSHMALLOW.size / 2),
          top: studs(MARSHMALLOW.at - MARSHMALLOW.length / 2),
          width: studs(MARSHMALLOW.size),
          height: studs(MARSHMALLOW.length),
        }}
        {...dragProps}
      >
        <Box
          width={MARSHMALLOW.size}
          height={MARSHMALLOW.length}
          depth={MARSHMALLOW.size}
          turnDeg={TURN_DEG}
          skin={MARSHMALLOW_SKIN}
        />
      </div>
      <div
        className="absolute origin-bottom"
        style={{
          left: studs(-MISHAP.width / 2),
          top: studs(MARSHMALLOW.at - MISHAP.height),
          width: studs(MISHAP.width),
          height: studs(MISHAP.height),
          transform: `${UNDO_STICK} translateZ(${studs(0.1)})`,
        }}
      >
        <SmallFlame lit={phase === 'burning'} />
        {phase === 'smoking' && <SmokePuff />}
      </div>
    </div>
  )
}

const arcPoint = (degrees) => {
  const radians = (degrees * Math.PI) / 180
  return [GIZMO.radius * Math.sin(radians) * 100, GIZMO.radius * Math.cos(radians) * 100]
}

const arrowHead = (degrees, outward) => {
  const radians = (degrees * Math.PI) / 180
  const [tipX, tipY] = arcPoint(degrees)
  const [dirX, dirY] = [Math.cos(radians) * outward, -Math.sin(radians) * outward]
  const [backX, backY] = [tipX - dirX * ARROW.length, tipY - dirY * ARROW.length]
  const [sideX, sideY] = [-dirY * ARROW.spread, dirX * ARROW.spread]
  return `M${round(backX + sideX)} ${round(backY + sideY)}L${round(tipX)} ${round(tipY)}L${round(backX - sideX)} ${round(backY - sideY)}`
}

function StickGizmo({ dragProps }) {
  const [startDeg, endDeg] = [ARM_RANGE.min + GIZMO.offsetDeg, ARM_RANGE.max + GIZMO.offsetDeg]
  const [[startX, startY], [endX, endY]] = [arcPoint(startDeg), arcPoint(endDeg)]
  const radius = round(GIZMO.radius * 100)

  return (
    <div
      className="absolute origin-left"
      style={{
        left: studs(STICK_X),
        top: studs(LIMBS[0].y + GIZMO.down - GIZMO_FRAME),
        width: studs(GIZMO_FRAME),
        height: studs(GIZMO_FRAME * 2),
        transform: `rotateY(-90deg) translateX(${studs(GIZMO.forward)})`,
      }}
    >
      <svg
        viewBox={`0 ${-GIZMO_FRAME * 100} ${GIZMO_FRAME * 100} ${GIZMO_FRAME * 200}`}
        className="absolute inset-0 size-full overflow-visible"
      >
        <g fill="none" stroke={GIZMO_COLOR} strokeWidth={GIZMO_STROKE} strokeLinecap="round" strokeLinejoin="round">
          <path d={`M${round(startX)} ${round(startY)}A${radius} ${radius} 0 0 0 ${round(endX)} ${round(endY)}`} />
          <path d={arrowHead(startDeg, -1)} />
          <path d={arrowHead(endDeg, 1)} />
        </g>
      </svg>
      <div className="absolute top-1/2 left-0" style={{ rotate: BALL_TURN }}>
        <span
          aria-hidden="true"
          className={`absolute ${GIZMO_BALL}`}
          style={{
            width: studs(GIZMO.ball),
            height: studs(GIZMO.ball),
            left: studs(GIZMO.radius - GIZMO.ball / 2),
            top: studs(-GIZMO.ball / 2),
            rotate: `calc(-1 * ${BALL_TURN})`,
          }}
          {...dragProps}
        />
      </div>
    </div>
  )
}

function useRoasting(sceneRef, marshmallowRef) {
  const [phase, setPhase] = useState('fresh')
  const [batch, setBatch] = useState(0)
  const [hasRoasted, setHasRoasted] = useState(false)
  const [expression, setExpression] = useState('calm')
  const roast = useRef({
    angle: ARM_RANGE.max,
    toast: 0,
    phase: 'fresh',
    frame: 0,
    last: 0,
    timers: [],
    gaspTimer: 0,
    drag: null,
  })

  useEffect(() => {
    const state = roast.current
    return () => {
      cancelAnimationFrame(state.frame)
      state.timers.forEach(clearTimeout)
      clearTimeout(state.gaspTimer)
    }
  }, [])

  const gasp = () => {
    setExpression('gasp')
    roast.current.gaspTimer = setTimeout(() => setExpression('annoyed'), GASP_MS)
  }

  const enter = (next) => {
    roast.current.phase = next
    setPhase(next)
  }

  const later = (step, ms) => {
    roast.current.timers.push(setTimeout(step, ms))
  }

  const replaceMarshmallow = () => {
    roast.current.toast = 0
    enter('fresh')
    setBatch((count) => count + 1)
    setExpression('calm')
  }

  const putOut = () => {
    enter('smoking')
    later(() => {
      enter('flinging')
      later(replaceMarshmallow, FLING_MS)
    }, SMOKE_MS)
  }

  const toast = (now) => {
    const state = roast.current
    const heat = heatAt(state.angle)
    const seconds = (now - state.last) / 1000
    state.last = now
    if (!heat || (state.phase !== 'fresh' && state.phase !== 'burning')) {
      state.frame = 0
      return
    }
    state.toast = Math.min(1, state.toast + (seconds * heat) / SECONDS_TO_BURN)
    marshmallowRef.current?.style.setProperty('--toast', toastColor(state.toast))
    if (state.toast >= 1 && state.phase === 'fresh') {
      enter('burning')
      gasp()
    }
    state.frame = requestAnimationFrame(toast)
  }

  const moveStick = (angle) => {
    const state = roast.current
    const heat = heatAt(angle)
    const wasHeated = heatAt(state.angle) > 0
    state.angle = angle
    if (state.phase === 'fresh') {
      const golden = state.toast >= GOLDEN.min && state.toast <= GOLDEN.max
      if (heat) setExpression('calm')
      else if (wasHeated && golden) setExpression('smirk')
    }
    sceneRef.current.style.setProperty('--roast-arm', `${angle}deg`)
    if (state.phase === 'burning') {
      state.timers.forEach(clearTimeout)
      state.timers = heat ? [] : [setTimeout(putOut, PUT_OUT_MS)]
    }
    if (heat && !state.frame) {
      state.last = performance.now()
      state.frame = requestAnimationFrame(toast)
    }
  }

  const endDrag = () => {
    roast.current.drag = null
  }

  const dragProps = {
    onPointerDown: (event) => {
      event.preventDefault()
      event.currentTarget.setPointerCapture(event.pointerId)
      const studPx = sceneRef.current.getBoundingClientRect().width / SCENE.width
      roast.current.drag = {
        startY: event.clientY,
        startAngle: roast.current.angle,
        degPerPx: 180 / (Math.PI * GIZMO.radius * studPx),
      }
    },
    onPointerMove: (event) => {
      const drag = roast.current.drag
      if (!drag) return
      moveStick(clamp(drag.startAngle + (drag.startY - event.clientY) * drag.degPerPx, ARM_RANGE.min, ARM_RANGE.max))
      setHasRoasted(true)
    },
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  }

  return { phase, batch, hasRoasted, expression, dragProps }
}

function Billboard({ x, y, z = 0, width, height, anchor: [anchorX, anchorY], depthOffset = 0, children }) {
  return (
    <div
      className="absolute"
      style={{
        left: studs(x - width * anchorX),
        top: studs(y - height * anchorY),
        width: studs(width),
        height: studs(height),
        transformOrigin: `${anchorX * 100}% ${anchorY * 100}%`,
        transform: `translateZ(${studs(z)}) ${FACE_CAMERA} translateZ(${studs(depthOffset)})`,
      }}
    >
      {children}
    </div>
  )
}

const armProps = (id) => (ARM_CLASSES[id] ? { className: ARM_CLASSES[id] } : undefined)

export function CampfireScene({ className = '' }) {
  const sceneRef = useRef(null)
  const marshmallowRef = useRef(null)
  const { phase, batch, hasRoasted, expression, dragProps } = useRoasting(sceneRef, marshmallowRef)

  return (
    <div
      ref={sceneRef}
      className={className}
      style={{
        '--stud': STUD_SIZE,
        '--arm-thickness': ARM_THICKNESS,
        '--arm-drop': `${ARM_DROP_DEG}deg`,
        '--roast-arm': `${ARM_RANGE.max}deg`,
        width: studs(SCENE.width),
        height: studs(SCENE.height),
      }}
    >
      <div
        className="absolute transform-3d"
        style={{
          left: studs(SCENE.rigX),
          top: studs(SCENE.rigY),
          width: studs(4),
          height: studs(5),
          perspective: studs(32),
        }}
      >
        <DeveloperRig
          turnDeg={TURN_DEG}
          tiltDeg={TILT_DEG}
          parts={BODY_PARTS}
          pose={SITTING_POSE}
          getLimbProps={armProps}
          attachments={{
            [ROASTING_ARM]: (
              <RoastingStick phase={phase} batch={batch} marshmallowRef={marshmallowRef} dragProps={dragProps} />
            ),
          }}
        />
        <div className="absolute inset-0 transform-3d" style={{ transform: RIG_TRANSFORM }}>
          <Billboard {...STUMP}>
            <Stump />
          </Billboard>
          <Billboard {...FIRE}>
            <Campfire />
          </Billboard>
          <Billboard {...HEAD}>
            <TurnedDeveloperHead expression={expression} />
          </Billboard>
          <StickGizmo dragProps={dragProps} />
        </div>
      </div>
      {!hasRoasted && (
        <div className="absolute" style={{ left: studs(ROAST_NOTE.x), top: studs(ROAST_NOTE.y) }}>
          <HandNote className="-rotate-3 whitespace-nowrap text-apex-400">drag to roast!</HandNote>
        </div>
      )}
    </div>
  )
}
