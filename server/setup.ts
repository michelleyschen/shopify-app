import 'isomorphic-fetch';
import * as dotenv from 'dotenv';

// Sewing Kit is currently hardcoding this on the server, which breaks
// children modules that depend on knowing the real environment.
const nodeEnv = 'NODE_ENV';
process.env[nodeEnv] = process.env.NODE_ENV;

dotenv.config();
