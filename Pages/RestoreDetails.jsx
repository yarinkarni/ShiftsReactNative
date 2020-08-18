import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ImageBackground, Image } from 'react-native';
import img from '../assets/backgroundImg.jpg';
import X from '../assets/restoreemail.png';
let urlWorkers = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/api/worker';


export default class RestoreDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailText: '',
      passwordText: null
    };
  }

  btnMoveToLoginPage = () => {
    let obj2Send = {
      "WorkerID": 0,
      "Name": "",
      "FamilyName": "",
      "WorkerType": "",
      "Email": this.state.emailText,
      "PhoneNumber": "",
      "Address": "",
      "BirthdayDate": "",
      "Password": this.state.passwordText,
      "PermissionType": ""
    }
    fetch(urlWorkers,
      {
        method: 'PUT',
        body: JSON.stringify(obj2Send),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      }) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => {
        if (resp.status === 200) {
          alert("הסיסמא עודכנה בהצלחה !")
          this.props.navigation.navigate('LoginPage');
        }
        else if (resp.status === 400) {
          console.log("BadRequest");
        }
        else {
          console.log("NotFound");
        }
      }) // Transform the data into json
      .catch(function (err) {
        alert(err);
      });
  }

  txtchgPassword = (passwordText) => {
    this.setState({ passwordText });
  }

  txtchgEmail = (emailText) => {
    this.setState({ emailText });
  }
  render() {
    const { txtchgEmail, txtchgPassword, btnMoveToLoginPage } = this;
    const { emailText, passwordText } = this.state;
    return (
      <ImageBackground source={img} style={styles.container}>
        <Text style={styles.Topic}>Reset password</Text>
        <View style={styles.inner}>
          <View style={{ width: 190, height: 80, flexDirection: "row", justifyContent: 'space-between' }}>
            <Image source={X} style={{ width: 50, height: 50 }} />
            <Image source={X} style={{ width: 50, height: 50 }} />
            <Image source={X} style={{ width: 50, height: 50 }} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Please Enter Your Email"
              placeholderTextColor="#000000"
              underlineColorAndroid='transparent'
              value={emailText} onChangeText={(text) => { txtchgEmail(text) }} placeholder="Please Enter Your Email" />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Please Enter Your new password"
              secureTextEntry={true}
              placeholderTextColor="#000000"
              underlineColorAndroid='transparent'
              value={passwordText} onChangeText={(text) => { txtchgPassword(text) }} placeholder="Please Enter Your new password" />
          </View>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={btnMoveToLoginPage}>
            <Text style={styles.loginText}>Reset password</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    height: "105%",
    width: "100%"
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold'
  },
  inner: {
    width: '70%',
    height: '50%',
    backgroundColor: 'rgba(255,255,255,.7)',
    alignItems: "center",
    justifyContent: "center"
  },
  RestoreDetails: {
    paddingBottom: 30,
    fontSize: 22,
    fontWeight: "bold",
    color: "#8A2BE2"
  },
  Topic: {
    paddingBottom: 25,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFFFFF'
  }
});
