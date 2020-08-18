import React from 'react';
import { StyleSheet, View, Alert, ScrollView, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { Table, TableWrapper, Col, Cols, Cell } from 'react-native-table-component';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from "@react-navigation/native";
import background from '../assets/backgroundImg.jpg';

let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/api/shifts';

export default class ShiftsAdvertisingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableTitle: ['1', '2', '3', '1', '2', '3', '1', '2', '3'],
      tableHead: ['A', 'B', 'C', 'D', 'E'],
      tableData: [
        ['Sunday', '', '', '', '', '', '', '', '', ''],
        ['Monday', '', '', '', '', '', '', '', '', ''],
        ['Tuesday', '', '', '', '', '', '', '', '', ''],
        ['Wednesday', '', '', '', '', '', '', '', '', ''],
        ['Thursday', '', '', '', '', '', '', '', '', ''],
      ]
    }
  }
  componentDidMount() {
    this.getAllSHifts();
  }
  getAllSHifts() {
    fetch(url,
      {
        method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.,
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      }) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        }
        else
          return "could not get all the shifts !";
      }) // Transform the data into json
      .then((data) => {
        if (!data.toString().includes("could not get all the shifts !")) {
          //console.log('fetched JSON.stringify(data)', JSON.stringify(data));
          this.setState({ data: data });
        }
        else {
          console.log('didnt get the shifts !');
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }


  render() {
    let m = 1, n = 4, e = 7;
    for (let i = 0; i < 5; i += 1) {
      for (let j = 1; j < this.state.data.length + 1; j += 1) {
        switch (this.state.data[j - 1]?.Shift1) {
          case "בוקר": {
            if (this.state.data[j - 1]?.Day === i + 1) {
              if (m == 4)
                m = 1;
              this.state.tableData[i][m] = this.state.data[j - 1]?.Name;
              m += 1;
            }
          }
            break;
          case "צהריים": {
            if (this.state.data[j - 1]?.Day === i + 1) {
              if (n == 7)
                n = 4;
              this.state.tableData[i][n] = this.state.data[j - 1]?.Name;
              n += 1;
            }
          }
            break;
          case "ערב": {
            if (this.state.data[j - 1]?.Day === i + 1) {
              if (e == 10)
                e = 7;
              this.state.tableData[i][e] = this.state.data[j - 1]?.Name;
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
        <View style={styles.container} >
          <TouchableOpacity style={{ position: 'absolute', top: 40, left: 10 }} onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
            <AntDesign name="menu-fold" size={24} color="black" style={[{ backgroundColor: 'white' }]} />
          </TouchableOpacity>
          <Text style={{fontSize:30, top: 70,fontWeight:"bold",color: "white"}}>פרסום משמרות</Text>
          < ScrollView horizontal={true}
            contentContainerStyle={styles.scrollContentContainer}>
            <Table style={{ flexDirection: 'row', height: 312, borderColor: "#FFFFFF", }} borderStyle={{ borderWidth: 1, borderColor: "#FFFFFF" }}>
              <TableWrapper style={{ width: 100 }}>
                <Cell data="" style={styles.singleHead} />
                <TableWrapper style={{ flexDirection: 'row' }}>
                  <Col data={['Morning', 'Noon', 'Evening']} style={styles.head} heightArr={[90, 90, 90]} textStyle={styles.text1} />
                  <Col data={this.state.tableTitle} style={styles.title} heightArr={[30, 30, 30, 30, 30, 30, 30, 30, 30]} textStyle={styles.titleText}></Col>
                </TableWrapper>
              </TableWrapper>
              <TableWrapper style={{ flex: 1 }}>
                <Cols data={this.state.tableData} heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30]} widthArr={[90, 90, 90, 90, 90]} textStyle={styles.text} />
              </TableWrapper>
            </Table>
          </ScrollView>
        </View >
      </ImageBackground>
    )
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
  container: { flex: 1, padding: 16, paddingTop: 30, alignItems: "center", justifyContent: "center" },
  singleHead: { width: 100, height: 40, backgroundColor: '#c8e1ff' },
  head: { flex: 15, backgroundColor: '#c8e1ff' },
  title: { flex: 3, backgroundColor: '#f6f8fa' },
  titleText: { textAlign: 'center' },
  text1: { textAlign: 'center' },
  text: { textAlign: 'center', color: 'white', fontWeight: "bold" },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' },
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60
  },
});