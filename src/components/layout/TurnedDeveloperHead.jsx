import { useId } from 'react'
import books from '@/assets/codedtocode-books.png'
import hair from '@/assets/codedtocode-hair.png'
import sleepyFace from '@/assets/faces/sleepy.png'

const HEAD = { radius: 65, height: 136.5, corner: 45 }
const SLEEPY_FACE_SIZE = { width: 122, height: 118 }
const FACE_SCALE = 1.126
const FACE_PIECES = [
  { crop: [20, 15, 90, 35], origin: [-57.9, -111.6] },
  { crop: [40, 82, 42, 16], origin: [-57.9, -109.4] },
]
const HAIR_BOX = { x: -103.7, y: -156.7, width: 185.4, height: 148.1 }
const HAIR_CAP = 'M-78 -104C-80 -140 -48 -162 -3 -165C37 -167 70 -150 70 -104Z'
const HAIR_COLOR = '#11161c'
const BOOKS_BOX = { x: -92, y: -267.4, width: 171.1, height: 149 }

function FacePiece({ crop: [cropX, cropY, cropWidth, cropHeight], origin: [x, y] }) {
  return (
    <svg
      x={x + cropX * FACE_SCALE}
      y={y + cropY * FACE_SCALE}
      width={cropWidth * FACE_SCALE}
      height={cropHeight * FACE_SCALE}
      viewBox={`${cropX} ${cropY} ${cropWidth} ${cropHeight}`}
    >
      <image href={sleepyFace} {...SLEEPY_FACE_SIZE} />
    </svg>
  )
}

export function TurnedDeveloperHead() {
  const id = useId().replace(/[^\w-]/g, '')

  return (
    <svg viewBox="-125 -275 250 290" className="size-full overflow-visible">
      <defs>
        <radialGradient id={`${id}-skin`} cx="0.6" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#eef1f5" />
          <stop offset="0.45" stopColor="#cdd3dc" />
          <stop offset="0.85" stopColor="#99a1ae" />
          <stop offset="1" stopColor="#848c99" />
        </radialGradient>
      </defs>
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
      {FACE_PIECES.map((piece) => (
        <FacePiece key={piece.crop.join()} {...piece} />
      ))}
      <image href={books} {...BOOKS_BOX} />
    </svg>
  )
}
