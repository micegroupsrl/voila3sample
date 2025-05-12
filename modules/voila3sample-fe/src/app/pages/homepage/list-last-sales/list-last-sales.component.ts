import { Component } from '@angular/core';

@Component({
    selector: 'app-list-last-sales',
    templateUrl: './list-last-sales.component.html',
    styleUrls: ['./list-last-sales.component.scss']
})
export class ListLastSalesComponent {
    displayedColumns: string[] = ['product', 'price', 'date'];
    public salesList = SALES;
}

export const SALES = [
    {
        product: 'Samsung Galaxy S10',
        price: '299,00€',
        date: '1 minuto fa'
    },
    {
        product: 'Samsung Galaxy S21',
        price: '1.100,70€',
        date: '2 minuti fa'
    },
    {
        product: 'Samsung Galaxy S21',
        price: '1.100,70€',
        date: '2 minuti fa'
    },
    {
        product: 'Lenovo tab +11 pro',
        price: '820,00€',
        date: '15 minuti fa'
    },
    {
        product: 'Huawei MatePad pro',
        price: '635,00€',
        date: '20 minuti fa'
    },
    {
        product: 'Video Dorbell wired',
        price: '59,00€',
        date: '35 minuti fa'
    },
    {
        product: 'Video Dorbell wired +',
        price: '79,00€',
        date: '40 minuti fa'
    },
    {
        product: 'Apple iPad pro ',
        price: '579,00€',
        date: '50 minuti fa'
    }
];
