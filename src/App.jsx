import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('US Dollar(usd)')
  const [to, setTo] = useState('Indian Rupee(inr)')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('https://images.pexels.com/photos/8369837/pexels-photo-8369837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}
    >
      <div className="w-full">
        
        <h1 className='text-4xl text-center font-bold text-gray-700 my-4'>Currency Convertor</h1>
        <div className="w-full bg-green-600 max-w-xl mx-auto  border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}>
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className='relative w-full h-0.5'>
              <button
                type="button"
                className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-700 text-white px-2 scroll-py-0.5'
              >
                SWAP
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className='w-full bg-blue-700 text-white rounded-lg py-3 px-4'
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default App
