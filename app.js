import { CommissionCalculator } from './src/Services/index.js';

const fileName = process.argv[2];

const calculator = new CommissionCalculator();
calculator
  .readInput(fileName)
  .then(() => calculator.getCommissionRules())
  .then(() => calculator.calculate())
  .then((result) => {
    result.forEach((transaction) => {
      // eslint-disable-next-line no-console
      console.log(transaction.commission);
    });
  });
