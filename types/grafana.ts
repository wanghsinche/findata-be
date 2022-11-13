export interface DataFrame {
    name?: string;
    // reference to query that create the frame
    refId?: string;

    fields: Field[];
}
export interface Field {
    name: string;
    // Prometheus like Labels / Tags
    labels?: Record<string, string>;

    // For example string, number, time (or more specific primitives in the backend)
    type: FieldType;
    // Array of values all of the same type
    values: number | string | boolean | null;

}

type FieldType = 'number' | 'string' | 'time'
