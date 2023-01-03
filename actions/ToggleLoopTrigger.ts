import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { IntInput, StringInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Toggle rule looping';

// The custom code inputs
const inputs: ICCActionInputs = {
  secondsInterval: new IntInput('Run the rule every x seconds', { required: true }),
  ruleName: new StringInput('Rule name', { required: true }),
};

let ruleInterval: NodeJS.Timer | null = null;

// The code executed.
async function method(inputs: { [key: string]: number | string | boolean | string[] }) {
  if (ruleInterval !== null) {
    clearInterval(ruleInterval);
    ruleInterval = null;
    return;
  }

  const secondsInterval = inputs.secondsInterval as number;
  const ruleName = inputs.ruleName as string;

  const aitumApi = AitumCC.get().getAitumJS().aitum
  const rules = await aitumApi.getRules();
  const ruleToTrigger = rules.find((r) => r.name === ruleName);

  if (!ruleToTrigger) {
    throw new Error(`Rule ${ruleName} does not exist.`);
  }

  ruleInterval = setInterval(() => {
    ruleToTrigger.trigger().catch((e) => {
      console.error('Failed to trigger rule', e);

      if (ruleInterval !== null) {
        clearInterval(ruleInterval);
        ruleInterval = null;
      }
    });
  }, secondsInterval * 1000);
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
