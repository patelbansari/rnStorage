import React, { useEffect, useState } from 'react';
import { Button, Image, View,Share } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getImageUtils } from '../util/GetImageUtils';

const PhotoList  = () => {

    const [photoList,setPhotoList] = useState([])

    useEffect(async() => {
      let list =  await getImageUtils()
      setPhotoList(list)
    },[])

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'Share Image',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    return(
    <ScrollView style={{flex:1}}>

        {
            photoList.map((item,index) => {
                console.log(item.node.image.uri)
                return <View style={{padding:20}}>
                    <Image source={{uri : item.node.image.uri}} style={{width:100,height:100,padding:10}} key={index}/>
                    <Button title={"Share"} onPress={() => onShare()}/>
                     </View>
            })
        }


    </ScrollView>)
}

export default PhotoList;