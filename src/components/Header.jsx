import { Container } from "react-bootstrap";
import { selectors } from "../slices/fetchData.js";
import React from "react";
import { useSelector } from "react-redux";
import { getCurrRate } from "./Main.jsx";

export default function Header() {
  const list = useSelector(selectors.selectAll)[0];
  
  const usdRate = +(getCurrRate('USD', list)[0].rate).toFixed(2)
  const eurRate = +(getCurrRate('EUR', list)[0].rate).toFixed(2)

  return (
    <Container className="d-flex header fixed-top flex-column">
      <Container className="mb-3">
        <div className="navbar navbar-dark py-2 px-4 bg-dark">
          <a className="navbar-brand" href="#">
            Currency Converter
          </a>
        </div>
      </Container>
      <Container>
        <div className="row">
          <div className="col  p-2">
            <div className="row">
              <div className="col col-lg-3 p-2">
                <h6>UAH - USD:</h6>
              </div>
              <div className="col p-1">{usdRate}</div>
            </div>
          </div>
          <div className="col p-2">
            <div className="row ">
              <div className="col col-lg-3 p-2">
                <h6>UAH - EUR:</h6>
              </div>
              <div className="col p-1">{eurRate}</div>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}
