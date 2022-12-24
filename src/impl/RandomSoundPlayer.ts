// import { setVisibilityOnSource } from '../../obs';
import path from 'path';
import { AitumCC, AitumJS } from 'aitum.js';
import fs from 'fs';
import { DeviceType } from 'aitum.js/lib/enums.js';
import ffprobe from 'ffprobe';
import ffprobeStatic from 'ffprobe-static';

export default class RandomSoundPlayer {
  private playing: boolean = false;
  private queue: {
    folder: string;
    scene?: string;
    source?: string;
  }[] = [];

  async playSound(folder: string, scene?: string, source?: string): Promise<void> {
    if (this.playing) {
      this.queue.push({
        folder, scene, source,
      });
      return;
    }

    await this.actualRun(folder, scene, source);
  }

  private async actualRun(folder: string, scene?: string, source?: string) {
    const resolvedPath = path.resolve(folder);
    const sound = await this._getRandomSoundFromFolder(resolvedPath);

    // battling race conditions :P
    if (scene && source) {
      const aitumApi = AitumCC.get().getAitumJS();
      const obs = (await aitumApi.getDevices(DeviceType.OBSV5))[0]

      await obs.changeSceneItemVisibility(scene, source, true)
    }

    await this.playTrack(sound, scene, source);
  }

  private async playTrack(file: string, scene?: string, source?: string): Promise<void> {
    if (this.playing) {
      return;
    }

    this.playing = true;

    const aitumApi = AitumCC.get().getAitumJS();
    const aitum = (await aitumApi.getDevices(DeviceType.AITUM))[0];

    await aitum.playSound(file, 1.0);
    await this.waitForFileEnd(aitumApi, file);

    this.playing = false;

    if (scene && source) {
      const obs = (await aitumApi.getDevices(DeviceType.OBSV5))[0]

      await obs.changeSceneItemVisibility(scene, source, true)
    }

    this.drainQueue();
  }

  async waitForFileEnd(aitum: AitumJS, file: string): Promise<void> {
    const stats = await ffprobe(file, { path: ffprobeStatic.path });
    const durS = stats.streams[0].duration || 0;

    await aitum.sleep(durS * 1000);
  }

  async _getRandomSoundFromFolder(folder: string): Promise<string> {
    const files = fs.readdirSync(folder)
      .filter((f) => f !== '.gitignore');

    return path.join(folder, files[Math.floor(Math.random() * files.length)]);
  }

  private drainQueue(): void {
    if (this.queue.length === 0) {
      return;
    }

    const item = this.queue.shift();

    if (item) {
      this.actualRun(item.folder, item.scene, item.source).catch(console.error);
    }
  }
}
