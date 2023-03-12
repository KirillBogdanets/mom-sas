import { toMOMUpperCase } from './upper_case_client';

const message = process.argv.pop() || 'Please tell me something...';
toMOMUpperCase(message).catch((err: any) => console.log(err))
