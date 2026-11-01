function SceneLabel({ scene, centered, children }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-xs font-bold tracking-[0.2em] uppercase ${
        centered ? 'justify-center' : ''
      }`}
    >
      <span className="rounded-full bg-fg px-2.5 py-1 text-canvas">SC.{scene}</span>
      {children}
    </p>
  )
}

export function SectionHeading({ scene, eyebrow, title, description, centered = false }) {
  return (
    <div className={`reveal max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <SceneLabel scene={scene} centered={centered}>
        {eyebrow}
      </SceneLabel>
      <h2 className="mt-6 font-display text-4xl leading-[0.98] font-extrabold tracking-tight text-balance font-stretch-semi-expanded sm:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>
      {description && <p className="mt-6 text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>}
    </div>
  )
}
