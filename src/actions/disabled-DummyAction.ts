import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Dummy Action 2!';

// The custom code inputs
const inputs: ICCActionInputs = {
  // No inputs required
}

// The code executed.
async function method(inputs: { [key: string]: number | string | boolean | string[] }) {
  // Hi there
  // I am a disabled action
  //
  // If you prefix the name of any action file with "disabled-" or "disabled_" I will happily ignore it :)
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
