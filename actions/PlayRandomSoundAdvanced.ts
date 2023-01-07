import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { StringInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';
import { DeviceType } from 'aitum.js/lib/enums';
import path from 'path';
import fs from 'fs';
import ffprobe from 'ffprobe';
import ffprobeStatic from 'ffprobe-static';

type QueueItem = {
  folder: string;
  scene: string;
  source: string;
  obsHost: string;
};

let playing: boolean = false;
const queue: QueueItem[] = [];

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Play random sound from folder';

// The custom code inputs
const inputs: ICCActionInputs = {
  obsName: new StringInput('Name of obs integration', { required: true }),
  path: new StringInput('Full path to folder with sounds', { required: true }),
};

async function handleItem(item: QueueItem): Promise<void> {
  const aitumJs = AitumCC.get().getAitumJS();
  // Get access to the aitum audio player
  const aitumDevice = (await aitumJs.getDevices(DeviceType.AITUM))[0];
  const foundObsDevices = await aitumJs.getDevices(DeviceType.OBSV5, {
    host: item.obsHost
  });

  if (!foundObsDevices.length) {
    throw new Error('OBS device disappeared!?');
  }

  const obs = foundObsDevices[0];

  // Get the path to the folder
  const folder = path.resolve(item.folder);

  // Look at all files in the folder
  const audioFiles = fs.readdirSync(folder).filter((f) => f !== '.gitignore');

  // Select a random audio file from the folder
  const randomFile = path.join(folder, audioFiles[Math.floor(Math.random() * audioFiles.length)]);

  const stats = await ffprobe(randomFile, { path: ffprobeStatic.path });
  const durS = stats.streams[0].duration || 0;

  await obs.changeSceneItemVisibility(item.scene, item.source, true);
  await aitumDevice.playSound(randomFile, 1.0);
  await aitumJs.sleep(durS * 1000);
  await obs.changeSceneItemVisibility(item.scene, item.source, false);
}

// The code executed.
async function method(inputs: { [key: string]: number | string | boolean | string[] }) {
  const aitumJs = AitumCC.get().getAitumJS();
  const foundObsDevices = await aitumJs.getDevices(DeviceType.OBSV5, {
    name: inputs.obsName as string,
  });

  console.log(foundObsDevices);

  if (playing) {
    // push to queue
    return;
  }

  // TODO: run the thing
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
