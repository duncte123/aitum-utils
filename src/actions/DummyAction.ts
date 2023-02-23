import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { BooleanInput, FloatInput, IntInput, StringInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';
import { DeviceType } from 'aitum.js/lib/enums';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Dummy Action';


const inputs: ICCActionInputs = {
  //
}


async function method(inputs: { [key: string]: number | string | boolean | string[] }) {
  //
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
