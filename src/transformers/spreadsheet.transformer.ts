import { ISpreadsheet } from 'src/types/spreadsheet';

export class SpreadSheetTransformer {
  public transform(data: any): ISpreadsheet {
    const arrayLike = data.sheets[0].data[0].rowData.map((row: any) => {
      return row.values ? row.values.map((v: any) => v.formattedValue) : [];
    });

    const valuesWithoutEmpties = arrayLike.filter(
      (row: any[]) => !row.every((v: any) => !v),
    );

    const title = valuesWithoutEmpties[0].join('');
    const variables = valuesWithoutEmpties[4];
    const rawUsers = valuesWithoutEmpties.slice(5, valuesWithoutEmpties.length);

    const usersWithVars = rawUsers.map((userValues: any) => {
      const transformedUserObject = { title };
      userValues.map((userValue: any, index: number) => {
        if (variables[index]) {
          transformedUserObject[variables[index]] = userValue || '0';
        }
      });
      transformedUserObject.send = true;
      return transformedUserObject;
    });

    return {
      usersData: usersWithVars,
      variables: ['title'].concat(variables),
    };
  }
}
