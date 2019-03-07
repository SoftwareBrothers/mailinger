import { AxiosInstance } from 'axios';
import client from '../config/google.client';

export class SpreadSheetProvider {
  protected client: AxiosInstance;
  protected uri: string;

  public constructor() {
    this.uri = `https://sheets.googleapis.com/v4/spreadsheets`;
    this.client = client;
  }

  public provide(id: string) {
    return this.client.get(`${this.uri}/${id}?includeGridData=true`);
  }
}
