import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';
import { HourlyForecast } from '../interfaces/HourlyForecast';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
})
export class WeatherChartComponent implements OnChanges {
  @Input() hourlyData: HourlyForecast[] = [];
  @Input() parameter = 'temp';

  private chart: echarts.ECharts | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hourlyData'] || changes['parameter']) {
      this.updateChart();
    }
  }

  updateChart() {
    const chartDom = document.getElementById('chart')!;

    if (this.chart) {
      this.chart.dispose();
    }

    this.chart = echarts.init(chartDom);

    const xData = this.hourlyData.map((data) =>
      new Date(data.time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    const yData = this.hourlyData.map((data) => {
      switch (this.parameter) {
        case 'temp':
          return data.temp_c;
        case 'pressure':
          return data.pressure_mb;
        case 'humidity':
          return data.humidity;
        default:
          return 0;
      }
    });

    const option = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: yData,
          type: 'line',
          smooth: true,
        },
      ],
    };

    this.chart.setOption(option);
  }
}
