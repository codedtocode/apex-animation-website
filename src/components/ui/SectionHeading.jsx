function SceneLabel({ scene, inverted, centered, children }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-xs font-bold tracking-[0.2em] uppercase ${
        centered ? 'justify-center' : ''
      }`}
    >
      <span className={`px-2 py-1 ${inverted ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>SC.{scene}</span>
      {children}
    </p>
  )
}

export function SectionHeading({ scene, eyebrow, title, description, centered = false, inverted = false }) {
  return (
    <div className={`reveal max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <SceneLabel scene={scene} inverted={inverted} centered={centered}>
        {eyebrow}
      </SceneLabel>
      <h2 className="mt-6 font-display text-4xl leading-[0.98] font-extrabold tracking-tight text-balance font-stretch-semi-expanded sm:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>
      {description && (
        <p className={`mt-6 text-base leading-relaxed sm:text-lg ${inverted ? 'text-paper/70' : 'text-ink-muted'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
