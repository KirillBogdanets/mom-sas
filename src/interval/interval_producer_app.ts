import { produceInterval } from "./interval_producer";

produceInterval().catch((err: any) => console.log(err));
