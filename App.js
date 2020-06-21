import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { vibrate } from './utils'

// App

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      workingMinutes: 0,
      workingSeconds: 0,
      restingMinute: 0,
      restingSeconds: 0,
      isWorking: true,
      start: false,
      originalWorkingSeconds: 0,
      originalWorkingMinutes: 0,
      originalRestingMinutes: 0,
      originalRestingSeconds: 0
    };
  }
  
  timeStart = () => {
    this.setState({
      start: !this.state.start,
    })
  }

  timeReset = () => {
    if (this.state.isWorking === true){
      this.setState({
        workingMinutes: this.state.originalWorkingMinutes,
        workingSeconds: this.state.originalWorkingSeconds,
        start: false,
      })
    } else {
      this.setState({
        restingMinutes: this.state.originalRestingMinutes,
        restingSeconds: this.state.originalRestingSeconds,
        start: false,
      })
    }
  }
  
  componentDidMount() {
    this.timer = setInterval(this.timeDecrement, 1000)
    }

  timeDecrement = () => {
      if (this.state.start === true) {
          if (this.state.isWorking === true){
              if(this.state.workingMinutes > 0){
                  if (this.state.workingSeconds > 0){
                      this.setState({
                          workingSeconds: this.state.workingSeconds - 1,
                      })
                  } else {
                      this.setState({
                          workingMinutes: this.state.workingMinutes - 1,
                          workingSeconds: 59,
                      })
                  }
              } else {
                  if (this.state.workingSeconds > 0){
                      this.setState({
                          workingSeconds: this.state.workingSeconds - 1,
                      })
                  } else {
                      vibrate()
                      this.setState({
                        workingMinutes: this.state.originalWorkingMinutes,  
                        workingSeconds: this.state.originalWorkingSeconds,
                        isWorking: !this.state.isWorking,
                      })
                  }
              }
          } else {
              if (this.state.restingMinutes > 0){
                  if (this.state.restingSeconds > 0){
                      this.setState({
                          restingSeconds: this.state.restingSeconds - 1,
                      })
                  } else {
                      this.setState({
                          restingMinutes: this.state.restingMinutes - 1,
                          restingSeconds: 59,
                      })
                  }
              } else {
                  if (this.state.restingSeconds > 0){
                      this.setState({
                          restingSeconds: this.state.restingSeconds - 1,
                      })
                  } else {
                        vibrate()
                      this.setState({
                          restingMinutes: this.state.originalRestingMinutes,
                          restingSeconds: this.state.originalRestingSeconds,
                          isWorking: !this.state.isWorking
                      })
                  }
              }
          }
      }
  }

  isWorkingRightNow = () => {
    if (this.state.isWorking === true){
      return (
        <>
        <Text style={styles.text}>Working Time</Text>
        </>
        )
    } else {
      return(
        <>
        <Text style={styles.text}>Resting Time</Text>
        </>
        )
    }
  }

  minutesClock = () => {
    if (this.state.isWorking === true){
      if (this.state.workingMinutes === ''){
        return(
          <Text style={styles.count}>00:</Text>
        )
      } else if (this.state.workingMinutes <= 9){
        return(
          <Text style={styles.count}>{this.state.workingMinutes}:</Text>
        )
      } else {
        return(
          <Text style={styles.count}>{this.state.workingMinutes}:</Text>
        )
      }
    } else {
        if (this.state.restingMinutes === ''){
          return(
            <Text style={styles.count}>00:</Text>
          )
        } else if (this.state.restingMinutes <= 9){
          return(
            <Text style={styles.count}>{this.state.restingMinutes}:</Text>
          )
        } else {
          return(
            <Text style={styles.count}>{this.state.restingMinutes}:</Text>
          )
        }
      }
  }

  secondsClock = () => {
    if (this.state.isWorking === true){
      if (this.state.workingSeconds === ''){
        return(
          <Text style={styles.count}>00</Text>
        )
      } else if (this.state.workingSeconds <= 9){
        return(
          <Text style={styles.count}>0{this.state.workingSeconds}</Text>
        )
      } else {
        return(
          <Text style={styles.count}>{this.state.workingSeconds}</Text>
        )
      }
    } else {
        if (this.state.restingSeconds === ''){
          return(
            <Text style={styles.count}>00</Text>
          )
        } else if (this.state.restingSeconds <= 9){
          return(
            <Text style={styles.count}>0{this.state.restingSeconds}</Text>
          )
        } else {
          return(
            <Text style={styles.count}>{this.state.restingSeconds}</Text>
          )
        }
      }
  }  
  

  workingMinutesChange = (text) => {
    if (/^\d+$/.test(text) || text === ''){
      this.setState({
        originalWorkingMinutes: Number(text),
        workingMinutes: Number(text),
        start: false
      });
    }
  }
  
  workingSecondsChange = (text) => {
    let quotient = Math.floor((Number(text) / 60))
    let remainder = (Number(text) % 60) 
    if (/^\d+$/.test(text) || text === ''){
      if (text >= 60) {
        this.setState({
          workingMinutes: (Number(this.state.workingMinutes) + quotient),
          originalWorkingSeconds: remainder,
          workingSeconds: remainder,
          start: false,
        })
      } else {
        this.setState({
          originalWorkingSeconds: Number(text),
          workingSeconds: Number(text),
          workingMinutes: this.state.originalWorkingMinutes,
          start: false,
        })
      }
    }
  }

  restingMinutesChange = (text) => {
    if (/^\d+$/.test(text) || text === ''){
      this.setState({
        originalRestingMinutes: Number(text),
        restingMinutes: Number(text),
        start: false
      });
    } 
  }

  restingSecondsChange = (text) => {
    let quotient = Math.floor((Number(text) / 60))
    let remainder = (Number(text) % 60) 
    if (/^\d+$/.test(text) || text === ''){
      if (text >= 60) {
        this.setState({
          restingMinutes: (Number(this.state.restingMinutes) + quotient),
          originalRestingSeconds: remainder,
          restingSeconds: remainder,
          start: false,
        })
      } else {
        this.setState({
          originalRestingSeconds: Number(text),
          restingSeconds: Number(text),
          restingMinutes: this.state.originalRestingMinutes,
          start: false,
        })
      }
    }
  }

  render() {
    return (
      
      <View style={styles.container}>
      {this.isWorkingRightNow()}
      <Text>{this.minutesClock()}{this.secondsClock()}</Text>

 
        <TextInput 
        style={{ height: 40, width: 120, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Working Minutes"
        onChangeText={this.workingMinutesChange}
        keyboardType="numeric"
        />

      
        <TextInput 
        style={{ height: 40, width: 120, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Working Seconds"
        onChangeText={this.workingSecondsChange}
        keyboardType="number-pad"
        />

        <TextInput 
        style={{ height: 40, width: 120, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Resting Minutes"
        onChangeText={this.restingMinutesChange}
        keyboardType="number-pad"
        />

        <TextInput 
        style={{ height: 40, width: 120, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Resting Seconds"
        onChangeText={this.restingSecondsChange}
        keyboardType="number-pad"
        />
      <Button title="start" onPress={this.timeStart}></Button>
      
      <Button title="reset" onPress={this.timeReset}></Button>
      </View>
      
      
      
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 72,
  },
  text: {
    fontSize: 50
  }
});