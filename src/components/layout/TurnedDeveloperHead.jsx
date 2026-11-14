import { useId } from 'react'
import books from '@/assets/codedtocode-books.png'
import hair from '@/assets/codedtocode-hair.png'

const HEAD = { radius: 65, height: 136.5, corner: 45 }
const FACE = { x: -57.9, y: -111.6, scale: 1.126 }
const MOUTH_DROP = 2.2 / FACE.scale
const HAIR_BOX = { x: -103.7, y: -156.7, width: 185.4, height: 148.1 }
const HAIR_CAP = 'M-78 -104C-80 -140 -48 -162 -3 -165C37 -167 70 -150 70 -104Z'
const HAIR_COLOR = '#11161c'
const BOOKS_BOX = { x: -92, y: -267.4, width: 171.1, height: 149 }
const INK = '#0e1014'

const STROKES = {
  leftBrow:
    'M27.2 29.6C28.3 27.6 29.8 25.6 32 25.1C36 24.6 39 24.1 43 24.2C48 24.4 53 24.9 56.3 25.2C57 25.6 56.9 26.5 56 26.8C53 27.4 50 27.6 46.5 26.8C43 26.1 37 25.9 34.5 26.6C32 27.2 30 28 28.3 29.4C27.9 29.8 27.4 29.9 27.2 29.6Z',
  rightBrow:
    'M74 24.2C77 23.9 80 24 82 23.3C84 22.5 86 22 89 22L97.5 22C99.5 22.1 101 23.2 102.3 24.2C103.2 24.9 103.9 25.4 104 26.2C103 26.1 101.8 25.4 100.5 24.6C99.4 24 97.5 24 95 24L89 24C86.5 24 84 24.6 82.5 25.4C80.5 26.4 77 26.4 75.2 26.1C74.4 25.9 73.8 25.2 74 24.2Z',
  leftLid:
    'M32.9 40.4C34.3 38.6 36.6 37.1 40.5 36.8C43.5 36.5 45.2 35.3 48 34.9C51 34.6 53.5 34 56.5 34C58.6 34 60.3 34.6 60 35.6C59.8 36.4 58.6 36.9 57 37L47.5 37.3C44.5 37.4 42 38 38.5 38.1C36.4 38.2 34.6 39.2 33.6 40.5C33.3 40.8 32.8 40.7 32.9 40.4Z',
  leftPupil: 'M47.4 36L57.4 36C57.6 38.5 57.3 40.8 55.6 41.9C54.2 42.6 52 42.5 50.6 41.7C48.9 40.6 47.8 38.7 47.4 36Z',
  leftUnder:
    'M44.6 46C46.5 44.6 49.8 43.6 53.8 43.5C54.1 44.1 53.3 44.8 52 45.1C49.6 45.6 47.6 46.4 45.6 46.8C44.9 46.9 44.4 46.5 44.6 46Z',
  rightLid:
    'M71.7 34.6C72.5 33.6 74.5 33 77 33L83.5 33C87 33.2 89.6 33.6 91.2 34.4C92 34.8 92.8 35 94 35L98.2 35C99.2 35 99.7 35.7 99.2 36.2C98.8 36.5 98 36.2 97.5 36.1L92 36.1C89 36.1 84 35.9 80.5 35.6C78.8 35.4 77.2 35.3 76 35.8C74.6 36.3 72.8 36.2 72.1 35.8C71.6 35.5 71.5 35 71.7 34.6Z',
  rightPupil: 'M80 35.6L89.8 35.6C89.9 37.8 88.6 39.8 87.3 41C86.4 41.9 84.6 42 83.3 41.4C82.3 40.6 80.6 38.6 80 35.6Z',
  rightUnder:
    'M79.9 42.3C81.6 42 83.7 42.1 85.3 42.5C85.5 43.2 85 43.9 84.4 44C83 44.1 81.7 44 80.8 43.7C80.1 43.4 79.8 42.9 79.9 42.3Z',
  mouthTick: 'M75 88C75.2 87.6 75.9 87.6 76 88.1L75.9 90.7C75.8 91.2 75.1 91.2 75.1 90.7Z',
  lipShadow: 'M56 93.5C57.5 93.1 59.3 93.1 60.8 93.5C59.3 94.1 57.5 94.1 56 93.5Z',
}

const MOUTHS = {
  calm: 'M44.2 91.7C46 90.3 50.5 88.6 55 88C60 87.4 68.5 87.4 72.4 88C73.5 88.3 73.9 89.4 73.3 90C72.4 89.6 66 89.1 59 89.7C54.5 90.1 48 90.6 45.2 92C44.7 92.3 44 92.1 44.2 91.7Z',
  annoyed:
    'M47.2 91.8C50 89.6 54.5 88.4 59 88.3C63.5 88.2 68 88.6 70.4 89.8C71.2 90.1 71.1 91 70.3 91C67.5 90.2 63 89.8 59 89.9C54.5 90 50 91.2 47.7 92.6C47.1 92.8 46.9 92.2 47.2 91.8Z',
  smirk:
    'M45.5 91C48.5 89.8 53 89.2 58 89C64 88.8 69.5 87.9 72.6 86C73.4 85.5 73.9 86.6 73.2 87.3C70.5 89.2 64.5 90.4 58.5 90.6C53 90.8 48.5 91.2 46 91.9C45.4 92.1 45.2 91.4 45.5 91Z',
  gasp: 'M54.2 90.3C54.2 88.3 55.7 86.6 57.5 86.6C58.9 86.6 60.1 87.6 60.6 89C60.9 89.9 60.9 90.7 60.6 91.6C60.1 93 58.9 94 57.5 94C56.1 94 54.9 93 54.4 91.6C54.3 91.2 54.2 90.7 54.2 90.3Z',
}

const PIVOTS = {
  leftBrow: '43px 26px',
  rightBrow: '87px 24px',
  leftPupil: '53px 42.4px',
  rightPupil: '85px 41.8px',
  mouthTick: '75.5px 89.4px',
}

const WIDE_EYE = { lid: 'translateY(-1.2px)', pupil: 'scale(0.9, 1.18)' }
const NARROW_EYE = { lid: 'translateY(0.9px)', pupil: 'scale(1, 0.84)' }
const SQUINT_EYE = { lid: 'translateY(0.6px)', pupil: 'scale(1, 0.9)' }

const EXPRESSIONS = {
  calm: { mouth: MOUTHS.calm, timing: { ms: 450, ease: 'cubic-bezier(0.4, 0, 0.2, 1)' } },
  gasp: {
    mouth: MOUTHS.gasp,
    timing: { ms: 140, ease: 'cubic-bezier(0.2, 1.8, 0.4, 1)' },
    head: 'animate-head-jolt motion-reduce:animate-none',
    leftBrow: 'translateY(1px) rotate(14deg)',
    rightBrow: 'translateY(1px) rotate(-14deg)',
    leftEye: WIDE_EYE,
    rightEye: WIDE_EYE,
    mouthTick: 'scale(0)',
    lipShadow: 'translateY(2.2px)',
  },
  annoyed: {
    mouth: MOUTHS.annoyed,
    timing: { ms: 420, ease: 'cubic-bezier(0.3, 1.4, 0.5, 1)' },
    leftBrow: 'translateY(1.2px) rotate(10deg)',
    rightBrow: 'translateY(1.2px) rotate(-10deg)',
    leftEye: NARROW_EYE,
    rightEye: NARROW_EYE,
  },
  smirk: {
    mouth: MOUTHS.smirk,
    timing: { ms: 360, ease: 'cubic-bezier(0.3, 1.5, 0.5, 1)', browDelay: 120 },
    tilt: 'rotate(-2deg)',
    leftBrow: 'translateY(0.4px) rotate(2deg)',
    rightBrow: 'translateY(-1.6px) rotate(-4deg)',
    leftEye: SQUINT_EYE,
    mouthTick: 'translate(-0.3px, -2.4px) rotate(-25deg)',
  },
}

const MOTION = 'transition-transform duration-(--face-ms) ease-(--face-ease) motion-reduce:transition-none'
const MORPH = 'transition-[d] duration-(--face-ms) ease-out motion-reduce:transition-none'

function Stroke({ d, pivot, move, delayed = false }) {
  return (
    <path
      d={d}
      className={`${MOTION} ${delayed ? 'delay-(--brow-delay)' : ''}`}
      style={{ transformOrigin: pivot, transform: move }}
    />
  )
}

function Eye({ side, eye = {} }) {
  return (
    <>
      <Stroke d={STROKES[`${side}Pupil`]} pivot={PIVOTS[`${side}Pupil`]} move={eye.pupil} />
      <Stroke d={STROKES[`${side}Lid`]} move={eye.lid} />
      <path d={STROKES[`${side}Under`]} />
    </>
  )
}

export function TurnedDeveloperHead({ expression = 'calm' }) {
  const id = useId().replace(/[^\w-]/g, '')
  const face = EXPRESSIONS[expression]
  const { ms, ease, browDelay = 0 } = face.timing

  return (
    <svg
      viewBox="-125 -275 250 290"
      className="size-full overflow-visible"
      style={{ '--face-ms': `${ms}ms`, '--face-ease': ease, '--brow-delay': `${browDelay}ms` }}
    >
      <defs>
        <radialGradient id={`${id}-skin`} cx="0.6" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#eef1f5" />
          <stop offset="0.45" stopColor="#cdd3dc" />
          <stop offset="0.85" stopColor="#99a1ae" />
          <stop offset="1" stopColor="#848c99" />
        </radialGradient>
      </defs>
      <g className={face.head}>
        <g className={MOTION} style={{ transform: face.tilt }}>
          <rect
            x={-HEAD.radius}
            y={-HEAD.height}
            width={HEAD.radius * 2}
            height={HEAD.height}
            rx={HEAD.corner}
            fill={`url(#${id}-skin)`}
          />
          <path d={HAIR_CAP} fill={HAIR_COLOR} />
          <image href={hair} {...HAIR_BOX} />
          <g transform={`translate(${FACE.x} ${FACE.y}) scale(${FACE.scale})`} fill={INK}>
            <Stroke d={STROKES.leftBrow} pivot={PIVOTS.leftBrow} move={face.leftBrow} delayed />
            <Stroke d={STROKES.rightBrow} pivot={PIVOTS.rightBrow} move={face.rightBrow} delayed />
            <Eye side="left" eye={face.leftEye} />
            <Eye side="right" eye={face.rightEye} />
            <g transform={`translate(0 ${MOUTH_DROP})`}>
              <path d={face.mouth} className={MORPH} />
              <Stroke d={STROKES.mouthTick} pivot={PIVOTS.mouthTick} move={face.mouthTick} />
              <g opacity="0.6">
                <Stroke d={STROKES.lipShadow} move={face.lipShadow} />
              </g>
            </g>
          </g>
          <image href={books} {...BOOKS_BOX} />
        </g>
      </g>
    </svg>
  )
}
