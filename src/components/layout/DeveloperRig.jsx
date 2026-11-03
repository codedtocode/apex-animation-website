import characterHead from '@/assets/codedtocode-head.png'
import { R6Rig } from './R6Rig'

const SHIRT_TONE = { hue: 222, saturation: 18, light: 72, range: 20 }
const JEANS_TONE = { hue: 214, saturation: 46, light: 30, range: 16 }
const LUA_BLUE = '#000080'
const SLEEVE_STRIPE = `linear-gradient(to bottom, transparent 51%, ${LUA_BLUE} 51%, ${LUA_BLUE} 54%, transparent 54%)`

const HEAD_IMAGE = { src: characterHead, width: 2.025, height: 2.875, bottom: 1.45, depth: 0.75 }

function LuaLogo() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute top-[13%] left-[18%] w-[65%]">
      <circle cx="44" cy="56" r="34" fill={LUA_BLUE} />
      <circle cx="61" cy="39" r="9.5" fill="white" />
      <circle cx="82" cy="18" r="9.5" fill={LUA_BLUE} />
      <text x="44" y="65" textAnchor="middle" fontSize="25" fontFamily="Arial, sans-serif" fill="white">
        Lua
      </text>
    </svg>
  )
}

const CHARACTER_SKIN = {
  torso: { tone: SHIRT_TONE, front: <LuaLogo /> },
  arm: { tone: SHIRT_TONE, sides: SLEEVE_STRIPE },
  leg: { tone: JEANS_TONE },
}

export function DeveloperRig(props) {
  return <R6Rig skin={CHARACTER_SKIN} headImage={HEAD_IMAGE} {...props} />
}
