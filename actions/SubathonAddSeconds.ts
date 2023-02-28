import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { IntInput, FloatInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';
import { InputType } from 'aitum.js/lib/enums';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Subathon: Add seconds';

const inputs: ICCActionInputs = {
  seconds: new IntInput('Seconds to add', { required: true, minValue: -1 }),
  multiplier: new FloatInput('Multiplier', { required: false, minValue: 1 }),
}

type UserInputs = {
  seconds: number;
  multiplier: number;
}

async function method(inputs: UserInputs) {
  const aitumJS = AitumCC.get().getAitumJS().aitum;

  const vars = await aitumJS.getGlobalVariables();

  const counterVar = vars.find((v) => v.name === 'Subathon Counter');

  if (!counterVar) {
    throw new Error('Please create a number variable named "Subathon Counter"');
  }

  let maxSeconds = -1;

  const maxVar = vars.find((v) => v.name === 'Subathon Max');

  if (maxVar && maxVar.type === InputType.INT) {
    maxSeconds = maxVar.value as number;
  }

  const curVal = counterVar.value as number;
  let newVal = curVal + Math.floor(inputs.seconds * (inputs.multiplier || 1));

  if (newVal < 0) {
    return;
  }

  if (maxSeconds > -1) {
    // Make sure that we don't go over the max seconds
    newVal = Math.min(newVal, maxSeconds);
  }

  await counterVar.update(newVal);
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
