<table>
    <tr>
        <th></th>
        <th *ngFor="let item of timeHeader;">{{item}}</th>  
    </tr>
    <tr *ngFor="let item of tblData; let i = index">
        <td>{{i+1}}</td>  
      <td *ngFor="let it of item;">{{it}}</td>
    </tr>
</table>

-----------------------------------------------------------
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 3px;
    width: 2%;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
-----------------------------------------------------------
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-one',
  templateUrl: './sample-one.component.html',
  styleUrls: ['./sample-one.component.css']
})
export class SampleOneComponent implements OnInit {

  tblData = [];
  timeHeader = [];

  constructor() {
    this.tblData = this.getTableData(12, 2022);
    this.timeHeader = this.getTimeHeader();

  }

  ngOnInit(): void {

  }
  getTimeHeader = () => { let t: any = []; for (let i = 1; i <= 24; i++) { t.push(i) } return t; }
  getMonthsList = () => {
    let monthsDrpValues: string[] = [];
    let months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let myDate = new Date();
    let currentMonth = myDate.getMonth();
    let currentYear = myDate.getFullYear();
    for (let i = 0; i < 12; i++) {
      monthsDrpValues.push(months[currentMonth] + ' - ' + currentYear);
      if (currentMonth == 0) {
        currentMonth = 11;
        currentYear = currentYear - 1;
      } else {
        currentMonth = currentMonth - 1;
      }
    }
    return monthsDrpValues;
  }

  getTableData = (month: number, year: number) => {
    let data: String[][] = [];
    let dates = this.getGivenMonthDates(month, year);
    let times = this.getTimeInterVal();
    for (let dt of dates) {
      let array1 = [];
      for (let time of times) {
        let temp: any = this.apiData.intrvlprices.intrvlprice.filter(x => x.effDate == dt && x.changeIntrvl == time);
        array1.push(temp && temp[0] && temp[0].chargeAmount ? temp[0].chargeAmount : "")
      }
      data.push(array1);
    }
    return data;
  }

  getTimeInterVal = () => {
    let temp: string[] = [];
    for (let i = 1; i <= 24; i++) {
      temp.push((i < 10 ? '0' + i : i) + '.00.00');
    }
    return temp;
  }

  getGivenMonthDates = (month: number, year: number) => {
    let d = new Date(year, month - 1, 1);
    let monthDates: string[] = [];
    for (let i = 1; i <= 31; i++) {
      monthDates.push(`${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`)
      d.setDate(d.getDate() + 1);
      if ((month - 1) != d.getMonth()) {
        break;
      }
    }
    return monthDates;
  }

  apiData: any = {
    "intrvlprices": {
      "serviceSupplierID": "A084",
      "intrvlprice": [
        {
          "effDate": "2022-12-26",
          "changeIntrvl": "01.00.00",
          "chargeAmount": ".0001"
        },
        {
          "effDate": "2022-12-26",
          "changeIntrvl": "10.00.00",
          "chargeAmount": ".0001"
        },
        {
          "effDate": "2022-12-26",
          "changeIntrvl": "13.00.00",
          "chargeAmount": ".0001"
        },
        {
          "effDate": "2022-12-25",
          "changeIntrvl": "13.00.00",
          "chargeAmount": ".0001"
        },
        {
          "effDate": "2022-12-25",
          "changeIntrvl": "02.00.00",
          "chargeAmount": ".0001"
        }
      ]
    }
  }

}

