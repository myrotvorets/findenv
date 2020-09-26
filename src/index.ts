import fs from 'fs';
import { dirname, join, resolve } from 'path';
import { promisify } from 'util';

const exists = promisify(fs.exists);
export async function findEnv(): Promise<string | null> {
    const locations: string[] = [];
    if (require.main && require.main.filename) {
        locations.push(resolve(join(dirname(require.main.filename), '.env')));
        locations.push(resolve(join(dirname(require.main.filename), '..', '.env')));
    }

    const cwd = process.cwd();
    locations.push(resolve(join(cwd, '.env')));

    for (const location of locations) {
        // eslint-disable-next-line no-await-in-loop
        if (await exists(location)) {
            return location;
        }
    }

    return null;
}
