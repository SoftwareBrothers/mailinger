import { Sheet, Spreadsheet } from 'models';

export class SpreadSheetTransformer {

  public transform(data: any): Spreadsheet {
    const transformedSheets = new Array();
    const sheets = data.sheets;
    for (const sheet of sheets) {
      const transformedSheet = this.transformSheet(sheet);
      transformedSheets.push(transformedSheet);
    }

    return {
      sheets: transformedSheets
    };
  }


  private transformSheet(sheet: any): Sheet {
    const arrayLike = sheet.data[0].rowData.map((row: any) => {
      return row.values ? row.values.map((v: any) => v.formattedValue) : [];
    });

    const valuesWithoutEmpties = arrayLike.filter(
      (row: any[]) => !row.every((v: any) => !v),
    );

    const title = this.getTitle(valuesWithoutEmpties);
    const variables = this.getVariables(valuesWithoutEmpties);
    const rawUsers = this.getRawUsers(valuesWithoutEmpties);

    const usersWithVars = rawUsers.map((userValues: any) => {
      const transformedUserObject = { title };
      userValues.map((userValue: any, index: number) => {
        if (variables[index]) {
          // @ts-ignore
          transformedUserObject[variables[index]] = userValue || '0';
        }
      });
      // @ts-ignore
      transformedUserObject.send = true;
      return transformedUserObject;
    });

    return {
      title: sheet.properties.title,
      usersData: usersWithVars,
      variables: ['title'].concat(variables)
    };
  }

  private getTitle(valuesWithoutEmpties: any) {
    return valuesWithoutEmpties[0].join('');
  }

  private getVariables(valuesWithoutEmpties: any) {
    return valuesWithoutEmpties[4];
  }

  private getRawUsers(valuesWithoutEmpties: any) {
    return valuesWithoutEmpties.slice(5, valuesWithoutEmpties.length);
  }
}
