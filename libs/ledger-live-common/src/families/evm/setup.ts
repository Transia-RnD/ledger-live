// Goal of this file is to inject all necessary device/signer dependency to coin-modules

import { createBridges } from "@ledgerhq/coin-evm/bridge/js";
import makeCliTools from "@ledgerhq/coin-evm/cli-transaction";
import evmResolver from "@ledgerhq/coin-evm/hw-getAddress";
import { prepareMessageToSign, signMessage } from "@ledgerhq/coin-evm/hw-signMessage";
import { Transaction as EvmTransaction } from "@ledgerhq/coin-evm/types/index";
import Eth from "@ledgerhq/hw-app-eth";
import {
  CreateSigner,
  createMessageSigner,
  createResolver,
  executeWithSigner,
} from "../../bridge/setup";
import { Resolver } from "../../hw/getAddress/types";
import Transport from "@ledgerhq/hw-transport";
import { Bridge } from "@ledgerhq/types-live";
import { getCurrencyConfiguration } from "../../config";
import { CryptoCurrency } from "@ledgerhq/types-cryptoassets";
import { EvmConfigInfo } from "@ledgerhq/coin-evm/config";

const createSigner: CreateSigner<Eth> = (transport: Transport) => {
  return new Eth(transport);
};

const getCurrencyConfig = (currency: CryptoCurrency) => {
  return { info: getCurrencyConfiguration<EvmConfigInfo>(currency) };
};

const bridge: Bridge<EvmTransaction> = createBridges(
  executeWithSigner(createSigner),
  getCurrencyConfig,
);

const messageSigner = {
  prepareMessageToSign,
  signMessage: createMessageSigner(createSigner, signMessage),
};

const resolver: Resolver = createResolver(createSigner, evmResolver);

const cliTools = makeCliTools();

export { bridge, cliTools, resolver, messageSigner };
