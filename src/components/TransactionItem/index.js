// Write your code here

import './index.css'

const TransactionItem = props => {
  const {eachItem, clickingDelete} = props
  const {id, title, amount, bal, type, income, expenses} = eachItem

  console.log(amount, bal, income, expenses, type)
  const onClickDelete = () => {
    clickingDelete(eachItem)
  }
  return (
    <li className="styles3">
      <p className="styles2">{title}</p>
      <p className="styles2">{amount}</p>
      <p className="styles2">{type}</p>
      <button className="btn-cls" type="button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
          className="img2"
          onClick={onClickDelete}
          data-testid="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
