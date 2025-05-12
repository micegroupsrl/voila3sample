import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
    selector: 'app-client-age',
    templateUrl: './client-age.component.html',
    styleUrls: ['./client-age.component.scss']
})
export class ClientAgeComponent implements OnInit, OnDestroy {
    options!: EChartsOption;
    updateOptions!: EChartsOption;

    private oneDay = 24 * 3600 * 1000;
    private now!: Date;
    private value!: number;
    private data!: DataT[];
    private timer: any;

    ngOnInit(): void {
        // generate some random testing data:
        this.data = [];
        this.now = new Date(2000, 9, 3);
        this.value = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

        for (let i = 0; i < 200; i++) {
            this.data.push(this.randomData());
        }

        // initialize chart options:
        this.options = {
            title: {
                text: 'Storico'
            },
            tooltip: {
                trigger: 'axis',

                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: 'Numero Clienti',
                    type: 'line',
                    showSymbol: false,
                    data: this.data
                }
            ]
        };

        // Mock dynamic data:
        this.timer = setInterval(() => {
            for (let i = 0; i < 5; i++) {
                this.data.shift();
                this.data.push(this.randomData());
            }

            // update series data:
            this.updateOptions = {
                series: [
                    {
                        data: this.data
                    }
                ]
            };
        }, 1000);
    }

    ngOnDestroy() {
        clearInterval(this.timer);
    }

    randomData(): DataT {
        this.now = new Date(this.now.getTime() + this.oneDay);
        this.value = this.value + Math.random() * 21 - 10;
        return {
            name: this.now.toString(),
            value: [[this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'), Math.round(this.value)]
        };
    }
}

type DataT = {
    name: string;
    value: [string, number];
};
