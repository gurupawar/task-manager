export interface Task{
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

// ---
// **TypeScript Learning Moment:**
// - `interface` defines the "shape" of an object
// - It's like a contract: any Task MUST have these exact properties
// - `export` lets us use this interface in other files
// ---