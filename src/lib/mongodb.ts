import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL as string; // get from .env.local
const options = {};
        
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// In dev, use a global var so hot reloads don’t create new clients
if (!(global as any)._mongoClientPromise) {
  client = new MongoClient(uri, options);
  (global as any)._mongoClientPromise = client.connect();
}
clientPromise = (global as any)._mongoClientPromise;

export default clientPromise;
