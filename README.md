# Aitum utils!

## What is this?
This repository contains cool actions for Aitum's custom code module.
You can just drag and drop these into your `src/actions` folder and instantly be able to use them.

Before using this please make sure that you have set up aitum-cc, instructions are here: https://github.com/Aitum/aitum-cc

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

## Subathon countdown

### Files
This action has two different files, please copy them both over
- SubathonFormatTime.ts
- SubathonAddSeconds.ts

### Installation steps
1. Create 3 global variables (names must match)
   1. Subathon Counter ->  Whole Number
   2. Subathon TXT Time -> Text
   3. Subathon Ticker ->   Switch
2. Create a rule called "Format time for OBS".
   - trigger: Global Variable Changed -> Subathon Counter
   - action: custom code "Subathon: format time"
     - Set "Seconds variable" to the "Subathon Counter" variable
3. Create a rule called "Set time in OBS"
   - trigger: Global Variable Changed -> Subathon TXT Time
   - action: Set Text Source Properties. Use "Subathon TXT Time" as your text variable
4. Create a rule called "Subathon Ticker"
   - trigger: Global Variable Changed -> Subathon Ticker
   - actions:
     1. custom code "Subathon: Add seconds", set seconds to "-1"
     2. "Change Global Variable Value" and flip the "Subathon Ticker" variable with a ***1 second delay***
5. Now for every time that you want to add seconds (eg subs) you will need to add a new rule that adds the desired amount of seconds with the "Subathon: Add seconds" custom code action.
   You can use the "multiplier" to for example give the amount of $ donated so that $1 = 60 seconds for $20 becomes 1200 seconds added to the timer.
6. To start the timer manually trigger the "Subathon Ticker" rule. To stop the timer you can disable the rule and all the logic will halt automatically.

### Optional: max seconds
If you want a maximum to your subathon ticker you can do this very easily by creating a new number variable called "Subathon Max".
If you set this variable to the max seconds that you want the counter to have it will not go over. All you have to do is create this global variable in aitum and it will just work.

## ToggleLoopTrigger.ts
Allow you to turn on and off rule looping easily (no extra rules/variables required)

Inputs:
- Run the rule every x seconds
  - How often per second to trigger the rule
- Rule name
  - The name of the rule you want to trigger
