import editorOverview from '@/assets/apex-animator-editor.png'
import customRigIkPoster from '@/assets/demos/custom-rig-ik.jpg'
import customRigIk from '@/assets/demos/custom-rig-ik.mp4'
import divineSlashPoster from '@/assets/demos/divine-slash.jpg'
import divineSlash from '@/assets/demos/divine-slash.mp4'
import catAttackPoster from '@/assets/demos/face-rig-keys.jpg'
import catAttack from '@/assets/demos/face-rig-keys.mp4'
import footballScenePoster from '@/assets/demos/football-scene.jpg'
import footballScene from '@/assets/demos/football-scene.mp4'
import mayflowersPoster from '@/assets/demos/mayflowers.jpg'
import mayflowers from '@/assets/demos/mayflowers.mp4'
import shrineCloseUpPoster from '@/assets/demos/shrine-close-up.jpg'
import shrineCloseUp from '@/assets/demos/shrine-close-up.mp4'
import swordComboPoster from '@/assets/demos/sword-combo.jpg'
import swordCombo from '@/assets/demos/sword-combo.mp4'
import takedownPoster from '@/assets/demos/takedown.jpg'
import takedown from '@/assets/demos/takedown.mp4'

const HERO = {
  editorOverview: {
    type: 'image',
    src: editorOverview,
    width: 846,
    height: 445,
    title: 'One timeline for everything',
    description: 'Camera, markers, sounds, every joint and its controls, stacked in a single editor.',
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
}

const COMMUNITY = {
  takedown: {
    type: 'video',
    src: takedown,
    poster: takedownPoster,
    width: 1442,
    height: 772,
    title: 'Takedown',
    description: 'A two-rig grab where the attacker slams the victim to the floor.',
    credit: 'solstised',
  },
  footballScene: {
    type: 'video',
    src: footballScene,
    poster: footballScenePoster,
    width: 1600,
    height: 512,
    title: 'Football scene',
    description: 'Two characters and a ball in one scene, filmed through a keyed camera with tight close-ups.',
    credit: 'kyro_sear',
  },
  swordCombo: {
    type: 'video',
    src: swordCombo,
    poster: swordComboPoster,
    width: 1280,
    height: 564,
    title: 'Sword combo',
    description: 'An R6 combo with a glowing blade, from the first swing to the last.',
    credit: 'Tornadohunter4676',
  },
  divineSlash: {
    type: 'video',
    src: divineSlash,
    poster: divineSlashPoster,
    width: 572,
    height: 368,
    title: 'Divine Slash',
    description: 'Dusk dashes through with a sword slash, keyed at 120 fps.',
    credit: 'FunwithDeyn',
  },
  shrineCloseUp: {
    type: 'video',
    src: shrineCloseUp,
    poster: shrineCloseUpPoster,
    width: 1138,
    height: 576,
    title: 'Shrine close-up',
    description: 'The camera pushes in on an R6 dummy as it spreads its arms in front of a shrine.',
    credit: 'EEEPPPAA72',
  },
  catAttack: {
    type: 'video',
    src: catAttack,
    poster: catAttackPoster,
    width: 1396,
    height: 624,
    title: 'Cat attack',
    description: 'A cat’s calm grin snaps into an angry yell, keyed on its lids, mouth corners and jaw.',
    credit: 'codedtocode',
  },
  mayflowers: {
    type: 'video',
    src: mayflowers,
    poster: mayflowersPoster,
    width: 1088,
    height: 536,
    title: 'Mayflowers',
    description: 'The camera glides through a sunset field of giant flowers and finds its character standing on one.',
    credit: 'LaPlanetee',
  },
}

export const HERO_MEDIA = { editor: HERO.editorOverview, demo: HERO.customRigIk }

export const SHOWCASE_ROWS = [
  [COMMUNITY.takedown, COMMUNITY.divineSlash],
  [COMMUNITY.footballScene],
  [COMMUNITY.swordCombo, COMMUNITY.shrineCloseUp],
  [COMMUNITY.catAttack, COMMUNITY.mayflowers],
]
