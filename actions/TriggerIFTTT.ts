import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { StringInput } from 'aitum.js/lib/inputs';
import { AitumJS } from 'aitum.js';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Trigger IFTTT';

// The custom code inputs
const inputs: ICCActionInputs = {
  identifier: new StringInput('Trigger identifier', { required: true }),
  userData: new StringInput('Extra data', { required: false }),
};

// The code executed.
async function method(inputs: { [key: string]: number | string | boolean | string[] }) {
  await AitumJS.http.post(
    'https://(TODO)/insert-trigger',
    {
      identifier: inputs.identifier,
      userData: inputs.userData,
    }
  );
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
