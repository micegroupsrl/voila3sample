export interface BaseApiResponse<T> extends ApiGenericResponse<T> {
    response: T;
}

export interface ApiGenericResponse<T> {
    content: T;
    size?: number;
    totalElements?: number;
    totalPages?: number;
    numberOfElements?: number;
}
