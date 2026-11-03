const LUA_TOKEN =
  /(?<comment>--.*)|(?<string>"(?:[^"\\]|\\.)*")|(?<keyword>\b(?:and|do|else|elseif|end|false|for|function|if|in|local|nil|not|or|return|then|true|while)\b)|(?<builtin>\b(?:game|print|require|workspace)\b)|(?<type>\b(?:any|boolean|number|string|AnimationTrack|Animator|Folder|Model|ModuleScript|Player)\b)|(?<number>\b\d+(?:\.\d+)?\b)|(?<method>(?<=[:.])[A-Za-z_]\w*(?=\())/g

export function highlightLua(line) {
  const tokens = []
  let cursor = 0

  for (const match of line.matchAll(LUA_TOKEN)) {
    if (match.index > cursor) tokens.push({ text: line.slice(cursor, match.index) })
    const type = Object.keys(match.groups).find((name) => match.groups[name] !== undefined)
    tokens.push({ text: match[0], type })
    cursor = match.index + match[0].length
  }
  if (cursor < line.length) tokens.push({ text: line.slice(cursor) })

  return tokens
}
