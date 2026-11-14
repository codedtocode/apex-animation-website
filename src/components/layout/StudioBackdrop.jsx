import { useCallback, useMemo, useRef } from 'react'
import { useScrollLinked } from '@/hooks/useScrollLinked'
import { CampfireScene } from './CampfireScene'
import { PosableDummy } from './PosableDummy'
import { RunningDummies } from './RunningDummies'

const FARTHEST_SCALE = 0.8

const depthAt = (progress) => ({ scale: `${1 - (1 - FARTHEST_SCALE) * progress}` })

const SIDES = [
  { id: 'left', edge: 'left-0', origin: 'origin-[calc(50%-var(--container-stage)/2)_46%]' },
  { id: 'right', edge: 'right-0', origin: 'origin-[calc(50%+var(--container-stage)/2)_46%]' },
]
const [LEFT_SIDE, RIGHT_SIDE] = SIDES

export function StudioBackdrop() {
  const receding = useRef(new Set())

  const recedes = useCallback((element) => {
    receding.current.add(element)
    return () => receding.current.delete(element)
  }, [])

  const tracks = useMemo(() => [{ targets: () => [...receding.current], styleAt: depthAt }], [])
  useScrollLinked(tracks)

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-backdrop via-[#0e0e0f] via-40% to-[#242427] to-[46%]" />
        {SIDES.map(({ id, edge, origin }) => (
          <div key={id} className={`absolute inset-y-0 w-1/2 overflow-hidden ${edge}`}>
            <div ref={recedes} className={`absolute inset-y-0 w-[200%] will-change-transform ${edge} ${origin}`}>
              <div className="absolute top-[46%] left-1/2 h-[140%] w-[300%] origin-top -translate-x-1/2 [transform:perspective(900px)_rotateX(74deg)] bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px),repeating-conic-gradient(#1c1c1f_0_25%,#151517_0_50%)] bg-size-[96px_96px]" />
            </div>
          </div>
        ))}
        <RunningDummies runnerRef={recedes} className="top-[46%] hidden min-[87rem]:block" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,transparent_55%,rgb(0_0_0/0.3))]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 hidden min-[110rem]:block">
        <div ref={recedes} className={`absolute inset-0 will-change-transform ${LEFT_SIDE.origin}`}>
          <CampfireScene className="absolute bottom-[14%] left-[calc(25%-var(--container-stage)/4)] -translate-x-1/2" />
        </div>
        <div ref={recedes} className={`absolute inset-0 will-change-transform ${RIGHT_SIDE.origin}`}>
          <PosableDummy className="absolute bottom-[14%] left-[calc(75%+var(--container-stage)/4)] flex -translate-x-1/2" />
        </div>
      </div>
    </>
  )
}
