import {
  Atom,
  AudioWaveform,
  Bone,
  Captions,
  CircleDot,
  Clapperboard,
  CodeXml,
  Film,
  Flag,
  Footprints,
  Hand,
  Images,
  Import,
  Layers,
  Library,
  MonitorPlay,
  Move,
  Palette,
  PanelsTopLeft,
  PersonStanding,
  Route,
  ShieldCheck,
  Smile,
  Sparkles,
  Spline,
  SunMoon,
  Swords,
  Upload,
  Users,
  WandSparkles,
} from 'lucide-react'
import { CLIPS } from './featureClips'

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
    details: [
      'Rig Setup with New rig, Joints and IK tabs. Edit in the viewport or in ortho views with a gizmo.',
      'R6, R6 IK, R15 and R15 IK dummies, or any player’s character by username, user id or profile link. Animate it opens the editor with that rig.',
      'Joints can be Motor6D or constraints. Pivot joints let loose parts and models move like joints.',
      'Convert to an R15 or R6 IK rig in one click: targets, poles and plants on every limb, plus a head target.',
      'Main control: a ring on the ground that moves the whole body and every IK target together.',
      'IK solvers: Two-bone, FABRIK and Aim, with pole angle, softness, joint limits and stiffness.',
      'Dynamic head on or off per rig.',
      'Works on bone rigs (FBX), rigs resized with the Scale tool, and rigs with no Animator (Apex adds one).',
      'Check Rig shows a red bar for anchored parts with an Unanchor button, and another for a big mesh holding the rig with a Fix button.',
    ],
  },
  {
    title: 'IK / FK + Planting',
    tag: 'native',
    icon: Footprints,
    description:
      'Switch IK and FK per limb with pole targets, arm stretch and Auto-IK. Plant feet and hands. Everything bakes to plain joint keys on publish.',
    details: [
      'IK targets (dots), poles (diamonds) and limb rings. Alt-click picks a control behind the body.',
      'IK/FK switch at any frame, an IK blend row, and Snap IK chain to IK or FK.',
      'Chain settings keyed over time: IK turn, IK move and Stretch. One-piece R6 limbs also get Fold share, Lean, Slide in and Roll.',
      'Auto-IK on any rig, with 2 to 4 joints following.',
      'The plant is a lime square that acts as the ground under a hand or foot. Raise it, tilt it for a slope or a wall, and set its strength.',
      'Plant on the play range, with blend in and blend out.',
      'Turning an IK limb brings its target and pole along.',
    ],
    clips: [CLIPS.ik, CLIPS.planting],
  },
  {
    title: 'Posing Tools',
    tag: 'native',
    icon: PersonStanding,
    description:
      'Pins with strength, Spread across nearby frames, full-body push, lock below, limb rings, turn about a point, multi-select and drag-a-part posing.',
    details: [
      'Move and rotate gizmo with Local, Parent or World axes. Step snapping (Ctrl flips it) and a scale step.',
      'Free turn (T, trackball), turn flat to the screen (U), follow the mouse (Y), and nearer or farther (H).',
      'Turn about a point, like a foot rolling onto its toes.',
      'Pose several joints at once, turning about their middle or the first one picked.',
      'Box select in the viewport. Drag a part to slide it along the surface under the mouse.',
      'Pins with strength, or pinning only a joint’s turn. Lock below, Spread, Full-body push and Limb rings.',
      'Hide and lock joints. Keying sets: Loc + Rot, Location, Rotation, All or Available.',
      'The first key past frame 0 lays a rest key at 0 for you.',
    ],
    clips: [CLIPS.pins, CLIPS.spread, CLIPS.fullBodyPush],
  },
  {
    title: 'Dynamic Rig',
    tag: 'hybrid',
    icon: Swords,
    description:
      'Change a joint’s parent mid-animation. Pass a sword from one hand to the other without hacks or duplicate parts.',
    details: [
      'Space row: World, rig root, parent, another joint, a prop, or Hold still in the world.',
      'Persist or Revert, and a Blend in frames.',
      'Ride a prop, like a car.',
      'Follow a joint on another rig in a scene.',
    ],
    clips: [CLIPS.dynamicRigSpaces],
  },
  {
    title: 'Curves & Modifiers',
    tag: 'native',
    icon: Spline,
    description:
      'A graph editor with Bezier handles, Blender-style and custom easings, plus noise, cycles and stepping modifiers. Baked on publish.',
    details: [
      'Curve editor per channel, plus Combined mode.',
      'Handle types: Auto, Vector, Aligned and Free.',
      'Constant, Linear and Bezier, plus styles (Sine, Bounce, Elastic and the rest) with easing direction, all from the key’s right-click.',
      'Custom easings you draw and save. Bake easing.',
      'Modifiers: Noise, Cycles, Stepped, Limits, Envelope and Generator. Each has influence, a time window and a bake rate, and can go on a whole Position or Rotation.',
      'Curves for props: numbers, sizes and colors.',
    ],
  },
  {
    title: 'Grips',
    tag: 'native',
    icon: Hand,
    description:
      'Hold one joint onto another for part of a shot, with sliding grips, strength control, Carry and grip baking.',
    details: [
      'Grip onto another joint, onto the World, or onto another rig.',
      'The hand slides along what it grips. Pink ring, Strength, Holds, and a toggle for whether the arm reaches.',
      'Let go here and Delete from here on. A Grips row changes them over time.',
      'Works on rigs with no IK, and hand to hand.',
      'Carry (Shift-drag), with Alt for Free mode and settings for Depth, Blend and Mode. Carry and push work together.',
    ],
    clips: [CLIPS.grip, CLIPS.carry],
  },
  {
    title: 'Face Animation',
    tag: 'hybrid',
    icon: Smile,
    description:
      'Face controls for dynamic heads, expression and mouth-shape presets, lip sync, classic decal faces and head swapping.',
    details: [
      'Face controls on dynamic heads (rings, bars, dots), with a row per part.',
      'Face expressions window with Expressions, Sliders and Saved faces, Strength % and New face.',
      'Quick face poses from Ctrl+right-click, with reset per piece or the whole face.',
      'Lip sync from a typed line, a sound in the animation or a WAV file.',
      'Decal faces: a picture library (from an id, a file or Explorer), crossfades, separate layers for eyes, brows and mouth, and lip sync with mouth pictures.',
      'Fit to face per head. Head swaps mid-animation on a Head row.',
    ],
  },
  {
    title: 'Layers',
    tag: 'native',
    icon: Layers,
    description: 'Non-destructive animation layers with weights and joint masks, merged on publish.',
    details: ['Additive and override layers, with weight, Mute, Solo and joint masks. Merged on publish.'],
  },
  {
    title: 'Animator Tools',
    tag: 'native',
    icon: WandSparkles,
    description:
      'Breakdowns, anticipation and overshoot, overlap, mirror, stretch, repeat, reverse, curve cleanup and disabled keys.',
    details: [
      'Breakdowns: in-between at 25%, 50% or 75%, Push pose and Relax pose.',
      'Pose slider: In-between, Push/Relax, Toward rest, Toward frame, Scale keys and Slide keys.',
      'Anticipation and overshoot. Overlap with delay and falloff.',
      'Mirror, Copy left side to right, Stretch, Repeat (Loop, Ping-pong, Offset), Reverse, and Fill (at key columns or every frame).',
      'Curve cleanup: Smooth, Euler filter, Bake keys, Decimate and Clean curves.',
      'Disable keys (selected, or left or right of the playhead).',
      'Copy and paste, and paste one joint’s keys onto another.',
    ],
    clips: [CLIPS.overshoot],
  },
  {
    title: 'See Your Motion',
    tag: 'native',
    icon: Route,
    description:
      'Onion skins, motion and point paths, Wormhole, a pen-style path tool, a motion brush, ortho views and a floor grid.',
    details: [
      'Onion skins drawn as Copies (tinted rig copies that include props) or Shapes, with optional ghosts while playing.',
      'Wormhole spreads ghosts and paths across the screen by time.',
      'Motion paths with draggable key dots and bend handles. Point paths follow a spot like a sword tip.',
      'Curve plotter (pen tool) with a gizmo on its handles. Motion brush with Smooth and Grab.',
      'Ortho views in any mix of 7 views. You can pose in them, and they draw the scene camera.',
      'Floor grid, Bones, and X-ray (Auto, On or Off) with Taper or Sticks bones.',
    ],
    clips: [CLIPS.onionSkinWormhole, CLIPS.motionPath, CLIPS.curvePlotter],
  },
  {
    title: 'Preview Anywhere',
    tag: 'native',
    icon: MonitorPlay,
    description:
      'Play on other R15 body types or any player’s avatar, and see a ghost of exactly what Roblox will play.',
    details: [
      'Preview body: Tall, Short, Wide, Child or any Roblox user.',
      'Native preview vs Enhanced preview, and a Hear sounds toggle.',
      'Animation list: click an animation to loop it without opening it.',
      'Play in Studio tests before publishing, using temporary ids.',
      'How-it-plays badge: Native, Native + Enhanced, or Enhanced only.',
    ],
  },
  {
    title: 'Rig Movement',
    tag: 'hybrid',
    icon: Move,
    description:
      'Give an animation a movement path. Without the engine, movement is baked in and the character stays in place.',
    details: [
      'Movement row with walks (speed, direction, turn) and movement targets.',
      'Transitions between movement keys.',
      'Waypoint paths with shape, facing and even speed, shaped with plotter handles. Ctrl+right-click the ground to add a waypoint.',
      'Paths on joints and props. Make path from keys. Move a path between the Movement row and a joint.',
      'Movement per joint, baked into the root or played by the engine.',
    ],
    clips: [CLIPS.movement],
  },
  {
    title: 'Scenes & Camera',
    tag: 'hybrid',
    icon: Clapperboard,
    description: 'Multi-character scenes, shared joints between characters and keyed camera shots with field of view.',
    details: [
      'Slots, with rigs moved in rather than copied. Create Scene with…, one-rig scenes, Scene Settings, Anchor and Export Scene.',
      'Rigs can grip, follow and carry each other.',
      'Scene camera with a gizmo, a FOV knob, and moving several camera keys at once.',
      'Camera View window with turn, orbit, slide, dolly and roll, aspect ratios and guides, and From view.',
      'Look through the camera, Play + Camera, Follow a character, Spring follow and Camera path.',
      'Curve plotter and key tools work on camera keys. The Camera row shows before a scene exists.',
    ],
  },
  {
    title: 'Markers & Gameplay States',
    tag: 'hybrid',
    icon: Flag,
    description: 'Markers plus gameplay states like hitbox windows and phases, exposed as data your code can read.',
    details: [
      'Markers with a Name and Parameter, on several rows.',
      'Span, stepped and curve states, with payload fields. Spans can also export as native markers.',
    ],
  },
  {
    title: 'Team Create',
    tag: 'native',
    icon: Users,
    description: 'Animate together in the same place, with live joint locking so nobody overwrites anyone.',
    details: [
      'See each other’s edits and drags live. A joint someone is dragging is locked with their name on it.',
      'Conflicts on the same value are handled, and undo only takes back your own changes.',
      'When a teammate makes a scene with your rig, it opens for you too.',
    ],
  },
  {
    title: 'Screen Effects & Subtitles',
    tag: 'engine',
    icon: Captions,
    description: 'Letterbox bars, fades, vignettes and subtitles in four styles and 20 fonts.',
    details: [
      'Bars, fades, dark edges and subtitles, each kind on its own row, with fade lines.',
      'Subtitles come in 4 styles and 20 fonts, typed out by letter or by word, and you drag them in the Camera View.',
    ],
  },
  {
    title: 'Scene Look',
    tag: 'engine',
    icon: SunMoon,
    description: 'Key time of day, fog, color grading, bloom, depth of field and focus pulls. Presets included.',
    details: [
      'Time of day on a sun arc, fog, color grade, bloom, and depth of field with click-to-focus pulls.',
      'Built-in presets plus your own saved ones.',
    ],
  },
  {
    title: 'Sounds',
    tag: 'engine',
    icon: AudioWaveform,
    description: 'Sound rows with clips, cutting, fades and a waveform window.',
    details: [
      'Sound rows where you cut, split, join, fade and set volume.',
      'Sound window with a waveform.',
      'Sound props with Play and Stop cues, plus Volume and PlaybackSpeed keys.',
    ],
  },
  {
    title: 'Props & Releases',
    tag: 'engine',
    icon: Sparkles,
    description:
      'Animate part properties, lights, beams, trails and sounds. Releases send parts flying with real physics.',
    details: [
      'Props from the rig or the Workspace: parts, models (Scale included), lights, beams, trails, attachments, highlights, fire, smoke, sparkles, meshes, GUIs, clothing and body colors.',
      'Resize knobs that key Size. A color picker and sequence graphs in Values. Persist last value.',
      'Releases with Copies, Collides, Lasts, Push and Spin. Aim with a ball or Throw here, then Attach back. An Event fires when it lets go.',
    ],
    clips: [CLIPS.propRelease],
  },
  {
    title: 'Physics',
    tag: 'native',
    icon: Atom,
    description:
      'Ragdoll the rig or drop a selection, then add hits, pushes, throws, explosions and wind. Time warp, rewind, and bake it all to keys.',
    details: [
      'Ragdoll the rig, or drop a selection.',
      'Hits, pushes, throws, explosions and wind. Models set to Breaks apart.',
      'Time warp, Rewind, Plays backwards, and Redo from here.',
      'The result is baked to keys.',
    ],
    clips: [CLIPS.ragdoll],
  },
  {
    title: 'Record in Play',
    tag: 'hybrid',
    icon: CircleDot,
    description:
      'Press F6 during Play to record models, parts or folders. Each recording comes in as a new scene or take, sounds included.',
    details: [
      'F6 records models, parts or folders during Play, several times in one Play.',
      'Each recording comes in as a new scene or a take. Things that appeared or were destroyed get Shown rows, and sounds come in too.',
    ],
  },
  {
    title: 'Takes',
    tag: 'native',
    icon: Film,
    description:
      'Takes are cards above the timeline. Reorder them, choose the rigs in each, play them all and export as one animation or one per take.',
    details: [
      'Takes are cards above the timeline that you reorder, copy and paste.',
      '+ New take continues where the last take ends. Play all takes.',
      'Choose which rigs are in each take. Export all takes as one animation or each on its own.',
    ],
  },
  {
    title: 'Poses Library',
    tag: 'native',
    icon: Library,
    description: 'Save keys as a pose and drag it onto the timeline or the rig. Point at a pose to see it play.',
    details: [],
  },
  {
    title: 'Reference Window',
    tag: 'native',
    icon: Images,
    description:
      'Up to 4 photos, GIFs or videos behind the rig. Pin joints so the reference camera lines up, and carry pins to new frames.',
    details: [
      'Up to 4 photos, GIFs or videos (or video frames) behind the rig.',
      'Pin joints so the reference camera fits them. Paint a part’s sides so it turns to match.',
      'Bring frame copies pins and painted sides to a new frame.',
    ],
  },
  {
    title: 'Import',
    tag: 'native',
    icon: Import,
    description:
      'KeyframeSequences, CurveAnimations, Animation Editor saves, your Roblox inventory or another rig’s animation, thinned to the keys it needs.',
    details: [
      'KeyframeSequence, CurveAnimation, the Animation Editor’s saves (one or all at once), your Roblox inventory, or another rig’s animation.',
      'Open it on its own or paste it in, with Thin to keep only the keys it needs.',
    ],
  },
  {
    title: 'Saving & Safety',
    tag: 'native',
    icon: ShieldCheck,
    description:
      'Saves live on the rig with no size limit. A recovery copy every 10 seconds is offered back after a crash.',
    details: [
      'Saves live on the rig with no size limit. A conflict strip offers Choose… when someone else saved.',
      'A recovery copy every 10 seconds, offered back after a crash.',
      'What’s New window and an (Outdated) check.',
    ],
  },
  {
    title: 'Export & Publish',
    tag: 'hybrid',
    icon: Upload,
    description:
      'Publish writes the companion script and offers to install or update ApexEngine. Set length, looping and priority, then Check Place.',
    details: [
      'Export a Copy into a folder per rig.',
      'Publish writes the companion script and offers to install or update ApexEngine.',
      'Link id, PLAY IT code, Bake Settings and Check Place.',
      'Play settings: length, looping, priority, and what happens when stopped part-way.',
      'Clips end at your last key.',
    ],
  },
  {
    title: 'Editor & Workflow',
    tag: 'native',
    icon: PanelsTopLeft,
    description:
      'Floating or docked windows, searchable Help and Settings, a key for every feature, custom frame rates and a Values window.',
    details: [
      'Floating or docked windows, and File, Pose, View and Window menus with submenus and icons.',
      'Help window with search, Settings window with search, mouse hints, and tips that show keys.',
      'Every feature can take a key, and rebinding asks when the key is taken.',
      'Values window with a field per channel. Double-click a key for a quick edit.',
      'Frame rates 24, 30, 60 or custom. Play range. Edits past the end make the animation longer.',
      'Collapse joints. Clicking a joint in the viewport scrolls the dope sheet to its row.',
      'Hide everything (Ctrl+H). Community link.',
    ],
  },
  {
    title: 'Themes',
    tag: 'native',
    icon: Palette,
    description:
      '3 free themes and 10 more with Apex Themes, some with their own font and moving background. Build your own and share codes.',
    details: [
      '3 free themes and 10 with Apex Themes. Some bring their own font, key shape and moving background.',
      'Point at a theme to try it.',
      'Theme editor with pictures or GIFs, editor part colors and shapes, and share codes.',
    ],
  },
  {
    title: 'ApexEngine for Programmers',
    tag: 'engine',
    icon: CodeXml,
    description:
      'Plain Animator plays of registered clips get the enhanced parts. LoadAnimation, GetTrack, GetRigState and LoadScene. Open source.',
    details: [
      'Any plain Animator play of a registered clip gets the enhanced parts.',
      'LoadAnimation, GetTrack, GetRigState and LoadScene, with signals and state events.',
      'Works on rigs of another size, and the companion script explains itself.',
      'Open source.',
    ],
  },
]
