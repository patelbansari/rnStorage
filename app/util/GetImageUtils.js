import CameraRoll from "@react-native-community/cameraroll";

export const getImageUtils = async() => {
    let myPhotoList = []
    let list = await CameraRoll.getPhotos({
        first:20,
        assetType:'Photos'
    })
    list.edges.map((item) => {
        if(item.node.group_name === "MyPhotos"){
            myPhotoList.push(item)
        }
    })
    return myPhotoList;
}