export const API_REQUIRE = 'local ApexEngine = require(game:GetService("ReplicatedStorage"):WaitForChild("ApexEngine"))'

export const API_CALLS = [
  {
    call: 'ApexEngine.Start({ registry = folder })',
    description: 'Starts the engine. The starter scripts from Install Engine already call it.',
    example: `-- The starter scripts from Install Engine already do this for you
local registry: Folder = ReplicatedStorage.ApexAnimations

ApexEngine.Start({ registry = registry })`,
  },
  {
    call: 'ApexEngine.LoadAnimation(character, module)',
    description: 'Like `Animator:LoadAnimation`, from the animation’s module. Returns an ApexTrack.',
    example: `local character: Model = player.Character or player.CharacterAdded:Wait()
local module: ModuleScript = ReplicatedStorage.ApexAnimations.Slash

local slash = ApexEngine.LoadAnimation(character, module) -- ApexTrack
slash:Play()`,
  },
  {
    call: 'ApexEngine.GetTrack(animationTrack)',
    description: 'The ApexTrack for a play someone else started, like the Animate script’s',
    example: `local animator = character:WaitForChild("Humanoid"):WaitForChild("Animator") :: Animator

animator.AnimationPlayed:Connect(function(animationTrack: AnimationTrack)
\tlocal track = ApexEngine.GetTrack(animationTrack) -- ApexTrack?
\tif track then
\t\tprint("ApexTrack for", animationTrack.Name)
\tend
end)`,
  },
  {
    call: 'track:GetState(name)',
    description: 'A gameplay state’s value right now',
    example: `local canCancel = slash:GetState("CanCancel") :: boolean

if canCancel then
\tprint("the attack can be cancelled right now")
end`,
  },
  {
    call: 'track:GetSpanSignal(name)',
    description: 'Fires `(began, payload, reason)` as a span opens and closes',
    example: `slash:GetSpanSignal("HitboxActive"):Connect(function(
\tbegan: boolean,
\tpayload: { [string]: any },
\treason: ("ended" | "interrupted")?
)
\tif began then
\t\tprint("hitbox open, damage", payload.damage)
\telse
\t\tprint("hitbox closed:", reason)
\tend
end)`,
  },
  {
    call: 'track:GetStateChangedSignal(name)',
    description: 'Fires `(new, old, payload)`',
    example: `slash:GetStateChangedSignal("CanCancel"):Connect(function(
\tnew: boolean,
\told: boolean,
\tpayload: { [string]: any }?
)
\tprint("CanCancel went from", old, "to", new)
end)`,
  },
  {
    call: 'track.Stopped',
    description: 'Fires `"Completed"` or `"Interrupted"`',
    example: `slash.Stopped:Connect(function(reason: "Completed" | "Interrupted")
\tif reason == "Interrupted" then
\t\tprint("the attack was cut short")
\tend
end)`,
  },
  {
    call: 'ApexEngine.GetRigState(character):SetSpace(joint, space, blend?)',
    description: 'Moves a joint to another space from code, like the sword to `"LeftHand"`',
    example: `local character: Model = player.Character or player.CharacterAdded:Wait()
local rig = ApexEngine.GetRigState(character)

rig:SetSpace("Sword", "LeftHand")`,
  },
  {
    call: 'ApexEngine.LoadScene(module, slots, options?)',
    description: 'Loads a scene onto your characters, one per slot. Then `:Play()`, `:Stop()`, `:GetTrack(slot)`',
    example: `local finisher: ModuleScript = ReplicatedStorage.ApexAnimations.Finisher
local slots: { [string]: Model } = {
\tAttacker = player.Character,
\tDefender = npc,
}

local scene = ApexEngine.LoadScene(finisher, slots)
scene:Play()

local attackerTrack = scene:GetTrack("Attacker") -- ApexTrack`,
  },
]

export const API_TRACK_NOTE =
  'An ApexTrack works like an AnimationTrack (`Play`, `Stop`, `AdjustSpeed`, `TimePosition`, `GetMarkerReachedSignal` …), so switching to it is a one-line change.'

export const API_QUICKSTART = {
  title: 'Play an animation and a scene',
  script: 'PlayExample',
  code: `local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ApexEngine = require(ReplicatedStorage:WaitForChild("ApexEngine"))

local player: Player = Players.LocalPlayer
local character: Model = player.Character or player.CharacterAdded:Wait()
local npc = workspace:WaitForChild("Dummy") :: Model

-- An animation
local slash = ApexEngine.LoadAnimation(character, ReplicatedStorage.ApexAnimations.Slash) -- ApexTrack
slash:Play()

-- A scene
local scene = ApexEngine.LoadScene(ReplicatedStorage.ApexAnimations.Finisher, {
\tAttacker = character,
\tDefender = npc,
})
scene:Play()`,
}

export const API_SCENE_NOTE =
  'Play a scene on the machine that simulates every character in it: for a player and an NPC, that’s the player’s client. The guide inside the code generated when you export an animation shows how.'
