import { Component, OnInit } from '@angular/core';
import { FxRatesService } from "../fx-rates.service";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  public buyAmount: number;
  public sellAmount: number;
  public currentPrice: number;
  public currentPriceEur: number;

  constructor(
    private fxRates: FxRatesService
  ) {}

  ngOnInit() {

    this.fxRates.getFeed().subscribe(
      response => {
        this.currentPrice = response;
        this.currentPriceEur = 1 / response;
      },
      error => {
        alert('Error fetching rate feed.');
        console.warn('Error fetching rate feed.', error);
      }
    );

  }

  public submit ( type, amount, rate ) {

    if (type === 0) {
      alert('You bought £' + amount + ' for €' + ( rate * amount ).toFixed(2));
    } else if (type === 1) {
      alert('You sell €' + amount + ' for £' + ( rate * amount ).toFixed(2));
    }

  }

}
