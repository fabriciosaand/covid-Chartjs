import { Component, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { DatePipe } from "@angular/common";
import { ApiService, Covid } from "./api.service";
import { MaterialsModule } from "./material";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";
  covid: Covid[];
  error: any;

  @ViewChild("meuCanvas", { static: true }) elemento: ElementRef;

  constructor(public datepipe: DatePipe, private apiService: ApiService) {}

  datas = [];
  confirmados = [];
  mortos = [];
  recuperados = [];

  Ma

  showConfig() {
    this.apiService.getCovid().subscribe(
      data => {
        this.covid = data;
        this.covid.forEach(covid => {
          this.datas.push(this.datepipe.transform(covid.Date, "dd-MM-yyyy"));
          this.confirmados.push(covid.Confirmed);
          this.mortos.push(covid.Deaths);
          this.recuperados.push(covid.Recovered);
          console.log(covid);
        });
        console.log(this.datas);
        console.log(this.covid);
        this.showGrafic();
      },
      error => (this.error = error)
    );
  }

  showGrafic() {
    new Chart(this.elemento.nativeElement, {
      type: "line",
      data: {
        labels: this.datas,
        datasets: [
          {
            label: 'Confirmados',
            data: this.confirmados,
            borderColor: "#0000FF",
            fill: false
          },
          {
            label: 'Mortos',
            data: this.mortos,
            borderColor: "#FF0000",
            fill: false
          },
          {
            label: 'Recuperados',
            data: this.recuperados,
            borderColor: "#00ff00",
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    });
  }

  ngOnInit() {
    this.showConfig();
  }
}
