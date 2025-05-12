import { HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { FormArray, FormGroup } from '@angular/forms';
import { PageObject } from 'src/app/shared/page-object.interface';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * Convert value into date object.
 *
 * @author Federico Gambardella<federico.gambardella@micegroup.it>
 * @param value
 * @returns
 */
export function convertIntoDate(value: string): any {
    if (value) return new Date(value);
    return value;
}

/**
 * Convert date in standard format.
 *
 * @author Federico Gambardella<federico.gambardella@micegroup.it>
 * @param date
 * @returns
 */
export function toStandardDate(date: Date): string {
    if (date) return formatDate(date, "yyyy-MM-dd'T'HH:mm:ss", 'en');
    else return '';
}

/**
 * Set options for pagination and filter.
 *
 * @author Federico Gambardella<federico.gambardella@micegroup.it>
 * @param pageObject
 * @param filter
 * @returns
 */
export function setOptions(pageObject: PageObject, filter?: string): HttpParams {
    filter = filter ? filter : '';
    let options = new HttpParams(); //
    options = setOptionValue('filter', options, filter);
    options = setOptionValue('page', options, pageObject.page);
    options = setOptionValue('size', options, pageObject.pageSize);
    if (pageObject.columnName && pageObject.sortDirection) {
        options = setOptionValue('sort', options, pageObject.columnName + ',' + pageObject.sortDirection);
    }
    return options;
}

/**
 * Set value of single option
 *
 * @author Maria Manuela Carretta<maria.carretta@micegroup.it>
 * @param key
 * @param options
 * @param value
 * @returns
 */
export function setOptionValue(key: string, options: HttpParams, value?: string | number): HttpParams {
    if (value) {
        options = options.set(key, value);
    }
    return options;
}

/**
 * Stringify local date for spring filter library.
 *
 * @author Federico Gambardella<federico.gambardella@micegroup.it>
 * @param date
 * @returns
 */
export function springFilterLocaleDate(date: Date): string {
    return formatDate(date, 'dd-MM-yyyy', 'en');
}

/**
 * Stringify date time for spring filter library.
 *
 * @author Federico Gambardella<federico.gambardella@micegroup.it>
 * @param date
 * @returns
 */
export function springFilterLocaleDateTime(date: Date): string {
    return formatDate(date, "dd-MM-yyyy'T'HH:mm:ss", 'en');
}

/**
 * Convert date in standard format.
 *
 * @author Federico Gambardella<federico.gambardella@micegroup.it>
 * @param date
 * @returns
 */
export function getDateFromTime(time: string): any {
    if (time) {
        let newDate = new Date('2023-01-01T' + time);
        return newDate;
    } else return time;
}

/* 
   Returns an array of invalid control/group names, or a zero-length array if 
   no invalid controls/groups where found 
*/
export function findInvalidControlsRecursive(formToInvestigate: FormGroup | FormArray, log?: boolean): object[] {
    let invalidControls: object[] = [];
    let recursiveFunc = (form: FormGroup | FormArray) => {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control && control.invalid) {
                const fieldObject = { name: field, control: control };
                invalidControls.push(fieldObject);
                if (log) {
                    console.log('invalid form control:', fieldObject);
                }
            }
            if (control instanceof FormGroup || control instanceof FormArray) {
                recursiveFunc(control);
            }
        });
    };
    recursiveFunc(formToInvestigate);
    return invalidControls;
}

export function formatTimeAsString(time: NgbTimeStruct): string {
    return padWithZero(time.hour) + ':' + padWithZero(time.minute) + ':' + padWithZero(time.second);
}

export function padWithZero(value: number): string {
    return value < 10 ? '0' + value : value + '';
}

export function sortFormArray(array: any, args: string, type: string) {
    if (array !== undefined) {
        return array.controls.sort((a: any, b: any) => {
            const aValue = a.controls[args].value;
            const bValue = b.controls[args].value;
            let condition1 = aValue > bValue;
            let condition2 = aValue < bValue;
            if (type === 'asc') {
                condition1 = aValue < bValue;
                condition2 = aValue > bValue;
            }
            if (condition1) {
                return -1;
            } else if (condition2) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    return array;
}
