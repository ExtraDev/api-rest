export function wrapQueryResult<T>([rows]: any): T | undefined {
    return (rows.length > 0) ? (rows[0] as T) : undefined;
}

export function wrapQueryResults<T>([rows]: any): Array<T> {
    return (rows.length > 0) ? (rows as Array<T>) : new Array<T>();
}