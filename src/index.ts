import { AitumCC } from 'aitum.js';
import * as dotenv from 'dotenv';
import { resolve, basename } from 'path';
import { sync as glob } from 'glob';

dotenv.config({ path: resolve(__dirname, '..', 'settings.env') });

async function loadActions(lib: AitumCC) {
  const tsFiles = glob('/actions/*.ts', {
    root: __dirname,
  })
    .filter(
      (file: string) => {
        const base = basename(file);

        return !base.startsWith('disabled-') && !base.startsWith('disabled_');
      }
    );

  for (const file of tsFiles) {
    try {
      const { default: obj } = await import(file);

      if (!obj.name) {
        console.error(`Skipping "${file}": The name is missing`);
        continue;
      }

      if (!obj.inputs) {
        console.error(`Skipping "${file}": The inputs are missing (must have empty object for no inputs)`);
        continue;
      }

      if (!obj.method) {
        console.error(`Skipping "${file}": The method is missing`);
        continue;
      }

      if (typeof obj.method !== 'function') {
        console.error(`Skipping "${file}": The method is not a function`);
        continue;
      }

      lib.registerAction(obj);
    } catch (e: any) {
      console.error(`Failed to import "${file}", is the code valid?`, e)
    }
  }
}

const lib = AitumCC.get();

(async () => {
  // Set up the environment
  lib.setEnv(process.env.AITUM_CC_ID as string, process.env.AITUM_CC_HOST as string, process.env.API_KEY as string);

  // Register actions
  await loadActions(lib);


  // Connect after a few seconds
  setTimeout(async () => await lib.connect(), 1e3);
})();
