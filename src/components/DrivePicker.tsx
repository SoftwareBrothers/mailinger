import React, { useContext } from 'react';
import GooglePicker from 'react-google-picker';
import { UserCtx } from 'src/contexts/user.context';
import { IUser } from 'src/types';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID || '';
const DEVELOPER_KEY = process.env.REACT_APP_DEVELOPER_KEY || '';

function transformSpreadsheetData(data: any) {
  const arrayLike = data.sheets[0].data[0].rowData.map((row: any) => {
    return row.values ? row.values.map((v:any) => v.formattedValue) : [];
  });

  const valuesWithoutEmpties = arrayLike.filter((row: any[]) => !row.every((v: any) => !v))
  const title = valuesWithoutEmpties[0].join('');
  const variables = valuesWithoutEmpties[4];
  const rawUsers = valuesWithoutEmpties.slice(5, valuesWithoutEmpties.length - 1);

  const usersWithVars = rawUsers.map((user: any) => {
    const transformedUserObject = {};
    user.map((userValue: any, index: number) => {
      if (variables[index]) {
        transformedUserObject[variables[index]] = userValue
      }
    })
    return transformedUserObject
  });

  return {
    title,
    usersData: usersWithVars,
    variables,
  }
}

const pickerOnChange = (data: any, user: IUser) => {
  if(data.docs && data.docs[0]) {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${data.docs[0].id}?includeGridData=true`,
      { headers: {
        'Authorization': `Bearer ${user.token.accessToken}`}
      }
    )
      .then(response => response.json())
      .then((responseData) => {
        const transformed = transformSpreadsheetData(responseData)
        console.log(transformed);
      })
      .catch((error) => {
        console.log('Error while parsing document', error);
      })

  }
}

const pickerOnAuthFailed = (error: any) => {
  console.log('Picker auth failed error:', error);
}

const drivePicker = () => {
  const [user] = useContext(UserCtx);
  return (
  <div>
    <GooglePicker
      clientId={CLIENT_ID}
      developerKey={DEVELOPER_KEY}
      scope={['https://www.googleapis.com/auth/drive']}
      onChange={(data) => { pickerOnChange(data, user) }}
      onAuthFailed={pickerOnAuthFailed}
    ><button>pick</button></GooglePicker>
  </div>
)};

export default drivePicker;