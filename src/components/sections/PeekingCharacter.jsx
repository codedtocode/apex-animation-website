import { DeveloperRig } from '@/components/layout/DeveloperRig'
import { LIMBS, studs } from '@/lib/r6Rig'

const TURN_DEG = -12
const TILT_DEG = -6
const GRIPPING_ARM = 'rightArm'
const BODY_PARTS = ['head', 'torso', ...LIMBS.map(({ id }) => id).filter((id) => id !== GRIPPING_ARM)]
const GRIP_REACH_STUDS = 0.45

const FIGURE_MOTION =
  'origin-[50%_60%] translate-x-[calc(var(--stud)*3.2)] transition-[translate,rotate] duration-200 ease-in in-[.is-visible]:translate-x-0 in-[.is-visible]:-rotate-[24deg] in-[.is-visible]:delay-200 in-[.is-visible]:duration-700 in-[.is-visible]:ease-[cubic-bezier(0.3,1.4,0.5,1)] motion-reduce:transition-none'

const GRIP_MOTION =
  'transition-[rotate] duration-150 in-[.is-visible]:-rotate-[60deg] in-[.is-visible]:delay-[750ms] in-[.is-visible]:duration-500 in-[.is-visible]:ease-[cubic-bezier(0.3,1.6,0.5,1)] motion-reduce:transition-none'

const GRIP_CLIP = {
  clipPath: `polygon(-100vw -100vh, ${studs(GRIP_REACH_STUDS)} -100vh, ${studs(GRIP_REACH_STUDS)} 200vh, -100vw 200vh)`,
}

const gripMotion = () => ({ className: GRIP_MOTION })

export function PeekingCharacter({ layer }) {
  const inFront = layer === 'front'

  const figure = (
    <div
      className={`absolute ${FIGURE_MOTION}`}
      style={{ left: studs(-1.5), top: studs(2.2), width: studs(4), height: studs(5) }}
    >
      <div style={{ perspective: studs(32) }}>
        <DeveloperRig
          turnDeg={TURN_DEG}
          tiltDeg={TILT_DEG}
          parts={inFront ? [GRIPPING_ARM] : BODY_PARTS}
          getLimbProps={inFront ? gripMotion : undefined}
        />
      </div>
    </div>
  )

  if (!inFront) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {figure}
      </div>
    )
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20" style={GRIP_CLIP}>
      {figure}
    </div>
  )
}
