import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'fields.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch (err) {
      await fs.writeFile(DATA_FILE, JSON.stringify({}), 'utf8');
    }
  } catch (err) {
    console.error('Failed to ensure data file', err);
    throw err;
  }
}

async function readStore() {
  await ensureDataFile();
  const content = await fs.readFile(DATA_FILE, 'utf8');
  try {
    return JSON.parse(content || '{}');
  } catch (err) {
    return {};
  }
}

async function writeStore(obj) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(obj, null, 2), 'utf8');
}

export async function getFields(org = 'default', dept = 'default') {
  const store = await readStore();
  const key = `${org}::${dept}`;
  return store[key] || { org, dept, fields: [] };
}

export async function saveFields(org = 'default', dept = 'default', fields = []) {
  const store = await readStore();
  const key = `${org}::${dept}`;
  store[key] = { org, dept, fields };
  await writeStore(store);
  return store[key];
}
