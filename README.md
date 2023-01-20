# Aitum utils!

## What is this?
This repository contains cool actions for Aitum's custom code module.
You can just drag and drop these into your `src/actions` folder and instantly be able to use them.

# Included actions

## PlayRandomSound.ts
Given a path to a folder, this action will play a random audio file through Aitum that is located in that folder.<br>
The path to the folder provided must be the full path.

Inputs:
- Full path to folder with sounds
  - The folder that the sounds are in. E.G. "C:\Users\duncte\Music\Honks" on windows or "/home/duncte123/honks" on Linux and mac.

## PlayRandomSoundAdvanced.ts
Given a path to a folder, this action will play a random audio file through Aitum that is located in that folder.<br>
The path to the folder provided must be the full path.<br>
During playback of the sound file this action will also toggle a source on. This source will be toggled off automatically when playback of the sound file ends.

Installation commands:
- `npm install ffprobe ffprobe-static @types/ffprobe @types/ffprobe-static`

Inputs:
- OBS Name
  - The name of your obs integration that will be used to toggle the source on
- OBS Scene
  - The scene that holds the item to show while the sound is playing
- Icon source
  - The name of the source within `OBS Scene` to toggle on while the sound is playing (and off when the sound ends).
- Full path to folder with sounds
  - The folder that the sounds are in. E.G. "C:\Users\duncte\Music\Honks" on windows or "/home/duncte123/honks" on Linux and mac.

Instruction video: https://www.youtube.com/watch?v=axaa0OXvUso

## ToggleLoopTrigger.ts
Allow you to turn on and off rule looping easily (no extra rules/variables required)

Inputs:
- Run the rule every x seconds
  - How often per second to trigger the rule
- Rule name
  - The name of the rule you want to trigger
