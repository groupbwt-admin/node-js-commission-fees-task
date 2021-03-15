import { CashCommission, User } from '../Models/index.js';
import FileReader from './FileReader.js';

/**
 * The main entry point of the application.
 * Connects to the rest of the classes and services, and performs calculations
 */
export default class CommissionCalculator {
  constructor() {
    this.data = null;
    this.cashCommissionFees = null;
    this.users = {};
  }

  /**
   * Read transactions data from file
   *
   * @param fileName
   * @returns Array transactions list
   */
  async readInput(fileName) {
    if (!fileName) {
      throw new Error('File name required');
    }
    const filePath = (fileName.indexOf('/') > -1 && fileName) || `./${fileName}`;

    if (!FileReader.exists(filePath)) {
      throw new Error('File does not exist');
    }

    const json = FileReader.read(filePath);
    try {
      this.data = JSON.parse(json);
    } catch (e) {
      throw new Error('Incoming file contains invalid json');
    }

    if (!Array.isArray(this.data)) {
      throw new Error('Incoming data must be an array');
    }

    return this.data;
  }

  /**
   * Get all commission info
   */
  async getCommissionRules() {
    const cashCommissionClient = new CashCommission();
    this.cashCommissionFees = await cashCommissionClient.getCommissionMap();
  }

  /**
   * Processing of all transactions.
   * The processing creates an array of users,
   * and distributes transactions to the transactionsHistory fields of each user.
   *
   * @returns The list of transactions with calculated commissions
   */
  async calculate() {
    return this.data.map((transactionRow) => this.calculateRow(transactionRow));
  }

  /**
   * Processes each transaction and adds it to the user
   *
   * @param transactionData
   * @returns Transaction instance
   */
  calculateRow(transactionData) {
    let user = this.users[transactionData.user_id];
    if (!user) {
      user = new User({
        id: transactionData.user_id,
        type: transactionData.user_type,
      });
      this.users[transactionData.user_id] = user;
    }
    this.users[transactionData.user_id].addTransaction({
      transactionData,
      cashCommissionFees: this.cashCommissionFees,
    });

    return this.users[transactionData.user_id].transactionsHistory[
      this.users[transactionData.user_id].transactionsHistory.length - 1
    ];
  }
}
