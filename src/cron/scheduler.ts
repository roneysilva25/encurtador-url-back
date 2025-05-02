import cron from "node-cron"
import { deletePastValidUrls } from "./cron-jobs/delete-past-valid-urls"

cron.schedule("0 3 * * * *", deletePastValidUrls);
console.log(`[CRON_JOBS] ${new Date().toLocaleTimeString()} Started`)