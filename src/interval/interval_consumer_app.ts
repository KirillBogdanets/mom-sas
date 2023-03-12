import { consumeInterval } from "./interval_consumer";

consumeInterval().catch((err: any) => console.log(err));
