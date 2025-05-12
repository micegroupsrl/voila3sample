import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
    selector: 'app-order-chart',
    styleUrls: ['./order-chart.component.scss'],
    templateUrl: './order-chart.component.html'
})
export class OrderChartComponent implements OnInit {
    options!: EChartsOption;

    ngOnInit(): void {
        const xAxisData = [];
        const data1 = [];
        const data2 = [];
        const months = ['Dicembre', 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre'];

        for (let i = 0; i < 12; i++) {
            xAxisData.push(months[i]);
            data1.push((Math.sin(i / 2) * (i / 5 - 1) + i / 6) * 10);
            data2.push((Math.cos(i / 2) * (i / 5 - 1) + i / 6) * 20);
        }

        this.options = {
            legend: {
                data: ['utile', 'fatturato'],
                align: 'left'
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0
                },
                name: 'Mesi',
                nameLocation: 'middle',
                nameGap: 50
            },
            yAxis: {
                axisLabel: {
                    formatter: '{value} %'
                },
                name: 'Percentuale Crescita',
                nameLocation: 'middle',
                nameGap: 50
            },
            series: [
                {
                    name: 'utile',
                    type: 'bar',
                    data: data1,
                    animationDelay: idx => idx * 10
                },
                {
                    name: 'fatturato',
                    type: 'bar',
                    data: data2,
                    animationDelay: idx => idx * 10 + 100
                }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: idx => idx * 5
        };
    }
}
