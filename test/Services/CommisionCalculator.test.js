import assert from 'assert';
import CommissionCalculator from '../../src/Services/CommissionCalculator.js';
import transactionsList from '../transactions.js';

describe('CommissionCalculator service tests', () => {
  it('Load data from file', async () => {
    const calculator = new CommissionCalculator();
    const content = await calculator
      .readInput('./input.json');
    assert.deepEqual(content, transactionsList);
  });

  it('Calculate transactions from file', async () => {
    const calculator = new CommissionCalculator();
    await calculator
      .readInput('./input.json');
    await calculator.getCommissionRules();
    const result = (await calculator.calculate())
      .map((transaction) => transaction.commission);

    assert.deepEqual(result, [
      '0.06',
      '0.90',
      '87.00',
      '3.00',
      '0.30',
      '0.30',
      '5.00',
      '0.00',
      '0.00',
    ]);
  });
});
