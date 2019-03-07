import { EmailMeta } from './EmailMeta';
import { Nullable } from './Nullable';

export interface Recipient {
  email: string;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  data: EmailMeta;
}
