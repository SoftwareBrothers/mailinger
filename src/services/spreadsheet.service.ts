import { SpreadSheetProvider } from 'src/providers/spreadsheet.provider';
import { SpreadSheetTransofrmer } from 'src/transformers/spreadsheet.transformer';
import { ISpreadsheet } from 'src/types';

export default class SpreadSheetService {
  public onFilePicked(data: any, setSpreadsheet: (data: ISpreadsheet) => void) {
    return new Promise((resolve, reject) => {
      if (data.docs && data.docs[0]) {
        new SpreadSheetProvider()
          .provide(data.docs[0].id)
          .then(response => {
            const transformed = new SpreadSheetTransofrmer().transform(
              response.data,
            );
            transformed.embedUrl = data.docs[0].embedUrl;
            setSpreadsheet(transformed);
            resolve(transformed);
          })
          .catch(error => {
            console.log('Error while parsing document', error);
            reject(null);
          });
      }
    });
  }
}
