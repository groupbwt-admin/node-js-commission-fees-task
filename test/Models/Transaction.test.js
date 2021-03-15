import assert from 'assert';
import Transaction from '../../src/Models/Transaction.js';
import transactionsList from '../transactions.js';
import cashCommissionFees from '../cashCommissionFees.js';

describe('Transaction model tests', () => {
  it('Test cash_in transaction', () => {
    const transaction = new Transaction(transactionsList[0]);
    transaction.calculateCommission({
      userType: transactionsList[0].user_type,
      oldTransactionsList: [],
      cashCommissionFees,
    });
    assert.strictEqual(transaction.commission, '0.06');
  });

  it('Transaction operation type is not defined', () => {
    const transaction = new Transaction(transactionsList[0]);
    transaction.type = 'cash';
    assert.throws(
      () => {
        transaction.calculateCommission({
          userType: transactionsList[0].user_type,
          oldTransactionsList: [],
          cashCommissionFees,
        });
      },
      {
        message: 'This type of operation is not supported',
      },
    );
  });

  it('User type is not defined', () => {
    const transaction = new Transaction(transactionsList[0]);
    assert.throws(
      () => {
        transaction.calculateCommission({
          userType: 'not_authorized',
          oldTransactionsList: [],
          cashCommissionFees,
        });
      },
      {
        message: 'This type of user is not supported',
      },
    );
  });

  it('Apply max rule to commission calculate', () => {
    const transaction = new Transaction({ ...transactionsList[0] });
    transaction.operation.amount = 100000;
    transaction.calculateCommission({
      userType: transactionsList[0].user_type,
      oldTransactionsList: [],
      cashCommissionFees,
    });
    assert.strictEqual(transaction.commission, '5.00');
    transaction.operation.amount = 200;
  });

  it('Apply min rule to commission calculate', () => {
    const transaction = new Transaction({ ...transactionsList[1] });
    transaction.operation.amount = 10;
    transaction.calculateCommission({
      userType: transactionsList[1].user_type,
      oldTransactionsList: [],
      cashCommissionFees,
    });
    assert.strictEqual(transaction.commission, '0.50');
    transaction.operation.amount = 300;
  });

  it('Apply week_limit rule to commission calculate without history', () => {
    const transaction = new Transaction(transactionsList[3]);
    transaction.calculateCommission({
      userType: transactionsList[3].user_type,
      oldTransactionsList: [],
      cashCommissionFees,
    });
    assert.strictEqual(transaction.commission, '0.00');
  });

  it('Apply week_limit rule to commission calculate with history', () => {
    const transaction = new Transaction(transactionsList[3]);
    transaction.calculateCommission({
      userType: transactionsList[3].user_type,
      oldTransactionsList: transactionsList.slice(0, 3),
      cashCommissionFees,
    });
    assert.strictEqual(transaction.commission, '3.00');
  });
});
