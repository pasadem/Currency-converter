import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, InputGroup } from "react-bootstrap";
import {
  selectors as fromSelectors,
  actions as currFromActions,
} from "../slices/currencyFrom.js";
import {
  selectors as toSelectors,
  actions as currToActions,
} from "../slices/currencyTo.js";
import {
  fetchInitialData,
  selectors as fetchSelectors,
} from "../slices/fetchData.js";
import { Form } from "react-bootstrap";

export const getCurrRate = (name, arr) => {
  if (name === "UAH") {
    return [{ rate: 1 }];
  } else {
    return arr.filter((item) => item.cc === name);
  }
};

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitialData());
    dispatch(currFromActions.addFrom("USD"));
    dispatch(currToActions.addTo("EUR"));
  }, []);
  const addFrom = useSelector(fromSelectors.selectAll)[0];
  const addTo = useSelector(toSelectors.selectAll)[0];

  const [inputFrom, setInputFrom] = useState("");
  const [inputTo, setInputTo] = useState("");

  /* const array = [
    { cc: "USD", rate: 36.6666 },
    { cc: "EUR", rate: 38.7899 },
    { cc: "UAH", rate: 1 },
  ]; */

  const list = useSelector(fetchSelectors.selectAll)[0];

  const currencyList = ["USD", "EUR", "UAH"];
  const getAmount = (from, to, amount) => {
    return (amount * from) / to;
  };
  const getCurrFrom = getCurrRate(addFrom, list)[0].rate;
  const getCurrTo = getCurrRate(addTo, list)[0].rate;
  return (
    <>
      <Container className="d-flex flex-column pt-6 main ">
        <div className="row bg-light my-1 mt-50 row-cols-1 row-cols-lg-4 row-cols-md-4">
          {
            <>
              <div className="col py-2">
                <InputGroup>
                  <Form.Control
                    placeholder="input amount"
                    value={inputFrom}
                    onChange={({ target: { value } }) => {
                      setInputFrom(value);
                      setInputTo(
                        +getAmount(getCurrFrom, getCurrTo, value).toFixed(2)
                      );
                    }}
                  />
                </InputGroup>
              </div>
              <div className="col py-2">
                <Form.Select
                  className="w-50"
                  value={addFrom}
                  onChange={({ target: { value } }) => {
                    dispatch(currFromActions.addFrom(value));
                    setInputTo(
                      +getAmount(getCurrFrom, getCurrTo, inputFrom).toFixed(2)
                    );
                  }}
                >
                  {currencyList.map((name) => (
                    <option key={name} value={name}>
                      {name.toLocaleUpperCase()}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col py-2">
                <InputGroup>
                  <Form.Control
                    placeholder=""
                    value={inputTo}
                    onChange={({ target: { value } }) => {
                      setInputTo(value);
                      setInputFrom(
                        +getAmount(getCurrTo, getCurrFrom, value).toFixed(2)
                      );
                    }}
                    onFocus={() => {}}
                  />
                </InputGroup>
              </div>
              <div className="col py-2">
                <Form.Select
                  className="w-50"
                  value={addTo}
                  onChange={({ target: { value } }) => {
                    dispatch(currToActions.addTo(value));
                    setInputFrom(
                      +getAmount(getCurrTo, getCurrFrom, inputTo).toFixed(2)
                    );
                  }}
                >
                  {currencyList.map((name) => (
                    <option key={name} value={name}>
                      {name.toLocaleUpperCase()}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </>
          }
        </div>
      </Container>
    </>
  );
};

export default Main;
