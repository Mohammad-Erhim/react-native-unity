import React, {useRef, useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import UnityView from '@azesmway/react-native-unity';
import type { NavigationProp } from '@react-navigation/native';

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

const Unity = ({navigation}: NavigationProp) => {
  const [count,setCount]=useState(0);
  const unityRef = useRef();
  const message: IMessage = {
    gameObject: 'GameManager',
    methodName: 'MessageRN',
    message: 'inc',
  };

 
const inc=()=>{
  if (unityRef && unityRef.current) {
    // @ts-ignore
    unityRef.current.postMessage(
      message.gameObject,
      message.methodName,
      'inc',
    );
  }
}
const dec=()=>{
  if (unityRef && unityRef.current) {
    // @ts-ignore
    unityRef.current.postMessage(
      message.gameObject,
      message.methodName,
      'dec',
    );
  }
}
  return (
    // If you wrap your UnityView inside a parent, please take care to set dimensions to it (with `flex:1` for example).
    // See the `Know issues` part in the README.
    <View style={{flex: 1,justifyContent:"center",alignItems:"center"}}>
      <UnityView
        // @ts-ignore
        ref={unityRef}
        style={{width:300,height:300,}}
        onUnityMessage={result =>
      {    console.log('onUnityMessage', result.nativeEvent.message)
          if(result.nativeEvent.message=='inc')
          setCount(prev=>++prev)
          if(result.nativeEvent.message=='dec')
          setCount(prev=>--prev)}
        }
        
        //  androidKeepPlayerMounted
      />
            <View style={{height:20}}/>
      <Text style={{color:"black"}}>{count}</Text>
       <View style={{height:20}}/>
      <Button title='inc' onPress={inc}/>
      <View style={{height:20}}/>
      <Button title='dec' onPress={dec}/>
      
    </View>
  );
};

export default Unity;
