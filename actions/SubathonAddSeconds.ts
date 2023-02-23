import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { BooleanInput, FloatInput, IntInput, StringInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';
import { DeviceType } from 'aitum.js/lib/enums';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Subathon: Add seconds';

const inputs: ICCActionInputs = {
  seconds: new IntInput('Seconds to add', { required: true, minValue: -1 }),
}

type InputType = {
  seconds: number;
}

async function method(inputs: InputType) {
  const aitumJS = AitumCC.get().getAitumJS().aitum;

  const vars = await aitumJS.getGlobalVariables();

  const counterVar = vars.find((v) => v.name === 'Subathon Counter');

  if (!counterVar) {
    throw new Error('Please create a number variable named "Subathon Counter"');
  }

  const curVal = counterVar.value as number;
  const newVal = curVal + inputs.seconds;

  if (newVal < 0) {
    return;
  }

  await counterVar.update(curVal + inputs.seconds);
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
