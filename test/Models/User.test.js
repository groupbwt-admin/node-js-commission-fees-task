import assert from 'assert';
import User from '../../src/Models/User.js';
import transactionsList from '../transactions.js';
import cashCommissionFees from '../cashCommissionFees.js';

describe('User model tests', () => {
  it('Create user by transaction info', () => {
    const user = new User({
      id: transactionsList[0].user_id,
      type: transactionsList[0].user_type,
    });
    assert.strictEqual(user.id, 1);
    assert.strictEqual(user.type, 'natural');
  });

  it('Add transaction to user history', () => {
    const transaction = transactionsList[0];
    const user = new User({
      id: transaction.user_id,
      type: transaction.user_type,
    });

    user.addTransaction({
      transactionData: transaction,
      cashCommissionFees,
    });

    assert.strictEqual(user.transactionsHistory.length, 1);
  });

  it('Add transactions to user history', () => {
    const transaction = transactionsList[0];
    const user = new User({
      id: transaction.user_id,
      type: transaction.user_type,
    });

    user.addTransaction({
      transactionData: transactionsList[0],
      cashCommissionFees,
    });
    user.addTransaction({
      transactionData: transactionsList[2],
      cashCommissionFees,
    });
    user.addTransaction({
      transactionData: transactionsList[3],
      cashCommissionFees,
    });

    assert.strictEqual(user.transactionsHistory.length, 3);
  });
});
