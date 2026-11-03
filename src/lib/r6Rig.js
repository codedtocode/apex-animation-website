export const studs = (value) => `calc(var(--stud) * ${value})`

export const LIMBS = [
  { id: 'rightArm', kind: 'arm', x: 0, y: 1, side: 1 },
  { id: 'leftArm', kind: 'arm', x: 3, y: 1, side: -1 },
  { id: 'rightLeg', kind: 'leg', x: 1, y: 3, side: -1 },
  { id: 'leftLeg', kind: 'leg', x: 2, y: 3, side: 1 },
]
