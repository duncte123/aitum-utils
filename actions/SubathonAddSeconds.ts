import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { IntInput, FloatInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Subathon: Add seconds';

const inputs: ICCActionInputs = {
  seconds: new IntInput('Seconds to add', { required: true, minValue: -1 }),
  multiplier: new FloatInput('Multiplier', { required: false, minValue: 1 }),
}

type InputType = {
  seconds: number;
  multiplier: number;
}

async function method(inputs: InputType) {
  const aitumJS = AitumCC.get().getAitumJS().aitum;

  const vars = await aitumJS.getGlobalVariables();

  const counterVar = vars.find((v) => v.name === 'Subathon Counter');

  if (!counterVar) {
    throw new Error('Please create a number variable named "Subathon Counter"');
  }

  const curVal = counterVar.value as number;
  const newVal = curVal + Math.floor((inputs.seconds * inputs.multiplier || 1));

  if (newVal < 0) {
    return;
  }

  await counterVar.update(curVal + inputs.seconds);
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
