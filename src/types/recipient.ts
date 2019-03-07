import { EmailMeta } from './email';
import { Nullable } from './nullable';

export interface Recipient {
  email: string;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  data: EmailMeta;
}
