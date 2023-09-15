import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isloading, setIsloading] = useState(false);

  useEffect(
    function () {
      setIsloading(true);
      async function convert() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${convertTo}`
        );
        const data = await res.json();
        setConvertedAmount(data.rates[convertTo]);
        setIsloading(false);
      }
      if (convertFrom === convertTo) return setConvertedAmount(amount);
      convert();
    },
    [amount, convertFrom, convertTo]
  );

  return (
    <>
      <div>
        <h1 style={{ fontFamily: "Roboto" }}>Currency Converter</h1>
      </div>
      <div>
        <input
          type="text"
          value={amount}
          placeholder="Enter amount.."
          onChange={(e) => setAmount(e.target.value)}
          // disabled={isloading}
        />
        <select
          value={convertFrom}
          onChange={(e) => setConvertFrom(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="GBP">GBP</option>
          {/* <option value="PKR">PKR</option> */}
        </select>
        <select
          value={convertTo}
          onChange={(e) => setConvertTo(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="GBP">GBP</option>
          {/* <option value="PKR">PKR</option> */}
        </select>
        {amount ? <p>{convertedAmount}</p> : ""}
      </div>
    </>
  );
}
