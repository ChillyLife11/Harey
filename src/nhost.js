import { NhostClient } from "@nhost/vue";
import config from "@/config.js";

export const nhost = new NhostClient({
  subdomain: config.NHOST.SUBDOMAIN,
  region: config.NHOST.REGION
});