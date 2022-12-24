import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { StringInput } from 'aitum.js/lib/inputs';
import RandomSoundPlayer from '../impl/RandomSoundPlayer';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Play a random sound';

const player = new RandomSoundPlayer();

// The custom code inputs
const inputs: ICCActionInputs = {
  scene: new StringInput('OBS Scene (to show an image while playing)', { required: false }),
  source: new StringInput('OBS source (to show an image while playing)', { required: false }),
  path: new StringInput('Full path to folder with sounds', { required: true }),
}

// The code executed.
async function method(inputs: { [key: string]: number | string | boolean | string[] }) {
  await player.playSound(
    inputs.folderPath as string,
    inputs.obsScene as string | undefined,
    inputs.obsSource as string | undefined
  );
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
