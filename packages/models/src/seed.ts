import { Currency, PrismaClient } from "@prisma/client";
import { hash } from "@timeismoney/security/dist";
const prisma = new PrismaClient();
import dotenv from "dotenv";

dotenv.config();

async function createCurrency(
  name: string,
  symbol: string,
  id: number,
  is_crypto: boolean,
  image_url: string,
): Promise<Currency> {
  return prisma.currency.upsert({
    where: { symbol: symbol },
    update: {},
    create: {
      name: name,
      symbol: symbol,
      api_id: id,
      is_crypto: is_crypto,
      image_url: image_url,
    },
  });
}

async function createFiatCurrency(
  name: string,
  symbol: string,
  id: number,
  image_url: string,
): Promise<Currency> {
  return createCurrency(name, symbol, id, false, image_url);
}

async function createCryptoCurrency(
  name: string,
  symbol: string,
  id: number,
  image_url: string,
): Promise<Currency> {
  return createCurrency(
    name,
    symbol,
    id,
    true,
    "https://www.cryptocompare.com/" + image_url,
  );
}

async function seedCurrencies(): Promise<Currency> {
  const defaultCurrency = createFiatCurrency(
    "Euro (EUR)",
    "EUR",
    1748,
    "https://resources.cryptocompare.com/asset-management/1748/1674482812577.png",
  );
  await createFiatCurrency(
    "US Dollar (USD)",
    "USD",
    5,
    "https://resources.cryptocompare.com/asset-management/5/1661245162644.png",
  );
  await createCryptoCurrency(
    "Bitcoin (BTC)",
    "BTC",
    1182,
    "/media/37746251/btc.png",
  );
  await createCryptoCurrency(
    "Dogecoin (DOGE)",
    "DOGE",
    4432,
    "/media/37746339/doge.png",
  );
  await createCryptoCurrency(
    "Memecoin (MEME)",
    "MEME",
    954076,
    "/media/44154224/meme.png",
  );
  await createCryptoCurrency(
    "Ethereum (ETH)",
    "ETH",
    7605,
    "/media/37746238/eth.png",
  );
  await createCryptoCurrency(
    "Solana (SOL)",
    "SOL",
    934443,
    "/media/37747734/sol.png",
  );
  return defaultCurrency;
}

async function createUser(
  firstname: string,
  lastname: string,
  nickname: string,
  email: string,
  password: string,
  currency: Currency,
  role: "ADMIN" | "CLIENT",
) {
  return prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      firstname: firstname,
      lastname: lastname,
      nickname: nickname,
      email: email,
      password: password,
      refresh: "",
      currencyId: currency.id,
      role: role,
    },
  });
}

async function seedUsers(defaultConversionCurrency: Currency) {
  await createUser(
    "admin",
    "admin",
    "admin",
    "admin@timeismoney.com",
    await hash(process.env.ADMIN_PASSWORD ?? "password"),
    defaultConversionCurrency,
    "ADMIN",
  );
  if (process.env.NODE_ENV === "production") {
    return;
  }
  await createUser(
    "user",
    "user",
    "user",
    "user@timeismoney.com",
    await hash("password"),
    defaultConversionCurrency,
    "CLIENT",
  );
}

async function main() {
  const defCurrency = await seedCurrencies();
  return seedUsers(defCurrency);
}

export async function mainSeed() {
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

mainSeed();
