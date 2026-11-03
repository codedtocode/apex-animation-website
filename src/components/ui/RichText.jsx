const INLINE_CODE = /`([^`]+)`/

export function RichText({ text }) {
  return text.split(INLINE_CODE).map((part, index) =>
    index % 2 === 1 ? (
      <code
        key={index}
        className="rounded-md border border-line bg-surface-raised px-1.5 py-0.5 font-mono text-[0.85em] text-fg"
      >
        {part}
      </code>
    ) : (
      part
    ),
  )
}
