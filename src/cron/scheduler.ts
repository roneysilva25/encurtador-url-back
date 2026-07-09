import cron from "node-cron"
import { deletePastValidUrls } from "./cron-jobs/delete-past-valid-urls"

cron.schedule("0 3 * * * *", () => deletePastValidUrls().catch((reason) => console.error("Cron job failed", { err: reason })));
console.log(`[CRON_JOBS] ${new Date().toLocaleTimeString()} Started`)