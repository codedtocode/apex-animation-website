import { studs } from '@/lib/r6Rig'
import { R6Rig } from './R6Rig'

const RUNNER_STUD = '2vh'

const RUNNERS = [
  { id: 'leader', expression: 'scared', crossDelay: '-0.7s', strideDelay: '-0.2s' },
  { id: 'chaser', expression: 'angry', crossDelay: '0s', strideDelay: '0s' },
]

function Runner({ expression, crossDelay, strideDelay }) {
  return (
    <div className="absolute bottom-0 left-0 animate-run-across" style={{ animationDelay: crossDelay }}>
      <div
        className="flex animate-run-stride flex-col items-center"
        style={{ perspective: studs(32), animationDelay: strideDelay }}
      >
        <R6Rig turnDeg={72} tiltDeg={-4} armSwingDeg={70} legSwingDeg={55} leanDeg={-12} expression={expression} />
        <span
          className="-z-10 rounded-full bg-black/50 blur-[3px]"
          style={{ width: studs(3.5), height: studs(0.5), marginTop: studs(-0.25) }}
        />
      </div>
    </div>
  )
}

export function RunningDummies({ className = '' }) {
  return (
    <div className={`absolute inset-x-0 h-0 motion-reduce:hidden ${className}`} style={{ '--stud': RUNNER_STUD }}>
      {RUNNERS.map(({ id, ...runner }) => (
        <Runner key={id} {...runner} />
      ))}
    </div>
  )
}
