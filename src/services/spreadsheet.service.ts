import { DriveState } from 'components/DrivePicker';
import { Spreadsheet } from 'models';
import { SpreadSheetProvider } from 'providers/spreadsheet.provider';
import { SpreadSheetTransformer } from 'transformers/spreadsheet.transformer';

export default class SpreadSheetService {
  public onFilePicked(
    setDriveState: (state: any) => void,
    data: any,
    setSpreadsheet: (data: Spreadsheet) => void,
  ) {
    return new Promise((resolve, reject) => {
      setDriveState(data.action);
      if (data.docs && data.docs[0]) {
        new SpreadSheetProvider()
          .provide(data.docs[0].id)
          .then(response => {
            const transformed = new SpreadSheetTransformer().transform(
              response.data
            );
            transformed.embedUrl = data.docs[0].embedUrl;
            setSpreadsheet(transformed);
            resolve(transformed);
          })
          .catch(error => {
            console.log('Error while parsing document', error);
            setDriveState(DriveState.READY);
            reject(null);
          });
      }
    });
  }
}
