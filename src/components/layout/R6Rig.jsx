import { useId } from 'react'
import smileFace from '@/assets/faces/smile.png'
import uhOhFace from '@/assets/faces/uh-oh.png'
import { LIMBS, studs } from '@/lib/r6Rig'

const LIGHT_DEG = -40
const BOB_STUDS = 0.2

const HEAD_VIEWBOX = { width: 120, height: 126 }
const HEAD_WIDTH = 1.3
const HEAD_HEIGHT = (HEAD_WIDTH * HEAD_VIEWBOX.height) / HEAD_VIEWBOX.width
const HEAD_BOTTOM = 1.08
const FACE_COLOR = '#1b1d22'
const FACE_TRANSITION = 'transform 0.25s ease-out, opacity 0.15s ease-out'
const NO_GAZE = { x: 0, y: 0 }

const HIGHLIGHTS = {
  hover: 'rgb(0 162 255 / 0.55)',
  selected: '#00a2ff',
}

const DUMMY_TONE = { hue: 218, saturation: 14, light: 60, range: 26 }
const DUMMY_SKIN = { torso: { tone: DUMMY_TONE }, arm: { tone: DUMMY_TONE }, leg: { tone: DUMMY_TONE } }
const ALL_PARTS = ['head', 'torso', ...LIMBS.map(({ id }) => id)]

const toRadians = (degrees) => (degrees * Math.PI) / 180

const shade = (normalDeg, turnDeg, { hue, saturation, light, range }) => {
  const facing = Math.max(0, Math.cos(toRadians(normalDeg + turnDeg - LIGHT_DEG)))
  return `hsl(${hue} ${saturation}% ${light + range * facing}%)`
}

const topShade = ({ hue, saturation, light, range }) =>
  `hsl(${hue} ${saturation + 4}% ${Math.min(96, light + range + 7)}%)`

const bottomShade = ({ hue, saturation, light }) => `hsl(${hue} ${Math.max(0, saturation - 4)}% ${light - 18}%)`

export function Box({ width, height, depth, turnDeg, highlight, skin: { tone, front, sides } }) {
  const outline = highlight && `inset 0 0 0 max(1.5px, ${studs(0.05)}) ${HIGHLIGHTS[highlight]}`
  const faces = [
    {
      color: shade(0, turnDeg, tone),
      size: [width, height],
      transform: `translateZ(${studs(depth / 2)})`,
      pattern: sides,
      content: front,
    },
    {
      color: shade(180, turnDeg, tone),
      size: [width, height],
      transform: `rotateY(180deg) translateZ(${studs(depth / 2)})`,
      pattern: sides,
    },
    {
      color: shade(90, turnDeg, tone),
      size: [depth, height],
      transform: `rotateY(90deg) translateZ(${studs(width / 2)})`,
      pattern: sides,
    },
    {
      color: shade(-90, turnDeg, tone),
      size: [depth, height],
      transform: `rotateY(-90deg) translateZ(${studs(width / 2)})`,
      pattern: sides,
    },
    { color: topShade(tone), size: [width, depth], transform: `rotateX(90deg) translateZ(${studs(height / 2)})` },
    { color: bottomShade(tone), size: [width, depth], transform: `rotateX(-90deg) translateZ(${studs(height / 2)})` },
  ]

  return (
    <div className="absolute inset-0 transform-3d">
      {faces.map(({ color, size: [faceWidth, faceHeight], transform, pattern, content }) => (
        <div
          key={transform}
          className="absolute overflow-hidden rounded-[3px]"
          style={{
            width: studs(faceWidth),
            height: studs(faceHeight),
            left: studs((width - faceWidth) / 2),
            top: studs((height - faceHeight) / 2),
            transform,
            backgroundColor: color,
            backgroundImage: pattern,
            boxShadow: outline,
          }}
        >
          {content}
        </div>
      ))}
    </div>
  )
}

const STRIDE_SYNC = { animationDelay: 'var(--stride-delay)' }

function Part({
  x,
  y,
  width = 1,
  height = 2,
  swingDeg = 0,
  angle,
  turnDeg,
  highlight,
  skin,
  className = '',
  children,
  ...props
}) {
  const swings = angle === undefined && swingDeg !== 0

  return (
    <div
      className={`absolute origin-top transform-3d ${swings ? 'animate-limb-swing' : ''} ${className}`}
      style={{
        left: studs(x),
        top: studs(y),
        width: studs(width),
        height: studs(height),
        rotate: angle === undefined ? undefined : `x ${angle}deg`,
        ...(swings && { '--swing': `${swingDeg}deg`, ...STRIDE_SYNC }),
      }}
      {...props}
    >
      <Box width={width} height={height} depth={1} turnDeg={turnDeg} highlight={highlight} skin={skin} />
      {children}
    </div>
  )
}

const fadeIn = (visible) => ({ opacity: visible ? 1 : 0, transition: FACE_TRANSITION })

const SMILE_FACE_BOX = { x: 32.1, y: 27, width: 55.8, height: 80.7 }
const UH_OH_FACE_BOX = { x: 25.5, y: 19, width: 69, height: 92 }

function SmileFeatures() {
  return <image href={smileFace} {...SMILE_FACE_BOX} />
}

function UhOhFeatures() {
  return <image href={uhOhFace} {...UH_OH_FACE_BOX} />
}

function FrontFace({ turnDeg, surprised, gaze }) {
  const turn = toRadians(turnDeg)
  const center = HEAD_VIEWBOX.width / 2
  const transform = `translate(${center + Math.sin(turn) * 16} 0) scale(${Math.cos(turn)} 1) translate(${-center} 0)`

  return (
    <g transform={transform}>
      <g style={{ transform: `translate(${gaze.x}px, ${gaze.y}px)`, transition: FACE_TRANSITION }}>
        <g style={fadeIn(!surprised)}>
          <SmileFeatures />
        </g>
        <g style={fadeIn(surprised)}>
          <UhOhFeatures />
        </g>
      </g>
    </g>
  )
}

function AngryProfile() {
  return (
    <>
      <path d="M84 30L108 43" stroke={FACE_COLOR} strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="99" cy="56" rx="5" ry="8" fill={FACE_COLOR} />
      <ellipse cx="115" cy="55" rx="2.5" ry="7.5" fill={FACE_COLOR} />
      <path d="M92 90Q103 80 116 86" fill="none" stroke={FACE_COLOR} strokeWidth="7" strokeLinecap="round" />
    </>
  )
}

function ScaredProfile() {
  return (
    <>
      <path d="M86 28Q96 20 107 26" fill="none" stroke={FACE_COLOR} strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="98" cy="50" rx="5.5" ry="12" fill={FACE_COLOR} />
      <ellipse cx="115" cy="49" rx="2.5" ry="11" fill={FACE_COLOR} />
      <ellipse cx="108" cy="90" rx="9" ry="11" fill={FACE_COLOR} />
    </>
  )
}

const PROFILE_FACES = { angry: AngryProfile, scared: ScaredProfile }

function Head({ turnDeg, tiltDeg, expression, gaze }) {
  const id = useId().replace(/[^\w-]/g, '')
  const ProfileFace = PROFILE_FACES[expression]
  const mirror = turnDeg < 0 ? `translate(${HEAD_VIEWBOX.width} 0) scale(-1 1)` : undefined

  return (
    <svg
      viewBox={`0 0 ${HEAD_VIEWBOX.width} ${HEAD_VIEWBOX.height}`}
      className="absolute"
      style={{
        width: studs(HEAD_WIDTH),
        height: studs(HEAD_HEIGHT),
        left: studs(2 - HEAD_WIDTH / 2),
        top: studs(HEAD_BOTTOM - HEAD_HEIGHT),
        transform: `rotateY(${-turnDeg}deg) rotateX(${-tiltDeg}deg) translateZ(${studs(0.5)})`,
      }}
    >
      <defs>
        <radialGradient id={`${id}-fill`} cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#eef1f5" />
          <stop offset="0.45" stopColor="#cdd3dc" />
          <stop offset="0.85" stopColor="#99a1ae" />
          <stop offset="1" stopColor="#848c99" />
        </radialGradient>
        <linearGradient id={`${id}-side`} x1="0" x2="1">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <radialGradient id={`${id}-cap`}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <rect x="3" y="3" width="114" height="120" rx="40" />
        </clipPath>
      </defs>
      <rect x="3" y="3" width="114" height="120" rx="40" fill={`url(#${id}-fill)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect width={HEAD_VIEWBOX.width} height={HEAD_VIEWBOX.height} fill={`url(#${id}-side)`} />
        <ellipse cx="54" cy="16" rx="50" ry="16" fill={`url(#${id}-cap)`} />
      </g>
      {ProfileFace ? (
        <g clipPath={`url(#${id}-clip)`}>
          <g transform={mirror}>
            <ProfileFace />
          </g>
        </g>
      ) : (
        <FrontFace turnDeg={turnDeg} surprised={expression === 'surprised'} gaze={gaze} />
      )}
    </svg>
  )
}

function ImageHead({ image: { src, width, height, bottom, depth }, turnDeg, tiltDeg }) {
  return (
    <img
      src={src}
      alt=""
      className="absolute max-w-none"
      style={{
        width: studs(width),
        height: studs(height),
        left: studs(2 - width / 2),
        top: studs(bottom - height),
        transform: `rotateY(${-turnDeg}deg) rotateX(${-tiltDeg}deg) translateZ(${studs(depth)})`,
      }}
    />
  )
}

export function R6Rig({
  turnDeg,
  tiltDeg,
  armSwingDeg = 0,
  legSwingDeg = 0,
  leanDeg = 0,
  expression = 'smile',
  gaze = NO_GAZE,
  pose,
  highlights = {},
  getLimbProps,
  skin = DUMMY_SKIN,
  headImage,
  parts = ALL_PARTS,
  attachments = {},
}) {
  const shows = (part) => parts.includes(part)
  const runs = armSwingDeg !== 0 || legSwingDeg !== 0

  return (
    <div
      className="relative transform-3d"
      style={{ width: studs(4), height: studs(5), transform: `rotateX(${tiltDeg}deg) rotateY(${turnDeg}deg)` }}
    >
      <div
        className={`absolute inset-0 origin-bottom transform-3d ${runs ? 'animate-run-bob' : ''}`}
        style={{
          ...(runs && { '--bob-height': studs(BOB_STUDS), ...STRIDE_SYNC }),
          transform: leanDeg ? `rotateX(${leanDeg}deg)` : undefined,
        }}
      >
        {shows('head') &&
          (headImage ? (
            <ImageHead image={headImage} turnDeg={turnDeg} tiltDeg={tiltDeg} />
          ) : (
            <Head turnDeg={turnDeg} tiltDeg={tiltDeg} expression={expression} gaze={gaze} />
          ))}
        {shows('torso') && <Part x={1} y={1} width={2} turnDeg={turnDeg} skin={skin.torso} />}
        {LIMBS.filter(({ id }) => shows(id)).map(({ id, kind, x, y, side }) => (
          <Part
            key={id}
            x={x}
            y={y}
            swingDeg={side * (kind === 'arm' ? armSwingDeg : legSwingDeg)}
            angle={pose?.[id]}
            turnDeg={turnDeg}
            highlight={highlights[id]}
            skin={skin[kind]}
            {...getLimbProps?.(id)}
          >
            {attachments[id]}
          </Part>
        ))}
      </div>
    </div>
  )
}
