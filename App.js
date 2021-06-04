import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TextInputBase, TouchableOpacity, View } from 'react-native';
import Task from './Components/Task';

export default function App() {

  const [task,setTask]=useState();
  const [taskItem,setTaskItem]=useState([])

  const handleTask=()=>{
    Keyboard.dismiss();
    setTaskItem([...taskItem,task])
    setTask(null);
  }
  const deleteTask=(index)=>{
    let itemsDisplay=[...taskItem];
    itemsDisplay.splice(index,1);
    setTaskItem(itemsDisplay);
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.taskWrapper}>
        <Text style={styles.title}>Today's Task</Text>
        <View style={styles.item}>
          {
            taskItem.map((item,index)=>{
              return(
                <TouchableOpacity onPress={()=>deleteTask(index)}>
                  <Task key={index} text={item}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding":"height"}
        style={styles.writeTask}
        >
          <TextInput style={styles.input} placeholder={"Write a task.."}
          value={task} 
          onChangeText={text=>setTask(text)}/>
          <TouchableOpacity onPress={()=>handleTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper:{
    paddingTop:80,
    paddingHorizontal:20,
  },
  title:{
    fontSize:24,
    fontWeight:'bold'
  },
  item:{
    marginTop:30,
  },
  writeTask:{
    position:'absolute',
    bottom:25,
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor:'#FFF',
    borderRadius:60,
    borderColor:'#C0C0C0',
    borderWidth:1,
    width:250
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:'#FFF',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#C0C0C0',
    borderWidth:1,
  }
});
