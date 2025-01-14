import axios, { AxiosError } from "axios";

const CRYPTO_ASSETS_BASE_URL = "https://cdn.live.ledger.com/cryptoassets";

export const fetchTokens = async <T>(filename: string): Promise<[T, string | undefined]> => {
  try {
    const { data, headers } = await axios.get<T>(`${CRYPTO_ASSETS_BASE_URL}/${filename}`);
    return [data, headers.etag];
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(`${error.message} ${CRYPTO_ASSETS_BASE_URL}/${filename}`);
  }
};
