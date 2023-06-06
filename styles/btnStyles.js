import { StyleSheet } from "react-native";
export const BtnStyles = StyleSheet.create({
    btnContainer:{
        marginTop:20,
        padding:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },
   
    addSubBtnContainer:{
        height:30,
        width:80,
        backgroundColor:'green',
        borderRadius:6,
        alignItems:'center'
    },
    addSubTxt:{
        top:5,
        fontSize:15,
        color:'black',
        fontWeight:'400'
    }

})