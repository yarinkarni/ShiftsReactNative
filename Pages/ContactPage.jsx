import React from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight, Linking, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import background from '../assets/backgroundImg.jpg';
import img from '../assets/contact.png';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from "@react-navigation/native";
export default class ContactPage extends React.Component {



  AlertNumber = async () => {
    Linking.openURL(`tel:`)
  }

  AlertNumber1 = async () => {
    Linking.openURL(`tel:`)
  }

  AlertNumber2 = async () => {
    Linking.openURL(`tel:052-2222222`)
  }

  BackToMenu = async () => {
    this.props.navigation.navigate('LoginPage');
  }


  render() {
    const { navigation } = this.props
    return (
      <ImageBackground source={background} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer} >
          <TouchableOpacity style={{ position: 'absolute', top: 50, left: 10 }} onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
            <AntDesign name="menu-fold" size={24} color="black" style={[{ backgroundColor: 'white' }]} />
          </TouchableOpacity>
          <View style={{ borderWidth: 5, borderRadius: 150, borderBottomEndRadius: 30, borderBottomStartRadius: 30, borderColor: "#FFFFFF" }}>
            <Image source={img} style={{ margin: 20, marginTop: 50, width: 150, height: 150 }} />
          </View>
          <View style={{ alignItems: 'center', padding: 35 }}>
            <Text style={{ fontSize: 30, color: "#FFFFFF", fontWeight: "bold" }}>ברוכים הבאים </Text>
            <Text style={{ fontSize: 30, color: "#FFFFFF", fontWeight: "bold" }}>לדף יצירת קשר</Text>
          </View>
          <View >
            <View style={{ borderColor: "#FFFFFF", borderWidth: 5, borderRadius: 20, margin: 0, justifyContent: 'space-between', width: 400, height: 100, paddingTop: 30, flexDirection: "row-reverse", backgroundColor: "#8A2BE2" }}>
              <Text style={{ fontWeight: "bold", paddingRight: 20, color: "#FFFFFF" }}> Director of the Branch </Text>
              <TouchableHighlight onPress={this.AlertNumber}>
                <Text style={{ fontWeight: "bold", paddingLeft: 20, color: "#FFFFFF" }}>Press Here</Text>
              </TouchableHighlight>
            </View>
            <View style={{ borderColor: "#FFFFFF", borderWidth: 5, borderRadius: 20, margin: 0, justifyContent: 'space-between', width: 400, height: 100, paddingTop: 30, flexDirection: "row-reverse", backgroundColor: "#8A2BE2" }}>
              <Text style={{ fontWeight: "bold", paddingRight: 20, color: "#FFFFFF" }}> Deputy Director of the branch</Text>
              <TouchableHighlight onPress={this.AlertNumber1}>
                <Text style={{ fontWeight: "bold", paddingLeft: 20, color: "#FFFFFF" }}>Press Here</Text>
              </TouchableHighlight>
            </View>
            <View style={{ borderColor: "#FFFFFF", borderWidth: 5, borderRadius: 20, margin: 0, justifyContent: 'space-between', width: 400, height: 100, paddingTop: 30, flexDirection: "row-reverse", backgroundColor: "#8A2BE2" }}>
              <Text style={{ fontWeight: "bold", paddingRight: 20, color: "#FFFFFF" }}> Branch</Text>
              <TouchableHighlight onPress={this.AlertNumber2}>
                <Text style={{ fontWeight: "bold", paddingLeft: 20, color: "#FFFFFF" }}>Press Here</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView >
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60,
    paddingTop: 100,
    // marginTop:40
  },

})
