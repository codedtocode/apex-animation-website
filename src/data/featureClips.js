import cameraPathPoster from '@/assets/features/camera-path.jpg'
import cameraPath from '@/assets/features/camera-path.mp4'
import carryPoster from '@/assets/features/carry.jpg'
import carry from '@/assets/features/carry.mp4'
import curvePlotterPoster from '@/assets/features/curve-plotter.jpg'
import curvePlotter from '@/assets/features/curve-plotter.mp4'
import dynamicRigSpacesPoster from '@/assets/features/dynamic-rig-spaces.jpg'
import dynamicRigSpaces from '@/assets/features/dynamic-rig-spaces.mp4'
import faceAnimationPoster from '@/assets/features/face-animation.jpg'
import faceAnimation from '@/assets/features/face-animation.mp4'
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
import physicsForcesPoster from '@/assets/features/physics.jpg'
import physicsForces from '@/assets/features/physics.mp4'
import pinsPoster from '@/assets/features/pins.jpg'
import pins from '@/assets/features/pins.mp4'
import plantingPoster from '@/assets/features/planting.jpg'
import planting from '@/assets/features/planting.mp4'
import propReleasePoster from '@/assets/features/prop-release.jpg'
import propRelease from '@/assets/features/prop-release.mp4'
import ragdollPoster from '@/assets/features/ragdoll.jpg'
import ragdoll from '@/assets/features/ragdoll.mp4'
import recordInPlayPoster from '@/assets/features/record-in-play.jpg'
import recordInPlay from '@/assets/features/record-in-play.mp4'
import sceneLookPoster from '@/assets/features/scene-look.jpg'
import sceneLook from '@/assets/features/scene-look.mp4'
import scenesCameraPoster from '@/assets/features/scenes-camera.jpg'
import scenesCamera from '@/assets/features/scenes-camera.mp4'
import scenesRigPoster from '@/assets/features/scenes-rig.jpg'
import scenesRig from '@/assets/features/scenes-rig.mp4'
import screenEffectsPoster from '@/assets/features/screen-effects.jpg'
import screenEffects from '@/assets/features/screen-effects.mp4'
import soundPoster from '@/assets/features/sound.jpg'
import sound from '@/assets/features/sound.mp4'
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
  faceAnimation: {
    type: 'video',
    src: faceAnimation,
    poster: faceAnimationPoster,
    width: 650,
    height: 558,
    title: 'Face controls',
    description: 'Drag the rings, bars and dots on a dynamic head to aim the eyes, shape the brows and open the jaw.',
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
  scenesRig: {
    type: 'video',
    src: scenesRig,
    poster: scenesRigPoster,
    width: 1552,
    height: 664,
    title: 'Scenes',
    description: 'Make a scene, add a second rig to it and pose the two together.',
  },
  scenesCamera: {
    type: 'video',
    src: scenesCamera,
    poster: scenesCameraPoster,
    width: 1552,
    height: 664,
    title: 'Scene camera',
    description: 'Key the camera, frame the shot in the Camera View window and play it back through the lens.',
  },
  cameraPath: {
    type: 'video',
    src: cameraPath,
    poster: cameraPathPoster,
    width: 1600,
    height: 560,
    title: 'Camera path',
    description: 'Click in the viewport to lay out a path for the camera, then drag its points and pick an ease.',
  },
  screenEffects: {
    type: 'video',
    src: screenEffects,
    poster: screenEffectsPoster,
    width: 1600,
    height: 558,
    title: 'Subtitles',
    description: 'Add a subtitle on its own row, then pick its speaker, style and how it types in.',
  },
  sceneLook: {
    type: 'video',
    src: sceneLook,
    poster: sceneLookPoster,
    width: 1498,
    height: 662,
    title: 'Scene look',
    description: 'Key the time of day on the sun arc and click presets like Golden hour.',
  },
  sound: {
    type: 'video',
    src: sound,
    poster: soundPoster,
    width: 1218,
    height: 570,
    title: 'Sound window',
    description: 'Open a sound’s waveform, cut it into parts and drag fades onto their edges.',
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
  physicsForces: {
    type: 'video',
    src: physicsForces,
    poster: physicsForcesPoster,
    width: 1498,
    height: 662,
    title: 'Hits and explosions',
    description: 'Click a part to hit it, add an explosion with its strength and reach, then simulate.',
  },
  recordInPlay: {
    type: 'video',
    src: recordInPlay,
    poster: recordInPlayPoster,
    width: 1498,
    height: 662,
    title: 'Record in Play',
    description: 'Pick a car, press F6 during Play to record the drive, and it comes back as a scene with its sounds.',
  },
}
