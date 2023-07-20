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

  const hours = Math.floor(inputs.seconds / (60 * 60));

  const divisorForMinutes = inputs.seconds % (60 * 60);
  const minutes = Math.floor(divisorForMinutes / 60);

  const divisorForSeconds = divisorForMinutes % 60;
  const seconds = Math.ceil(divisorForSeconds);

  const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  await counterVar.update(display);
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
