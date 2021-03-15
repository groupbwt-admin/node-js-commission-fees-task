import assert from 'assert';
import { Cache } from '../../src/Services/index.js';

describe('Cache service tests', () => {
  it('Check the set and get operations of caching to disk', async () => {
    const сacheClient = new Cache();
    assert.strictEqual(await сacheClient.get('test-variable'), null);
    await сacheClient.set('test-variable', 'foo-bar');
    assert.strictEqual(await сacheClient.get('test-variable'), 'foo-bar');
  });

  it('Check the set and get operations of caching to disk', async () => {
    const сacheClient = new Cache();
    await сacheClient.set('test-variable', 'foo-bar');
    const сacheClient2 = new Cache();
    assert.strictEqual(await сacheClient2.get('test-variable'), 'foo-bar');
  });

  it('Check the flush all operation', async () => {
    const сacheClient = new Cache();
    await сacheClient.set('test-variable', 'foo-bar');
    await сacheClient.set('test-variable-2', 'foo-bar');
    assert.strictEqual(await сacheClient.get('test-variable'), 'foo-bar');
    await сacheClient.flush();
    assert.strictEqual(await сacheClient.get('test-variable'), null);
    assert.strictEqual(await сacheClient.get('test-variable-2'), null);
  });
  it('Check the flush kry operation', async () => {
    const сacheClient = new Cache();
    await сacheClient.set('test-variable', 'foo-bar');
    await сacheClient.set('test-variable-2', 'foo-bar');
    assert.strictEqual(await сacheClient.get('test-variable'), 'foo-bar');
    await сacheClient.flush('test-variable');
    assert.strictEqual(await сacheClient.get('test-variable'), null);
    assert.strictEqual(await сacheClient.get('test-variable-2'), 'foo-bar');
  });
});
