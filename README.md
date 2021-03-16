## Commission fees task

### To run demo
```javascript
cp .env.example .env
npm i
node app.js input.json
```

### To run tests
```javascript
npm run test
```

### To run tests with coverage
```javascript
npm run coverage
```

### Some places that need to be improved or changed as the project expands:
- Change CashCommission model. We need to move asynchronous data getters to another location, and standardize the model.
  Suggested structure for this model:
```javascript
{
    cash_operation_type: string,
    user_type: string,
    rules: [
        {
            rule: string, //min, max, week_limit
            amount: number,
            currency: string
        }
    ]    
}
```  
- Move User.transactionsHistory to a separate model

