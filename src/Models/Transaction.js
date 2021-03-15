import { getWeekNumberByDate } from '../Utils/date.js';

export default class Transaction {
  constructor({ date, type, operation }) {
    this.date = date;
    this.week = getWeekNumberByDate(date);
    this.type = type;
    this.operation = operation;
    this.commission = 0;
  }

  /**
   * The general method for calculating transaction fees.
   * It applies all possible conditions of the rules.
   * When a new rule is added to the code, it must be called in this method.
   * The calculations take into account user and transaction type, existing commissions,
   * user transaction history
   *
   * @param userType.userType
   * @param userType                        natural or juridical
   * @param transactionsHistory             Array of transactions
   * @param cashCommissionFees              Commission object
   * @param userType.transactionsHistory
   * @param userType.cashCommissionFees
   */
  calculateCommission({ userType, transactionsHistory, cashCommissionFees }) {
    this.commission = 0;
    if (!cashCommissionFees[this.type]) {
      throw new Error('This type of operation is not supported');
    }
    if (!cashCommissionFees[this.type][userType]) {
      throw new Error('This type of user is not supported');
    }
    const operationCommissionRule = cashCommissionFees[this.type][userType];
    this.commission = (operationCommissionRule.percents / 100) * this.operation.amount;

    this.applyMinRule(operationCommissionRule);
    this.applyMaxRule(operationCommissionRule);
    this.applyWeekLimitRule(operationCommissionRule, transactionsHistory);
    this.roundingCommission();
  }

  /**
   * Apply min commission rule to calculate
   *
   * @param operationCommissionRule
   */
  applyMinRule(operationCommissionRule) {
    if (
      !operationCommissionRule.min
      || operationCommissionRule.min.currency !== this.operation.currency
    ) {
      return;
    }
    this.commission = this.commission < operationCommissionRule.min.amount
      ? operationCommissionRule.min.amount
      : this.commission;
  }

  /**
   * Apply max commission rule to calculate
   *
   * @param operationCommissionRule
   */
  applyMaxRule(operationCommissionRule) {
    if (
      !operationCommissionRule.max
      || operationCommissionRule.max.currency !== this.operation.currency
    ) {
      return;
    }
    this.commission = this.commission > operationCommissionRule.max.amount
      ? operationCommissionRule.max.amount
      : this.commission;
  }

  /**
   * Apply week limit commission rule to calculate
   *
   * @param operationCommissionRule
   * @param transactionsHistory
   */
  applyWeekLimitRule(operationCommissionRule, transactionsHistory) {
    if (
      !operationCommissionRule.week_limit
      || operationCommissionRule.week_limit.currency !== this.operation.currency
    ) {
      return;
    }
    const transferredInAWeek = transactionsHistory.reduce(
      (total, transaction) => total
          + (transaction.type === 'cash_out' && transaction.operation.amount)
          || 0,
      0,
    );
    const overage = this.operation.amount
      + transferredInAWeek
      - operationCommissionRule.week_limit.amount;
    this.commission = overage <= 0
      ? 0
      : (operationCommissionRule.percents / 100)
          * (overage > this.operation.amount ? this.operation.amount : overage);
  }

  /**
   * Conversion of the commission value into the desired format with two characters after the comma
   *
   */
  roundingCommission() {
    this.commission = (Math.ceil(this.commission * 100) / 100).toFixed(2);
  }
}
