import assert from 'assert';
import CashCommission from '../../src/Models/CashCommission.js';
import { Cache } from '../../src/Services/index.js';

describe('CashCommission model tests', () => {
  it('Get cash_in commission', async () => {
    const cashInCommission = await CashCommission.getCashInCommission();
    assert.strictEqual(typeof cashInCommission.natural, 'object');
    assert.strictEqual(typeof cashInCommission.juridical, 'object');
  });

  it('Get cash_out commission', async () => {
    const cashInCommission = await CashCommission.getCashOutCommission();
    assert.strictEqual(typeof cashInCommission.natural, 'object');
    assert.strictEqual(typeof cashInCommission.juridical, 'object');
  });

  it('Get commission map without cache', async () => {
    const cache = new Cache();
    await cache.flush();
    const cashCommissionClient = new CashCommission();
    const cashInCommission = await cashCommissionClient.getCommissionMap();
    assert.strictEqual(typeof cashInCommission.cash_in, 'object');
    assert.strictEqual(typeof cashInCommission.cash_out, 'object');
  });

  it('Get commission map with cache', async () => {
    const cashCommissionClient = new CashCommission();
    const cashInCommission = await cashCommissionClient.getCommissionMap();
    assert.strictEqual(typeof cashInCommission.cash_in, 'object');
    assert.strictEqual(typeof cashInCommission.cash_out, 'object');
  });
});
