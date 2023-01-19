import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

const moneyDet = [
  {
    id: v4(),
    type: 'Your Balance',
    image:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png ',
    color: 'bg1',
  },
  {
    id: v4(),
    type: 'Your Income',
    image:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png ',
    color: 'bg2',
  },
  {
    id: v4(),
    type: 'Your Expenses',
    image:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png ',
    color: 'bg3',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: 'Income',
    bal: 0,
    income: 0,
    expenses: 0,
    listItems: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmt = event => {
    this.setState({amount: event.target.value})
  }

  onChangeSelect = event => {
    const result =
      event.target.value === 'INCOME' ? {type: 'Income'} : {type: 'Expenses'}
    this.setState(result)
  }

  submitEvent = event => {
    event.preventDefault()
    const {title, amount, bal, income, type, expenses} = this.state

    //    console.log(type, amount * 1, bal - amount, income)
    if (type === 'Income') {
      this.setState(prevState => ({
        title: '',
        income: prevState.income + amount * 1,
        bal: prevState.bal + amount * 1,
        amount: '',

        listItems: [
          ...prevState.listItems,
          {
            id: v4(),
            ...prevState,
            income: prevState.income + amount * 1,
            bal: prevState.bal + amount * 1,
          },
        ],
      }))
    } else {
      this.setState(prevState => ({
        title: '',
        expenses: prevState.expenses + amount * 1,
        bal: prevState.bal - amount * 1,
        amount: '',

        listItems: [
          ...prevState.listItems,
          {
            id: v4(),
            ...prevState,
            income: prevState.expenses + amount * 1,
            bal: prevState.bal - amount * 1,
          },
        ],
      }))
    }
  }

  clickingDelete = eI => {
    this.setState(prevState => {
      if (eI.type === 'Income') {
        return {
          ...prevState,
          bal: prevState.bal - eI.amount * 1,
          income: prevState.income - eI.amount * 1,
          listItems: prevState.listItems.filter(
            eachItem => eachItem.id !== eI.id,
          ),
        }
      }
      return {
        ...prevState,
        bal: prevState.bal + eI.amount * 1,
        expenses: prevState.expenses - eI.amount * 1,
        listItems: prevState.listItems.filter(
          eachItem => eachItem.id !== eI.id,
        ),
      }
    })
  }

  render() {
    const {title, amount, type, bal, income, expenses, listItems} = this.state
    console.log(type)
    return (
      <div className="bg-container">
        <div className="in-con1">
          <div className="name-container">
            <h1 className="name-richard">Hi, Richard</h1>
            <p className="welcome-text">
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>

          <MoneyDetails balance={bal} income={income} expenses={expenses} />
          <div className="bottom-container">
            <form onSubmit={this.submitEvent} className="transaction-section">
              <div className="transaction-section2">
                <h1 className="transaction-heading">Add Transaction</h1>
                <label className="title-label" htmlFor="titLE">
                  Title
                </label>
                <input
                  onChange={this.onChangeTitle}
                  className="title-input"
                  value={title}
                  type="text"
                  id="titLE"
                  placeholder="Title"
                />
                <label className="amt-label" htmlFor="amoUNT">
                  Amount
                </label>
                <input
                  onChange={this.onChangeAmt}
                  className="amt-input"
                  type="text"
                  id="amoUNT"
                  value={amount}
                  placeholder="Amount"
                />
                <label className="select-label" htmlFor="tyPE">
                  Type
                </label>
                <select
                  onChange={this.onChangeSelect}
                  className="select-element"
                  id="tyPE"
                >
                  {transactionTypeOptions.map(eachItem => (
                    <option key={eachItem.optionId} value={eachItem.optionId}>
                      {eachItem.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
            <div className="history-container">
              <div className="history-cont1">
                <h1 className="history-class">History</h1>
                <div className="transaction-history-container-headings">
                  <div className="styles">
                    <p className="styles1">Title</p>
                    <p className="styles1">Amount</p>
                    <p className="styles1">Type</p>
                  </div>
                  <ul className="ul-list">
                    {listItems.map(eachItem => (
                      <TransactionItem
                        eachItem={eachItem}
                        clickingDelete={this.clickingDelete}
                        key={eachItem.id}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
