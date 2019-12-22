import Amplify, { Auth } from '@aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure({
  Auth: {
      // identityPoolId: '', //REQUIRED - Amazon Cognito Identity Pool ID
      region: 'us-west-2', // REQUIRED - Amazon Cognito Region
      userPoolId: 'us-west-2_8AWtwY9xP', //OPTIONAL - Amazon Cognito User Pool ID
      // userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxx', //OPTIONAL - Amazon Cognito Web Client ID
  }
});

export async function getCognitoUsers() {
  // ログイン中のユーザのグループに対応したAWS認証情報を取得する
  const credentials = await Auth.currentCredentials();
  // Cognito User Poolの操作クラスにAWS認証情報を渡して初期化する
  const cognitoServiceProvider = new AWS.CognitoIdentityServiceProvider({
    credentials: Amplify.Auth.essentialCredentials(credentials),
    region: "ap-northeast-1",
  });

  // ユーザプール内のユーザを取得する (AWS認証情報がないと使えない部分)
  const result = await cognitoServiceProvider.listUsers({ UserPoolId: "ap-northeast-1_XXXXXXXX" }).promise();
  const users = result.Users;
  return users;
}

jQuery(function($){
  $('.login-form name="login-submit"').on('click', e => {
      var email = $('.login-form name="email"').val();
      var pw = $('.login-form name="pw"').val();
      Auth.signUp(email, pw)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
  });

  $(#test).on('click', e =>{
    console.log(getCognitoUsers());
  });
});
