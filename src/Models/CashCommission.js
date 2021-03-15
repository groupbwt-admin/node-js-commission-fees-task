import axios from 'axios';
import { Cache } from '../Services/index.js';

const BASE_API_URL = process.env.BASE_API_URL || 'https://private-00d723-paysera.apiary-proxy.com';

/**
 * The virtual proxies pattern model describes the structure of the rules
 * for calculating commissions.
 */
export default class CashCommission {
  constructor() {
    this.cache = new Cache();
    this.commissionMap = null;
  }

  /**
   * The main method to get the object of all possible commissions for transactions.
   * It is an object operation_type -> user_type -> commission_information.
   *
   * @returns {Promise<object>}
   */
  async getCommissionMap() {
    if (!this.commissionMap) {
      this.commissionMap = await this.cache.get('commission-map', async () => ({
        cash_in: await CashCommission.getCashInCommission(),
        cash_out: await CashCommission.getCashOutCommission(),
      }));
    }
    return this.commissionMap;
  }

  /**
   * Get cash in commission info
   *
   * @returns {Promise<{juridical: any, natural: any}>}
   */
  static async getCashInCommission() {
    const cashInResponse = await axios.get(`${BASE_API_URL}/cash-in`);

    return {
      natural: cashInResponse.data,
      juridical: cashInResponse.data,
    };
  }

  /**
   * Get cash out commission info.
   *
   * @returns {Promise<{juridical: any, natural: any}>}
   */
  static async getCashOutCommission() {
    const cashOutNaturalResponse = await axios.get(
      `${BASE_API_URL}/cash-out-natural`,
    );
    const cashOutLegalResponse = await axios.get(
      `${BASE_API_URL}/cash-out-juridical`,
    );
    return {
      natural: cashOutNaturalResponse.data,
      juridical: cashOutLegalResponse.data,
    };
  }
}
