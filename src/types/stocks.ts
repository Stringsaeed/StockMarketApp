import {z} from 'zod';

export const StockSchema = z.object({
  share_class_figi: z.string().optional(),
  composite_figi: z.string().optional(),
  primary_exchange: z.string(),
  last_updated_utc: z.string(),
  cik: z.string().optional(),
  currency_name: z.string(),
  active: z.boolean(),
  ticker: z.string(),
  market: z.string(),
  locale: z.string(),
  name: z.string(),
  type: z.string(),
});

export type Stock = z.infer<typeof StockSchema>;

export const StockResponseSchema = z.object({
  next_url: z.string().optional(),
  results: z.array(StockSchema),
  request_id: z.string(),
  status: z.string(),
  count: z.number(),
});

export type StockResponse = z.infer<typeof StockResponseSchema>;
