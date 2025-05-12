import { springFilterLocaleDate, springFilterLocaleDateTime } from './helper';

export const TIME: string = 'time',
    DATETIME: string = 'datetime';
export class FilterBuilder {
    private filter: string[] = [];

    // AND

    andEquals(property: string, value: any): this {
        return this.apply(value, property, ' : ');
    }
    andNotEquals(property: string, value: any): this {
        return this.apply(value, property, ' ! ');
    }
    andLike(property: string, value: any): this {
        if (value) {
            this.and();
            this.filter.push(property, ' ~ ', this.wrapValue('%' + value + '%'));
        }
        return this;
    }
    andBetween(property: string, startValue: any, endValue: any, dateType?: string): this {
        if (startValue) {
            this.andGreaterOrEqual(property, startValue, dateType);
        }
        if (endValue) {
            this.andLessOrEqual(property, endValue, dateType);
        }
        return this;
    }
    andGreaterOrEqual(property: string, value: any, dateType?: string): this {
        return this.apply(value, property, ' >: ', dateType);
    }
    andLessOrEqual(property: string, value: any, dateType?: string): this {
        return this.apply(value, property, ' <: ', dateType);
    }
    andIn(property: string, values: string[]): this {
        if (values) {
            this.and();
            this.filter.push(property, ' in ');
            let sep = '(';
            values.forEach(element => {
                this.filter.push(sep, this.wrapValue(element));
                sep = ',';
            });
            this.filter.push(')');
        }
        return this;
    }

    apply(value: any, property: string, op: string, dateType?: string) {
        if (value != undefined) {
            this.and();
            this.filter.push(property, op, this.wrapValue(value, dateType));
        }
        return this;
    }

    and(): this {
        if (this.filter.length > 0) {
            this.filter.push(' and ');
        }
        return this;
    }

    // OR

    orEquals(property: string, value: any): this {
        return this.applyOr(value, property, ' : ');
    }
    orNotEquals(property: string, value: any): this {
        return this.applyOr(value, property, ' ! ');
    }
    orLike(property: string, value: any): this {
        if (value) {
            this.or();
            this.filter.push(property, ' ~ ', this.wrapValue('%' + value + '%'));
        }
        return this;
    }
    orBetween(property: string, startValue: any, endValue: any, dateType?: string): this {
        if (startValue) {
            this.orGreaterOrEqual(property, startValue, dateType);
        }
        if (endValue) {
            this.orLessOrEqual(property, endValue, dateType);
        }
        return this;
    }
    orGreaterOrEqual(property: string, value: any, dateType?: string): this {
        return this.applyOr(value, property, ' >: ', dateType);
    }
    orLessOrEqual(property: string, value: any, dateType?: string): this {
        return this.applyOr(value, property, ' <: ', dateType);
    }
    orIn(property: string, values: string[]): this {
        if (values) {
            this.or();
            this.filter.push(property, ' in ');
            let sep = '(';
            values.forEach(element => {
                this.filter.push(sep, this.wrapValue(element));
                sep = ',';
            });
            this.filter.push(')');
        }
        return this;
    }

    applyOr(value: any, property: string, op: string, dateType?: string) {
        if (value) {
            this.or();
            this.filter.push(property, op, this.wrapValue(value, dateType));
        }
        return this;
    }

    or(): this {
        if (this.filter.length > 0) {
            this.filter.push(' or ');
        }
        return this;
    }

    value(): string {
        return this.filter.join('');
    }

    wrapValue(value: any, dateType?: string): string {
        if (typeof value == 'string') {
            return "'" + value + "'";
        }
        if (value instanceof Date) {
            if (dateType == 'time') {
                return "'";
            }
            if (dateType == 'datetime') {
                return "'" + springFilterLocaleDateTime(value) + "'";
            }
            return "'" + springFilterLocaleDate(value) + "'";
        }
        return value.toString();
    }
}
