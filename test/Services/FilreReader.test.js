import assert from 'assert';
import { FileReader } from '../../src/Services/index.js';

describe('FileReader service tests', () => {
  it('Checking if a file package.json exists', async () => {
    assert.strictEqual(FileReader.exists('./package.json'), true);
  });

  it('Checking if a file package2.json does not exists', async () => {
    assert.strictEqual(FileReader.exists('./package2.json'), false);
  });

  it('Read package.json file', async () => {
    const content = await FileReader.read('./package.json');
    assert.strictEqual(JSON.parse(content).name, 'node-js-commission-fees-task');
  });
});
