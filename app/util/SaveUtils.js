import CameraRoll from "@react-native-community/cameraroll";
import { PERMISSIONS } from "react-native-permissions";
import { _checkPermission, _alertForPermission } from "../util/PermissionsUtils";

export const saveToDirectory = async(uri) => {
    const isPermission = await _checkPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    console.log(isPermission)
    const options = {
        type:'photo',
        album:'MyPhotos'
    }
    if (isPermission) {
        await CameraRoll.save(uri,options)
    } else {
         await showDialog(uri)
    }
}


const showDialog = async (uri) => {
    return new Promise(async(resolve, reject) => {
            const isPermission = await _alertForPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
            console.log('isPermission',isPermission)
            const options = {
                type:'photo',
                album:'MyPhotos'
        
            }
            if (isPermission === "granted") {
                await CameraRoll.save(uri,options)
                resolve(true)
            }
     
    })
}

