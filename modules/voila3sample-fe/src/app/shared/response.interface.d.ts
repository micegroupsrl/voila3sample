import { ApiGenericResponse } from './base/base.response';

export interface ApiResponse<T> extends ApiGenericResponse<T> {
    response: T;
}
export interface ApiListResponse<T, V> extends ApiGenericResponse<T> {
    response: Embedded<V>;
}
export interface Embedded<T> {
    _embedded: T;
}
