import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

function App() {
  const [YTM, setYTM] = useState();

  const [date, setDate] = useState(Date);
  const handleDateChange = (event) => {
    var enteredDate = new Date(
      event.target.value.substring(0, 4),
      event.target.value.substring(5, 7) - 1,
      event.target.value.substring(8, 10)
    );
    setDate(enteredDate);
  };

  const [coupon, setCoupon] = useState("");
  const handleCouponChange = (event) => setCoupon(event.target.value);

  const [ask, setAsk] = useState("");
  const handleAskChange = (event) => setAsk(event.target.value);

  const oneDay = 24 * 60 * 60 * 1000;

  var today = new Date();
  var todayYear = today.getFullYear();
  var todayMonth = today.getMonth();
  var todayDay = today.getDate();

  var todayDate = new Date(todayYear, todayMonth, todayDay);

  const calculateYTM = () => {
    var diffDays = Math.round(Math.abs((todayDate - date) / oneDay));
    var periods = diffDays / 360;
    // console.log(coupon);
    // console.log(ask);
    // console.log(periods);

    var total =
      ((parseFloat(coupon) + (100 - ask) / periods) /
        ((100 + parseFloat(ask)) / 2)) *
      100;

    setYTM(total.toPrecision(3));
  };
  return (
    <>
      <ChakraProvider>
        <Heading>Yield to Maturity</Heading>
        <Input placeholder="Coupon" onChange={handleCouponChange} />
        <Input placeholder="Ask" onChange={handleAskChange} />
        <Input
          placeholder="Maturity Date"
          type="date"
          onChange={handleDateChange}
        />
        <Button colorScheme="blue" onClick={() => calculateYTM()}>
          Calculate
        </Button>
        <Heading>YTM: {YTM}%</Heading>
      </ChakraProvider>
    </>
  );
}

export default App;
