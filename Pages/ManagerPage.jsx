import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableHighlight, Picker, TouchableOpacity, ImageBackground } from "react-native";
import { Calendar } from 'react-native-plain-calendar';
import { Table, TableWrapper, Col, Cols, Cell, Row } from 'react-native-table-component';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from "@react-navigation/native";
import background from '../assets/backgroundImg.jpg';
import registerForPushNotificationsAsync from '../Pages/Push';
import { Notifications } from "expo";


let urlShifts = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/api/shifts';
let urlWorkers = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/api/worker';
let y = 0, k = 0;
let shiftsIDToSave = []
let shiftsNameToSave = []

export default class ManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {},
      token: null,
      hand: 'lolita',
      dataWorker: [],
      token: '',
      dataShiftsShow: [],
      tableTitleShow: ['1', '2', '3', '1', '2', '3', '1', '2', '3'],
      tableHeadShow: ['A', 'B', 'C', 'D', 'E'],
      tableDataShow: [
        ['Sunday', '', '', '', '', '', '', '', '', ''],
        ['Monday', '', '', '', '', '', '', '', '', ''],
        ['Tuesday', '', '', '', '', '', '', '', '', ''],
        ['Wednesday', '', '', '', '', '', '', '', '', ''],
        ['Thursday', '', '', '', '', '', '', '', '', ''],
      ],
      tableTitleChange: ['1', '2', '3', '1', '2', '3', '1', '2', '3'],
      tableHeadChange: ['A', 'B', 'C', 'D', 'E'],
      tableDataChange: [
        ['Sunday', '', '', '', '', '', '', '', '', ''],
        ['Monday', '', '', '', '', '', '', '', '', ''],
        ['Tuesday', '', '', '', '', '', '', '', '', ''],
        ['Wednesday', '', '', '', '', '', '', '', '', ''],
        ['Thursday', '', '', '', '', '', '', '', '', ''],
      ]
    }
  }
  componentDidMount = async () => {
    await this.getAllSHifts();
    await this.getAllWorkers();
    await registerForPushNotificationsAsync().then(tok => {
      this.setState({ token: tok })
    });
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _handleNotification = (notification) => {
    this.setState({ notification: notification });
    };
  SendPush = () => {
    let per = {
      name: "Shifts",
      to: this.state.token,
      title: "היי העלו משמרות -\n",
      body: "כנס עכשיו לראות !",
      badge: 3,
      backgroundColor: "black"
    };
    console.log(`66`, per);
    fetch("'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/sendpushnotificationFromLocalServer", {
      method: "POST",
      body: JSON.stringify(per),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json != null) {
          console.log(`76`, json);
          console.log(`
                  returned Push from server\n
                  json.data= ${JSON.stringify(json.data)}`);
        } else {
          alert("err json");
        }
        
      });
      
  };


  getAllWorkers = async () => {
    await fetch(urlWorkers,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        }
      })
      .then((data) => {
        if (!data.toString().includes("could not get all the shifts !")) {
          this.setState({ dataWorker: data });
        }
      })
      .catch(function (err) {
        alert(err);
      });

  }
  getAllSHifts = async () => {
    await fetch(urlShifts,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        }
      })
      .then((data) => {
        if (!data.toString().includes("could not get all the shifts !")) {
          this.setState({ dataShiftsShow: data });
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }
  BtnEditTable = () => {
    for (let index = 0; index < shiftsIDToSave.length; index++) {
      let obj2Send = {
        "ShiftID": shiftsIDToSave[index],
        "Day": 0,
        "Remarks": "",
        "Name": shiftsNameToSave[index],
        "Shift1": ""
      }
      fetch(urlShifts,
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
            alert("המשמרות עודכנו בהצלחה !")
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
  }


  render() {
    let a = []
    let b;
    const { tableTitleShow, dataWorker, dataShiftsShow, tableDataShow, tableDataChange, tableTitleChange } = this.state;
    let dataShifts = dataShiftsShow
    let m = 1, n = 4, e = 7;
    for (let i = 0; i < 5; i += 1) {
      for (let j = 1; j < dataShiftsShow.length + 1; j += 1) {
        switch (dataShiftsShow[j - 1]?.Shift1) {
          case "בוקר": {
            if (dataShiftsShow[j - 1]?.Day === i + 1) {
              if (m == 4)
                m = 1;
              tableDataShow[i][m] = dataShiftsShow[j - 1]?.Name;
              if (dataWorker.length) {
                a = dataWorker.map(a => a.Name)
                a = a.filter(a => a.Name !== dataShiftsShow[j - 1]?.Name)
              }
              tableDataChange[i][m] =
                <Picker
                  selectedValue={dataShiftsShow[j - 1]?.Name}
                  onValueChange={(hand) => {
                    shiftsNameToSave[y] = hand;
                    y += 1;
                    shiftsIDToSave[k] = dataShiftsShow[j - 1].ShiftID;
                    k += 1;
                    dataShifts[j - 1].Name = hand
                    this.setState({ dataShiftsShow: dataShifts })//dataShiftsShow בלחיצה על שלח צריך לשלוח את המשתנה - 
                  }}
                  style={{ width: 100, textAlign: 'center', color: 'white', fontWeight: "bold" }}
                  mode="dropdown"
                >
                  {a.length ? b = a.map((b, index) => <Picker.Item label={b ? b : null} value={b ? b : null} key={index} />) : null}
                </Picker>
              m += 1;
            }
          }
            break;
          case "צהריים": {
            if (dataShiftsShow[j - 1]?.Day === i + 1) {
              if (n == 7)
                n = 4;
              tableDataShow[i][n] = dataShiftsShow[j - 1]?.Name;
              if (dataWorker.length) {
                a = dataWorker.map(a => a.Name)
              }
              tableDataChange[i][n] =
                <Picker
                  selectedValue={dataShiftsShow[j - 1]?.Name}
                  onValueChange={(hand) => {
                    shiftsNameToSave[y] = hand;
                    y += 1;
                    shiftsIDToSave[k] = dataShiftsShow[j - 1].ShiftID;
                    k += 1;
                    dataShifts[j - 1].Name = hand
                    this.setState({ dataShiftsShow: dataShifts })
                  }} style={{ width: 100, textAlign: 'center', color: 'white', fontWeight: "bold" }}
                  mode="dropdown"
                >
                  {a.length ? b = a.map((b, index) => <Picker.Item label={b ? b : null} value={b ? b : null} key={index} />) : null}
                </Picker>
              n += 1;
            }
          }
            break;
          case "ערב": {
            if (dataShiftsShow[j - 1]?.Day === i + 1) {
              if (e == 10)
                e = 7;
              tableDataShow[i][e] = dataShiftsShow[j - 1]?.Name;

              if (dataWorker.length) {
                a = dataWorker.map(a => a.Name)
              }
              tableDataChange[i][e] =
                <Picker
                  selectedValue={dataShiftsShow[j - 1]?.Name}
                  onValueChange={(hand) => {
                    shiftsNameToSave[y] = hand;
                    y += 1;
                    shiftsIDToSave[k] = dataShiftsShow[j - 1].ShiftID;
                    k += 1;
                    dataShifts[j - 1].Name = hand
                    this.setState({ dataShiftsShow: dataShifts })
                  }} style={{ width: 100, textAlign: 'center', color: 'white', fontWeight: "bold" }}
                  mode="dropdown"
                >
                  {a.length ? b = a.map((b, index) => <Picker.Item label={b ? b : null} value={b ? b : null} key={index} />) : null}
                </Picker>
              e += 1;
            }
          }
            break;
        }
      }
    }
    const { navigation } = this.props
    return (
      <ImageBackground source={background} style={styles.containerView}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer} >
          <TouchableOpacity style={{ position: 'absolute', top: 40, left: 10 }} onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
            <AntDesign name="menu-fold" size={24} color="black" style={[{ backgroundColor: 'white' }]} />
          </TouchableOpacity>
          <View style={styles.calendarView}>
            <View>
              <Calendar style={styles.calendar}
                dayTextStyle={{ "color": "#FFFFFF", fontWeight: "bold" }}
                headerTitleStyle={{ "color": "#FFFFFF", fontWeight: "bold" }}
                weekdayStyle={{ "color": "#FFFFFF", fontWeight: "bold" }} />
            </View>
          </View>
          <Text style={{ fontWeight: "bold", paddingTop: 20, color: "#FFFFFF", fontSize: 20 }}>סידור עבודה בקשות עובדים</Text>
          <View style={styles.container}>
            < ScrollView horizontal={true}
              contentContainerStyle={styles.scrollContainer}
            >
              <Table style={{ flexDirection: 'row', height: 312 }} borderStyle={{ borderWidth: 1, borderColor: "#FFFFFF" }}>
                <TableWrapper style={{ width: 100 }}>
                  <Cell data="" style={styles.singleHead} />
                  <TableWrapper style={{ flexDirection: 'row' }}>
                    <Col data={['Morning', 'Noon', 'Evening']} style={styles.head} heightArr={[90, 90, 90]} textStyle={styles.text1} />
                    <Col data={tableTitleShow} style={styles.title} heightArr={[30, 30, 30, 30, 30, 30, 30, 30, 30]} textStyle={styles.titleText}></Col>
                  </TableWrapper>
                </TableWrapper>
                <TableWrapper style={{ flex: 1 }}>
                  <Cols data={tableDataShow} heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30]} widthArr={[90, 90, 90, 90, 90]} textStyle={styles.text} />
                </TableWrapper>
              </Table>
            </ScrollView>
          </View>
          <Text style={{ fontWeight: "bold", paddingTop: 20, color: "#FFFFFF", fontSize: 20 }}>סידור עבודה ע"פ מנהל</Text>

          <View style={styles.container}>
            <ScrollView horizontal={true}
              contentContainerStyle={styles.scrollContainer}
            >
              <Table style={{ flexDirection: 'row', height: 312 }} borderStyle={{ borderWidth: 1, borderColor: "#FFFFFF" }}>
                {/* Left Wrapper */}
                <TableWrapper style={{ width: 100 }}>
                  <Cell data="" style={styles.singleHead} />
                  <TableWrapper style={{ flexDirection: 'row' }}>
                    <Col data={['Morning', 'Noon', 'Evening']} style={styles.head} heightArr={[90, 90, 90]} textStyle={styles.text1} />
                    <Col data={tableTitleChange} style={styles.title} heightArr={[30, 30, 30, 30, 30, 30, 30, 30, 30]} textStyle={styles.titleText}></Col>
                  </TableWrapper>
                </TableWrapper>

                {/* Right Wrapper */}
                <TableWrapper style={{ flex: 1 }}>
                  <Cols data={tableDataChange} heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30]} widthArr={[90, 90, 90, 90, 90]} textStyle={styles.text} />
                </TableWrapper>
              </Table>
            </ScrollView>
          </View>
          <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: 410, height: 50 }}>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}>
              <Text style={styles.loginText}>אפס בחירה</Text>
            </TouchableHighlight>


            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.SendPush()}>
              <Text style={styles.loginText}>פרסם סידור עבודה</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.BtnEditTable}>
              <Text style={styles.loginText}>שמור נתונים</Text>
            </TouchableHighlight>
          </View>



        </ScrollView>
      </ImageBackground>

    );
  }
}
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    height: "105%",
    width: "100%",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 50
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60,
    paddingTop: 100
  },
  textContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row-reverse",
    width: 400,
    height: 100
  },
  calendarView: {
    borderWidth: 4,
    borderRadius: 5,
    borderColor: "#fff",
    width: 400,
    height: 328
  },
  calendar: {
    padding: 15
  },
  container: { flex: 1 },
  singleHead: { width: 100, height: 40, backgroundColor: '#c8e1ff' },
  head: { flex: 15, backgroundColor: '#c8e1ff' },
  title: { flex: 3, backgroundColor: '#f6f8fa' },
  titleText: { textAlign: 'center' },
  text1: { textAlign: 'center' },
  text: { textAlign: 'center', color: 'white', fontWeight: "bold" },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' },
  buttonContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  containerPicker: {
    flex: 1,
    paddingTop: 40,
    color: 'black',
    alignItems: "center"
  }
});