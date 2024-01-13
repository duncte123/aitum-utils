import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { StringInput, IntInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';
import { DeviceType } from 'aitum.js/lib/enums';
import path from 'path';
import fs from 'fs';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Play random sound from folder';

// The custom code inputs
const inputs: ICCActionInputs = {
  path: new StringInput('Full path to folder with sounds', { required: true }),
  volume: new IntInput('Volume', { required: false, minValue: 0, maxValue: 100 }),
};

type InputType = {
  path: string;
  volume?: number;
};

// The code executed.
async function method(inputs: InputType) {
  // Get the path to the folder
  const folder = path.resolve(inputs.path as string);

  // Look at all files in the folder
  const audioFiles = fs.readdirSync(folder).filter((f) => f !== '.gitignore');

  // Select a random audio file from the folder
  const randomFile = path.join(folder, audioFiles[Math.floor(Math.random() * audioFiles.length)]);

  // Get access to the aitum audio player
  const aitumJs = AitumCC.get().getAitumJS();
  const aitumDevice = (await aitumJs.getDevices(DeviceType.AITUM))[0];

  const parsedVolume = Math.min(100, Math.max(0, inputs.volume || 100))
  const scaledVolume = parsedVolume / 100;

  await aitumDevice.playSound(randomFile, scaledVolume);
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
