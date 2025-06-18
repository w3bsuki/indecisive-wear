import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function minimalSeed({ container }: ExecArgs) {
  const logger = container.resolve("logger");
  
  try {
    logger.info("Starting minimal seed...");
    
    // Create default store
    const storeModuleService = container.resolve(Modules.STORE);
    const stores = await storeModuleService.listStores();
    
    if (!stores.length) {
      await storeModuleService.createStores({
        name: "Indecisive Wear Store",
        supported_currencies: [
          { currency_code: "usd", is_default: true },
          { currency_code: "eur" },
          { currency_code: "bgn" },
          { currency_code: "gbp" }
        ]
      });
      logger.info("Created default store");
    }

    // Create default sales channel
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const channels = await salesChannelModuleService.listSalesChannels({
      name: "Default Sales Channel"
    });

    if (!channels.length) {
      await salesChannelModuleService.createSalesChannels({
        name: "Default Sales Channel",
        description: "Default sales channel for Indecisive Wear"
      });
      logger.info("Created default sales channel");
    }

    logger.info("Minimal seed completed successfully!");
  } catch (error) {
    logger.error("Error during minimal seed:", error);
    // Don't throw - allow the process to continue
  }
}