// export all types from this file
// prefer interfaces over types since they are more flexible and can be extended

// all types will be mostly composed of strings, numbers and booleans for simplicity sake
// proper types will be used in the database

export interface TicketCardInterface {
    is_closed: boolean;
    email: string;
    heading: string;
    content: string;
    timestamp: string;
    ticket_id: number;
    closed_at?: string | null; // it will be a timestamp with timezon in the backend
}
