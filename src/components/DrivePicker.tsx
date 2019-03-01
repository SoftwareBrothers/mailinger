import { Button, Grid } from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';
import React, { useContext, useState } from 'react';
import GooglePicker from 'react-google-picker';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { UserCtx } from 'src/contexts/user.context';
import { IUser } from 'src/types';
import { ISpreadsheet } from 'src/types/spreadsheet';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID || '';
const DEVELOPER_KEY = process.env.REACT_APP_DEVELOPER_KEY || '';

function transformSpreadsheetData(data: any) {
  const arrayLike = data.sheets[0].data[0].rowData.map((row: any) => {
    return row.values ? row.values.map((v: any) => v.formattedValue) : [];
  });

  const valuesWithoutEmpties = arrayLike.filter(
    (row: any[]) => !row.every((v: any) => !v),
  );
  const title = valuesWithoutEmpties[0].join('');
  const variables = valuesWithoutEmpties[4];
  const rawUsers = valuesWithoutEmpties.slice(
    5,
    valuesWithoutEmpties.length - 1,
  );

  const usersWithVars = rawUsers.map((userValues: any) => {
    const transformedUserObject = { title };
    userValues.map((userValue: any, index: number) => {
      if (variables[index]) {
        transformedUserObject[variables[index]] = userValue || '0';
      }
    });
    return transformedUserObject;
  });

  return {
    usersData: usersWithVars,
    variables: ['title'].concat(variables),
  }
}

const pickerOnChange = (
  data: any,
  user: IUser,
  setSpreadsheet: (data: ISpreadsheet) => void,
) => {
  if (data.docs && data.docs[0] && user && user.token) {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${
        data.docs[0].id
      }?includeGridData=true`,
      {
        headers: {
          Authorization: `Bearer ${user.token.accessToken}`,
        },
      },
    )
      .then(response => response.json())
      .then(responseData => {
        const transformed = transformSpreadsheetData(responseData);
        setSpreadsheet(transformed);
        console.log(transformed);
      })
      .catch(error => {
        console.log('Error while parsing document', error);
      });
  }
};

const pickerOnAuthFailed = (error: any) => {
  console.log('Picker auth failed error:', error);
};

const drivePicker = () => {
  const [user] = useContext(UserCtx);
  const [embedLink, setEmbedLink] = useState(null);
  const [, setSpreadsheet] = useContext(SpreadsheetCtx);

  const onChange = (data: any) => {
    if (data.docs && data.docs[0]) {
      setEmbedLink(data.docs[0].embedUrl);
    }
    pickerOnChange(data, user, setSpreadsheet);
  };

  const renderEmbed = () => {
    if (embedLink) {
      return <embed style={{ width: '90%', minHeight: 550, marginTop: 25}} src={embedLink} />;
    }
    return null;
  };
  return (
    <Grid item={true} xs={12} style={{ textAlign: 'center', padding: 'auto' }}>
      <GooglePicker
        clientId={CLIENT_ID}
        developerKey={DEVELOPER_KEY}
        scope={['https://www.googleapis.com/auth/drive']}
        onChange={onChange}
        onAuthFailed={pickerOnAuthFailed}
      >
        <Button variant="contained" size="large">
          <StorageIcon style={{ marginRight: 20 }} />
          Select File
        </Button>
      </GooglePicker>
      {renderEmbed()}
    </Grid>
  );
};

export default drivePicker;
