import { StyleSheet } from "react-native";
export const WeekStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00bfff'
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        marginTop: 50,


    },
    weekDays: {
        height: 40,
        width: 40,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black'
    },
    weekDaysText: {
        top: 8,
        fontWeight: '700',
        color: 'black'

    }


})