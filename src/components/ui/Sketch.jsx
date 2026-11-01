const STROKE_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  pathLength: 1,
  className: 'draw-on',
}

const ARROW_PATHS = {
  curved: { viewBox: '0 0 120 80', shaft: 'M6 8C24 56 62 74 106 60', head: 'M88 50L107 59L93 74' },
  straight: { viewBox: '0 0 64 40', shaft: 'M4 22C20 18 38 24 57 19', head: 'M43 8L58 19L45 32' },
  loop: {
    viewBox: '0 0 120 90',
    shaft: 'M6 70C30 74 54 62 56 42C58 24 36 22 34 38C32 56 64 66 100 30',
    head: 'M84 28L101 29L99 46',
  },
}

export function SketchArrow({ shape = 'curved', strokeWidth = 3, className = '' }) {
  const { viewBox, shaft, head } = ARROW_PATHS[shape]

  return (
    <svg viewBox={viewBox} aria-hidden="true" className={className}>
      <path d={shaft} strokeWidth={strokeWidth} {...STROKE_PROPS} />
      <path d={head} strokeWidth={strokeWidth} {...STROKE_PROPS} />
    </svg>
  )
}

export function ScribbleUnderline({ className = '' }) {
  return (
    <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path d="M4 14C70 7 150 6 296 10M34 19C120 14 206 14 282 16" strokeWidth="5" {...STROKE_PROPS} />
    </svg>
  )
}

export function ScribbleCircle({ className = '' }) {
  return (
    <svg viewBox="0 0 220 90" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path
        d="M36 16C84 0 186 4 208 32C226 58 168 86 104 84C42 82 4 66 8 42C12 20 58 8 124 9"
        strokeWidth="3.5"
        {...STROKE_PROPS}
      />
    </svg>
  )
}

export function SketchCheck({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M4 13C6 14 8 16 10 19C13 12 16 8 21 4" strokeWidth="3" {...STROKE_PROPS} />
    </svg>
  )
}

export function Marked({ children }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <ScribbleUnderline className="absolute bottom-[-0.2em] left-[-4%] h-[0.32em] w-[108%] text-apex-500" />
    </span>
  )
}

export function Tape({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 h-7 w-28 bg-tape/80 shadow-[0_1px_2px_rgba(0,0,0,0.15)] [clip-path:polygon(0_8%,4%_0,9%_10%,14%_0,100%_0,96%_12%,100%_24%,96%_38%,100%_52%,96%_66%,100%_80%,96%_92%,100%_100%,6%_100%,0_88%,4%_76%,0_62%,4%_48%,0_34%,4%_20%)] ${className}`}
    />
  )
}

export function HandNote({ className = '', children }) {
  return <p className={`font-hand text-2xl leading-none font-semibold text-apex-500 ${className}`}>{children}</p>
}
