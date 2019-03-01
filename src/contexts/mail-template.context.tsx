import { createContext } from 'react';
import { mailContent } from '../seeds/mail'

export const MailTemplateCtx = createContext(mailContent);