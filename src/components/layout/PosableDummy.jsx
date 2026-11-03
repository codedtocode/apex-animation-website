import { useEffect, useRef, useState } from 'react'
import { HandNote } from '@/components/ui/Sketch'
import { LIMBS, studs } from '@/lib/r6Rig'
import { R6Rig } from './R6Rig'

const STUD_SIZE = 'min(calc((100vw - var(--container-stage)) * 0.085), 6.4vh)'
const TURN_DEG = -28
const TILT_DEG = -10
const DEG_PER_PX = 0.6
const ANGLE_LIMITS = { arm: [-120, 160], leg: [-70, 95] }
const GIZMO_RADIUS = 1.3
const GIZMO_COLOR = '#ff4d4d'
const DEFAULT_LIMB_ID = 'leftArm'
const SURPRISE_HOLD_MS = 450
const GAZE_SHIFT = 7

const REST_POSE = Object.fromEntries(LIMBS.map(({ id }) => [id, 0]))
const LIMBS_BY_ID = Object.fromEntries(LIMBS.map((limb) => [limb.id, limb]))
const LIMB_CONTROL_STYLE = 'pointer-events-auto cursor-grab touch-none active:cursor-grabbing'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const gazeToward = ({ x, kind }) => ({
  x: x < 2 ? -GAZE_SHIFT : GAZE_SHIFT,
  y: kind === 'leg' ? GAZE_SHIFT * 0.7 : 0,
})

const faceCamera = (ringAngle) =>
  `rotateZ(${-ringAngle}deg) rotateY(-90deg) rotateY(${-TURN_DEG}deg) rotateX(${-TILT_DEG}deg)`

function RotateGizmo({ limb, angle, handleProps }) {
  return (
    <div
      className="absolute rounded-full border-solid transform-3d"
      style={{
        width: studs(GIZMO_RADIUS * 2),
        height: studs(GIZMO_RADIUS * 2),
        left: studs(limb.x + 0.5 - GIZMO_RADIUS),
        top: studs(limb.y - GIZMO_RADIUS),
        borderWidth: `max(2px, ${studs(0.07)})`,
        borderColor: GIZMO_COLOR,
        transform: `rotateY(90deg) rotateZ(${angle}deg)`,
      }}
    >
      <span
        className={`absolute top-full left-1/2 -translate-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffb3b3,#ff4d4d_55%,#c62828)] ${LIMB_CONTROL_STYLE}`}
        style={{ width: studs(0.55), height: studs(0.55), transform: faceCamera(angle) }}
        {...handleProps}
      >
        <span
          className="pointer-events-none absolute top-1/2 left-full -translate-y-1/2 font-mono whitespace-nowrap opacity-75 [text-shadow:0_1px_2px_rgb(0_0_0/0.6)]"
          style={{ marginLeft: studs(0.2), fontSize: `max(9px, ${studs(0.22)})`, color: GIZMO_COLOR }}
        >
          {Math.round(angle)}°
        </span>
      </span>
    </div>
  )
}

export function PosableDummy({ className = '' }) {
  const dragRef = useRef(null)
  const [pose, setPose] = useState(REST_POSE)
  const [selectedId, setSelectedId] = useState(DEFAULT_LIMB_ID)
  const [hoveredId, setHoveredId] = useState(null)
  const [hasPosed, setHasPosed] = useState(false)
  const [reactingId, setReactingId] = useState(null)
  const calmDownRef = useRef(null)

  useEffect(() => () => clearTimeout(calmDownRef.current), [])

  const endDrag = () => {
    dragRef.current = null
    calmDownRef.current = setTimeout(() => setReactingId(null), SURPRISE_HOLD_MS)
  }

  const dragProps = (limbId) => ({
    onPointerDown: (event) => {
      event.preventDefault()
      event.currentTarget.setPointerCapture(event.pointerId)
      dragRef.current = { limbId, startY: event.clientY, startAngle: pose[limbId] }
      clearTimeout(calmDownRef.current)
      setSelectedId(limbId)
      setReactingId(limbId)
    },
    onPointerMove: (event) => {
      const drag = dragRef.current
      if (!drag) return
      const [min, max] = ANGLE_LIMITS[LIMBS_BY_ID[drag.limbId].kind]
      const angle = clamp(drag.startAngle + (drag.startY - event.clientY) * DEG_PER_PX, min, max)
      setPose((current) => ({ ...current, [drag.limbId]: angle }))
      setHasPosed(true)
    },
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  })

  const getLimbProps = (limbId) => ({
    ...dragProps(limbId),
    className: LIMB_CONTROL_STYLE,
    onPointerEnter: () => setHoveredId(limbId),
    onPointerLeave: () => setHoveredId((current) => (current === limbId ? null : current)),
  })

  const highlights = { ...(hoveredId && { [hoveredId]: 'hover' }), [selectedId]: 'selected' }
  const selectedLimb = LIMBS_BY_ID[selectedId]
  const reactingLimb = reactingId && LIMBS_BY_ID[reactingId]
  const rigTransform = `rotateX(${TILT_DEG}deg) rotateY(${TURN_DEG}deg)`

  return (
    <div className={`flex-col items-center ${className}`} style={{ '--stud': STUD_SIZE }}>
      <span
        className="font-semibold text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.8)]"
        style={{ fontSize: `max(12px, ${studs(0.45)})`, marginBottom: studs(0.35) }}
      >
        Dummy
      </span>
      <div className="relative" style={{ perspective: studs(32) }}>
        <R6Rig
          turnDeg={TURN_DEG}
          tiltDeg={TILT_DEG}
          pose={pose}
          highlights={highlights}
          getLimbProps={getLimbProps}
          expression={reactingLimb ? 'surprised' : 'smile'}
          gaze={reactingLimb ? gazeToward(reactingLimb) : undefined}
        />
        <div className="absolute inset-0 transform-3d" style={{ transform: rigTransform }}>
          <RotateGizmo limb={selectedLimb} angle={pose[selectedId]} handleProps={dragProps(selectedId)} />
        </div>
      </div>
      <span
        className="-z-10 rounded-full bg-black/55 blur-md"
        style={{ width: studs(5), height: studs(0.55), marginTop: studs(-0.3), translate: `${studs(-0.8)} 0` }}
      />
      <div className="flex justify-center" style={{ marginTop: studs(0.5), height: studs(1) }}>
        {!hasPosed && (
          <HandNote className="-rotate-3 whitespace-nowrap text-apex-400">drag my arms &amp; legs!</HandNote>
        )}
      </div>
    </div>
  )
}
