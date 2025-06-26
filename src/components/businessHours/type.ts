export interface BusinessHourInput {
  day: string;
  from_1: string | null;
  to_1: string | null;
  from_2?: string | null;
  to_2?: string | null;
}