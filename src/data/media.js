import customRigIkPoster from '@/assets/demos/custom-rig-ik.jpg'
import customRigIk from '@/assets/demos/custom-rig-ik.mp4'
import faceControlsPoster from '@/assets/demos/face-controls.jpg'
import faceControls from '@/assets/demos/face-controls.mp4'
import faceRigKeysPoster from '@/assets/demos/face-rig-keys.jpg'
import faceRigKeys from '@/assets/demos/face-rig-keys.mp4'
import gripsPoster from '@/assets/demos/grips.jpg'
import grips from '@/assets/demos/grips.mp4'
import handPlantingPoster from '@/assets/demos/hand-planting.jpg'
import handPlanting from '@/assets/demos/hand-planting.mp4'
import ikFkSwitchPoster from '@/assets/demos/ik-fk-switch.jpg'
import ikFkSwitch from '@/assets/demos/ik-fk-switch.mp4'
import ikPosingPoster from '@/assets/demos/ik-posing.jpg'
import ikPosing from '@/assets/demos/ik-posing.mp4'
import ikTargetsPoster from '@/assets/demos/ik-targets.jpg'
import ikTargets from '@/assets/demos/ik-targets.mp4'
import motionTrailsPoster from '@/assets/demos/motion-trails.jpg'
import motionTrails from '@/assets/demos/motion-trails.mp4'
import r15IkPoster from '@/assets/demos/r15-ik.jpg'
import r15Ik from '@/assets/demos/r15-ik.mp4'
import orthoViews from '@images/apex1.png'
import editorOverview from '@images/apexnimatorshowcase.png'

const MEDIA = {
  editorOverview: {
    type: 'image',
    src: editorOverview,
    width: 1069,
    height: 458,
    title: 'One timeline for everything',
    description: 'Takes, camera, screen, markers, sounds and every joint, stacked in a single editor.',
  },
  customRigIk: {
    type: 'video',
    src: customRigIk,
    poster: customRigIkPoster,
    width: 1120,
    height: 506,
    title: 'Rig Anything',
    description: 'IK chains on fully custom characters. Arms, legs, twin tails, even a companion.',
  },
  faceRigKeys: {
    type: 'video',
    src: faceRigKeys,
    poster: faceRigKeysPoster,
    width: 1396,
    height: 624,
    title: 'Faces on any rig',
    description: 'Key lids, brows, mouth corners and jaw on a custom face rig, right in the dope sheet.',
  },
  faceControls: {
    type: 'video',
    src: faceControls,
    poster: faceControlsPoster,
    width: 650,
    height: 558,
    title: 'Face controls',
    description: 'Aim the eyes, shape each brow and drive the jaw straight on a dynamic head.',
  },
  ikFkSwitch: {
    type: 'video',
    src: ikFkSwitch,
    poster: ikFkSwitchPoster,
    width: 978,
    height: 652,
    title: 'IK / FK switching',
    description: 'Flip a limb between its IK target and its own pose, at any frame.',
  },
  handPlanting: {
    type: 'video',
    src: handPlanting,
    poster: handPlantingPoster,
    width: 752,
    height: 616,
    title: 'Hand planting',
    description: 'Place and turn a plant surface. The hand stays locked to it.',
  },
  ikTargets: {
    type: 'video',
    src: ikTargets,
    poster: ikTargetsPoster,
    width: 546,
    height: 454,
    title: 'Precise IK targets',
    description: 'Slide a target along one axis with live distance readouts.',
  },
  grips: {
    type: 'video',
    src: grips,
    poster: gripsPoster,
    width: 1566,
    height: 652,
    title: 'Grips',
    description: 'Grip one hand onto a sword and it follows along, while the other arm carries it.',
  },
  r15Ik: {
    type: 'video',
    src: r15Ik,
    poster: r15IkPoster,
    width: 1058,
    height: 608,
    title: 'IK on R15 rigs',
    description: 'Pose arms and legs by their IK targets, then plant hands and feet in place.',
  },
  motionTrails: {
    type: 'video',
    src: motionTrails,
    poster: motionTrailsPoster,
    width: 880,
    height: 480,
    title: 'See your motion',
    description: 'Watch a sword slash leave its trail, with ortho views docked alongside.',
  },
  ikPosing: {
    type: 'video',
    src: ikPosing,
    poster: ikPosingPoster,
    width: 1280,
    height: 414,
    title: 'Fast posing',
    description: 'Drag IK targets across the screen to block out big, readable poses in seconds.',
  },
  orthoViews: {
    type: 'image',
    src: orthoViews,
    width: 1322,
    height: 562,
    title: 'Ortho views',
    description: 'Top, front, right and perspective views docked next to your timeline.',
  },
}

export const HERO_MEDIA = { editor: MEDIA.editorOverview, demo: MEDIA.customRigIk }

export const SHOWCASE_ROWS = [
  [MEDIA.faceRigKeys, MEDIA.faceControls],
  [MEDIA.ikFkSwitch, MEDIA.handPlanting, MEDIA.ikTargets],
  [MEDIA.grips, MEDIA.r15Ik],
  [MEDIA.ikPosing],
  [MEDIA.motionTrails, MEDIA.orthoViews],
]
