import React from 'react';
import Amount from './amount/Amount';

function ShowTransaction({ transaction }) {



  return (
    <div className='show-transaction card my-4'>
      <div className='showTransactionText'>
        <h2 className='transaction-to'>{transaction.user}</h2>
        <div className='transaction-date'>{transaction.date}</div>
      </div>
      <Amount amount={transaction.amount} style={{ fontWeight: 500 }} />
    </div>
  )

}
export default ShowTransaction