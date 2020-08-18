import React from 'react';
import { ScrollView, Image, TextInput, View, Text, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native'
import img from '../assets/signupicon1313.png';
import background from '../assets/backgroundImg.jpg';

let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/api/worker';
export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      familyName: '',
      workerType: '',
      email: '',
      phoneNumber: '',
      address: '',
      birthdayDate: '',
      Password: '',
      permissionType: ''
    };
  }


  txtchgName = (name) => {
    this.setState({ name });
  }
  txtchgFamilyName = (familyName) => {
    this.setState({ familyName });
  }
  txtchgWorkerType = (workerType) => {
    this.setState({ workerType });
  }
  txtchgEmail = (email) => {
    this.setState({ email });
  }
  txtchgPhoneNumber = (phoneNumber) => {
    this.setState({ phoneNumber });
  }
  txtchgAddress = (address) => {
    this.setState({ address });
  }
  txtchgBirthdayData = (birthdayDate) => {
    this.setState({ birthdayDate });
  }
  txtchgPassword = (Password) => {
    this.setState({ Password });
  }
  txtchgPermissionType = (permissionType) => {
    this.setState({ permissionType });
  }




  btnAddWorker = async () => {
    let s = await this.AddWorker(this.state.name, this.state.familyName, this.state.workerType, this.state.email, this.state.phoneNumber, this.state.address
      , this.state.birthdayDate, this.state.Password, this.state.permissionType);
    if (s === null) {
      alert("Register Faild");
    }
    else {
      this.props.navigation.navigate('UserShifts', { user: s });

    }
  }


  AddWorker = async (Name, FamilyName, WorkerType, Email, PhoneNumber, Address, BirthdayDate, Password, PermissionType) => {
    let returnedObj = null;
    let obj2Send = {
      "ID": 0,
      "Name": Name,
      "FamilyName": FamilyName,
      "WorkerType": WorkerType,
      "Name": Name,
      "Email": Email,
      "PhoneNumber": PhoneNumber,
      "Address": Address,
      "BirthdayDate": BirthdayDate,
      "Password": Password,
      "PermissionType": PermissionType
    }

    await fetch(url,
      {
        method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.,
        body: JSON.stringify(obj2Send),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      }) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        if (!data.toString().includes("could not insert")) {
          returnedObj = data;
        }
        else {
          returnedObj = null;
        }
      })
      .catch(function (err) {
        alert(err);
      });

    return returnedObj;
  }
  render() {
    return (
      <ImageBackground source={background} style={styles.container} >
        <View >       
          <Image source={img} style={{ margin:20,marginTop:50,width: 190, height: 120 }} />
           <Text style={styles.Topic}>REGISTER PAGE</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
             value={this.state.name} onChangeText={(text) => { this.txtchgName(text) }} placeholder="Your Name : " placeholderTextColor="#000000"></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              value={this.state.familyName} onChangeText={(text) => { this.txtchgFamilyName(text) }} placeholder="Your Last Name : " placeholderTextColor="#000000"></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs} 
            value={this.state.workerType} onChangeText={(text) => { this.txtchgWorkerType(text) }} placeholder="Worker Typs : " placeholderTextColor="#000000"></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
             value={this.state.email} onChangeText={(text) => { this.txtchgEmail(text) }} placeholder="Your Email : " placeholderTextColor="#000000"></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs} 
            value={this.state.Password} onChangeText={(text) => { this.txtchgPassword(text) }} placeholder="Your Password : " placeholderTextColor="#000000"></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs} 
            value={this.state.phoneNumber} onChangeText={(text) => { this.txtchgPhoneNumber(text) }} placeholder="Your Phone Number : " placeholderTextColor="#000000"></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs} 
            value={this.state.address} onChangeText={(text) => { this.txtchgAddress(text) }} placeholder="Your Address : " placeholderTextColor="#000000"></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
            value={this.state.birthdayDate} onChangeText={(text) => { this.txtchgBirthdayData(text) }} placeholder="Your B-Day Date : " placeholderTextColor="#000000"></TextInput>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
            value={this.state.permissionType} onChangeText={(text) => { this.txtchgPermissionType(text) }} placeholder="Your Permission Typs : " placeholderTextColor="#000000"></TextInput>
          </View>
        </ScrollView>
        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.btnAddWorker}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
      </ImageBackground>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
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
    alignItems: 'center',
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
    backgroundColor: "#0000FF",
  },
  loginText: {
    color: '#FFFFFF',
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60
  },
  Topic : {
    textAlign: 'center',
    margin:20 ,
    color:'#FFFFFF' ,
    fontSize:30,
    fontWeight:'bold'
  }
});