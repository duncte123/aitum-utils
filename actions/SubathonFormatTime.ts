import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { IntInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Subathon: format time';

const inputs: ICCActionInputs = {
  seconds: new IntInput('Seconds Variable', { required: true }),
}

type InputType = {
  seconds: number;
}


async function method(inputs: InputType) {
  const aitumJS = AitumCC.get().getAitumJS().aitum;

  const vars = await aitumJS.getGlobalVariables();

  const counterVar = vars.find((v) => v.name === 'Subathon TXT Time');

  if (!counterVar) {
    throw new Error('Please create a text variable named "Subathon TXT Time"');
  }

  const display = new Date(inputs.seconds * 1000).toISOString().substring(11, 19)

  await counterVar.update(display);
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
