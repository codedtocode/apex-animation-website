import {
  AudioWaveform,
  Bone,
  Captions,
  Clapperboard,
  Flag,
  Footprints,
  Hand,
  Layers,
  MonitorPlay,
  Move,
  PersonStanding,
  Route,
  Smile,
  Sparkles,
  Spline,
  SunMoon,
  Swords,
  Users,
  WandSparkles,
} from 'lucide-react'

export const FEATURE_TAGS = {
  native: 'Native',
  hybrid: 'Native + Engine',
  engine: 'Engine',
}

export const FEATURES = [
  {
    title: 'Rig Anything',
    tag: 'native',
    icon: Bone,
    description:
      'Add joints, bones and constraints right in the viewport, mirror them and build IK chains. Ready-made R6 and R15 dummies included.',
  },
  {
    title: 'IK / FK + Planting',
    tag: 'native',
    icon: Footprints,
    description:
      'Switch IK and FK per limb with pole targets, arm stretch and Auto-IK. Plant feet and hands. Everything bakes to plain joint keys on publish.',
  },
  {
    title: 'Posing Tools',
    tag: 'native',
    icon: PersonStanding,
    description:
      'Pins with strength, Spread across nearby frames, full-body push, lock below, limb rings, turn about a point, multi-select and drag-a-part posing.',
  },
  {
    title: 'Dynamic Rig',
    tag: 'hybrid',
    icon: Swords,
    description:
      'Change a joint’s parent mid-animation. Pass a sword from one hand to the other without hacks or duplicate parts.',
  },
  {
    title: 'Curves & Modifiers',
    tag: 'native',
    icon: Spline,
    description:
      'A graph editor with Bezier handles, Blender-style and custom easings, plus noise, cycles and stepping modifiers. Baked on publish.',
  },
  {
    title: 'Grips',
    tag: 'native',
    icon: Hand,
    description:
      'Hold one joint onto another for part of a shot, with sliding grips, strength control, Carry and grip baking.',
  },
  {
    title: 'Face Animation',
    tag: 'hybrid',
    icon: Smile,
    description:
      'Face controls for dynamic heads, expression and mouth-shape presets, lip sync, classic decal faces and head swapping.',
  },
  {
    title: 'Layers',
    tag: 'native',
    icon: Layers,
    description: 'Non-destructive animation layers with weights and joint masks, merged on publish.',
  },
  {
    title: 'Animator Tools',
    tag: 'native',
    icon: WandSparkles,
    description:
      'Breakdowns, anticipation and overshoot, overlap, mirror, stretch, repeat, reverse, curve cleanup and disabled keys.',
  },
  {
    title: 'See Your Motion',
    tag: 'native',
    icon: Route,
    description:
      'Onion skins, motion and point paths, Wormhole, a pen-style path tool, a motion brush, ortho views and a floor grid.',
  },
  {
    title: 'Preview Anywhere',
    tag: 'native',
    icon: MonitorPlay,
    description:
      'Play on other R15 body types or any player’s avatar, and see a ghost of exactly what Roblox will play.',
  },
  {
    title: 'Rig Movement',
    tag: 'hybrid',
    icon: Move,
    description:
      'Give an animation a movement path. Without the engine, movement is baked in and the character stays in place.',
  },
  {
    title: 'Scenes & Camera',
    tag: 'hybrid',
    icon: Clapperboard,
    description: 'Multi-character scenes, shared joints between characters and keyed camera shots with field of view.',
  },
  {
    title: 'Markers & Gameplay States',
    tag: 'hybrid',
    icon: Flag,
    description: 'Markers plus gameplay states like hitbox windows and phases, exposed as data your code can read.',
  },
  {
    title: 'Team Create',
    tag: 'native',
    icon: Users,
    description: 'Animate together in the same place, with live joint locking so nobody overwrites anyone.',
  },
  {
    title: 'Screen Effects & Subtitles',
    tag: 'engine',
    icon: Captions,
    description: 'Letterbox bars, fades, vignettes and subtitles in four styles and 20 fonts.',
  },
  {
    title: 'Scene Look',
    tag: 'engine',
    icon: SunMoon,
    description: 'Key time of day, fog, color grading, bloom, depth of field and focus pulls. Presets included.',
  },
  {
    title: 'Sounds',
    tag: 'engine',
    icon: AudioWaveform,
    description: 'Sound rows with clips, cutting, fades and a waveform window.',
  },
  {
    title: 'Props & Releases',
    tag: 'engine',
    icon: Sparkles,
    description:
      'Animate part properties, lights, beams, trails and sounds. Releases send parts flying with real physics.',
  },
]

export const COMPATIBILITY = [
  { label: 'R6 & R15', detail: 'Ready-made dummies included', supported: true },
  { label: 'Custom rigs', detail: 'Humanoid or AnimationController with an Animator', supported: true },
  {
    label: 'Motor6D, bones & constraints',
    detail: 'Skinned mesh bones and AnimationConstraints work too',
    supported: true,
  },
  { label: 'Moon Animator exports', detail: 'KeyframeSequences and published animations import', supported: true },
  { label: 'Team Create', detail: 'Live joint locking, Apex 1.6 and newer', supported: true },
  { label: 'Blender', detail: 'Not supported yet', supported: false },
]

export const NATIVE_BENEFITS = [
  'Plays in plain Roblox, with no runtime to install',
  'IK, curves, layers and grips bake to standard joint keys on publish',
  'Publish and play it like any other Roblox animation',
]

export const ENGINE_BENEFITS = [
  'Enhances every play automatically, no API knowledge needed',
  'Adds sounds, props, releases, screen effects and scene look, and keeps rig switches solid while animations blend',
  'Only write code to read gameplay states or play scenes',
]
