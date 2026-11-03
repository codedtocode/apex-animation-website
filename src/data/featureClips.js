import carryPoster from '@/assets/features/carry.jpg'
import carry from '@/assets/features/carry.mp4'
import curvePlotterPoster from '@/assets/features/curve-plotter.jpg'
import curvePlotter from '@/assets/features/curve-plotter.mp4'
import dynamicRigSpacesPoster from '@/assets/features/dynamic-rig-spaces.jpg'
import dynamicRigSpaces from '@/assets/features/dynamic-rig-spaces.mp4'
import fullBodyPushPoster from '@/assets/features/full-body-push.jpg'
import fullBodyPush from '@/assets/features/full-body-push.mp4'
import gripPoster from '@/assets/features/grip.jpg'
import grip from '@/assets/features/grip.mp4'
import ikPoster from '@/assets/features/ik.jpg'
import ik from '@/assets/features/ik.mp4'
import motionPathPoster from '@/assets/features/motion-path.jpg'
import motionPath from '@/assets/features/motion-path.mp4'
import movementPoster from '@/assets/features/movement.jpg'
import movement from '@/assets/features/movement.mp4'
import onionSkinWormholePoster from '@/assets/features/onion-skin-wormhole.jpg'
import onionSkinWormhole from '@/assets/features/onion-skin-wormhole.mp4'
import overshootPoster from '@/assets/features/overshoot.jpg'
import overshoot from '@/assets/features/overshoot.mp4'
import pinsPoster from '@/assets/features/pins.jpg'
import pins from '@/assets/features/pins.mp4'
import plantingPoster from '@/assets/features/planting.jpg'
import planting from '@/assets/features/planting.mp4'
import propReleasePoster from '@/assets/features/prop-release.jpg'
import propRelease from '@/assets/features/prop-release.mp4'
import ragdollPoster from '@/assets/features/ragdoll.jpg'
import ragdoll from '@/assets/features/ragdoll.mp4'
import spreadPoster from '@/assets/features/spread.jpg'
import spread from '@/assets/features/spread.mp4'

const WIDE = { width: 1600, height: 550 }

export const CLIPS = {
  ik: {
    type: 'video',
    src: ik,
    poster: ikPoster,
    width: 446,
    height: 534,
    title: 'IK targets',
    description: 'Drag a limb by its IK target and pole, with live readouts as it moves.',
  },
  planting: {
    type: 'video',
    src: planting,
    poster: plantingPoster,
    width: 394,
    height: 514,
    title: 'Hand and foot planting',
    description: 'A lime plant square holds a hand or foot in place while the body moves.',
  },
  pins: {
    type: 'video',
    src: pins,
    poster: pinsPoster,
    width: 556,
    height: 658,
    title: 'Pins',
    description: 'Pin a joint with a strength, then pose the rest of the body around it.',
  },
  spread: {
    type: 'video',
    src: spread,
    poster: spreadPoster,
    ...WIDE,
    title: 'Spread',
    description: 'Change one pose and carry the change across nearby frames.',
  },
  fullBodyPush: {
    type: 'video',
    src: fullBodyPush,
    poster: fullBodyPushPoster,
    ...WIDE,
    title: 'Full-body push',
    description: 'Push the whole body and let every joint follow along.',
  },
  overshoot: {
    type: 'video',
    src: overshoot,
    poster: overshootPoster,
    ...WIDE,
    title: 'Anticipation and overshoot',
    description: 'Pick it from a key’s right-click menu to add a wind-up and an overshoot.',
  },
  dynamicRigSpaces: {
    type: 'video',
    src: dynamicRigSpaces,
    poster: dynamicRigSpacesPoster,
    ...WIDE,
    title: 'Spaces',
    description: 'Change what a joint follows partway through the animation, right from the Space row.',
  },
  grip: {
    type: 'video',
    src: grip,
    poster: gripPoster,
    ...WIDE,
    title: 'Grips',
    description: 'Grip a hand onto another joint and it follows along, sliding where it holds.',
  },
  carry: {
    type: 'video',
    src: carry,
    poster: carryPoster,
    ...WIDE,
    title: 'Carry',
    description: 'Shift-drag to carry what you hold, and the arms come along.',
  },
  onionSkinWormhole: {
    type: 'video',
    src: onionSkinWormhole,
    poster: onionSkinWormholePoster,
    ...WIDE,
    title: 'Onion skins and Wormhole',
    description: 'Tinted ghosts show the poses around the frame, and Wormhole spreads them out by time.',
  },
  motionPath: {
    type: 'video',
    src: motionPath,
    poster: motionPathPoster,
    ...WIDE,
    title: 'Motion paths',
    description: 'Drag key dots and bend handles right on the path.',
  },
  curvePlotter: {
    type: 'video',
    src: curvePlotter,
    poster: curvePlotterPoster,
    ...WIDE,
    title: 'Curve plotter',
    description: 'Draw a path with the pen tool and shape it with its handles.',
  },
  movement: {
    type: 'video',
    src: movement,
    poster: movementPoster,
    ...WIDE,
    title: 'Movement paths',
    description: 'Give the animation a movement path and the character travels along it.',
  },
  propRelease: {
    type: 'video',
    src: propRelease,
    poster: propReleasePoster,
    ...WIDE,
    title: 'Releases',
    description: 'Let go of a prop and it flies off with real physics.',
  },
  ragdoll: {
    type: 'video',
    src: ragdoll,
    poster: ragdollPoster,
    ...WIDE,
    title: 'Ragdoll',
    description: 'Ragdoll the rig, then bake the fall to keys.',
  },
}
