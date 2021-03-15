import { Transaction } from './index.js';

export default class User {
  constructor({ id, type }) {
    this.id = id;
    this.type = type;
    this.transactionsList = [];
  }

  /**
   * Adding a new transaction to the user's history.
   * The entire history is stored since the launch of the script.
   * When adding a transaction its commission is calculated
   *
   * @param transactionData.transactionData
   * @param transactionData
   * @param cashCommissionFees
   * @param transactionData.cashCommissionFees
   */
  addTransaction({ transactionData, cashCommissionFees }) {
    const newTransaction = new Transaction(transactionData);
    newTransaction.calculateCommission({
      userType: this.type,
      oldTransactionsList: this.getTransactionsByCurrentWeek(newTransaction),
      cashCommissionFees,
    });
    this.transactionsList.push(newTransaction);
  }

  /**
   * Filtering transactions from the history that were in the same week as the selected transaction.
   *
   * @param transaction
   * @returns [Transaction] Transaction list
   */
  getTransactionsByCurrentWeek(transaction) {
    return this.transactionsList.filter(
      (oldTransaction) => transaction.week === oldTransaction.week,
    );
  }
}
