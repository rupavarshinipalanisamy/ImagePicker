import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { WeekStyles } from '../styles/WeekDaysStyles';
import { BtnStyles } from '../styles/btnStyles';
import { CardStyles } from '../styles/cardStyles';

const weekArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Homescreen = () => {
    const [selectedTab, setSelectedTab] = useState(null);
    const [cardCounts, setCardCounts] = useState({});
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [cardTimes, setCardTimes] = useState({});

    const handleOnPress = (weekTab) => {
        setSelectedTab(weekTab);
        console.log(weekTab);
    };

    const handleAddBtn = () => {
        setCardCounts((prevCardCounts) => {
            const updatedCardCounts = { ...prevCardCounts };
            updatedCardCounts[selectedTab] = (updatedCardCounts[selectedTab] || 0) + 1;
            return updatedCardCounts;
        });
        setCardTimes((prevCardTimes) => {
            const updatedCardTimes = { ...prevCardTimes };
            updatedCardTimes[selectedTab] = updatedCardTimes[selectedTab] || [];
            updatedCardTimes[selectedTab].push({ startTime: '00:00', endTime: '00:00' });
            return updatedCardTimes;
        });
    };

    const showStartTimePicker = (cardIndex) => {
        setSelectedCardIndex(cardIndex);
        setStartTimePickerVisibility(true);
    };

    const showEndTimePicker = (cardIndex) => {
        setSelectedCardIndex(cardIndex);
        setEndTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setStartTimePickerVisibility(false);
        setEndTimePickerVisibility(false);
    };

    const handleStartTimeConfirm = (time) => {
        const formattedTime = time.toLocaleTimeString('en-US');
        setCardTimes((prevCardTimes) => {
            const updatedCardTimes = { ...prevCardTimes };
            updatedCardTimes[selectedTab] = updatedCardTimes[selectedTab] || [];
            updatedCardTimes[selectedTab][selectedCardIndex - 1] = {
                ...updatedCardTimes[selectedTab][selectedCardIndex - 1],
                startTime: formattedTime,
            };
            return updatedCardTimes;
        });
        hideTimePicker();
    };

    const handleEndTimeConfirm = (time) => {
        const formattedTime = time.toLocaleTimeString('en-US');
        setCardTimes((prevCardTimes) => {
            const updatedCardTimes = { ...prevCardTimes };
            updatedCardTimes[selectedTab] = updatedCardTimes[selectedTab] || [];
            updatedCardTimes[selectedTab][selectedCardIndex - 1] = {
                ...updatedCardTimes[selectedTab][selectedCardIndex - 1],
                endTime: formattedTime,
            };
            return updatedCardTimes;
        });
        hideTimePicker();
    };

    const renderCards = () => {
        const cardCount = cardCounts[selectedTab] || 0;
        const cards = [];
        const tabCardTimes = cardTimes[selectedTab] || [];

        for (let i = 1; i <= cardCount; i++) {
            const cardTime = tabCardTimes[i - 1] || {};
            const startTime = cardTime.startTime || '00:00';
            const endTime = cardTime.endTime || '00:00';

            cards.push(
                <View key={i} style={CardStyles.cardContainer}>
                    <View>
                        <Text>StartTime</Text>
                        <View style={CardStyles.startTimecard}>
                            <TouchableOpacity onPress={() => showStartTimePicker(i)}>
                                <Text style={CardStyles.timerTxt}>{startTime}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text>EndTime</Text>
                        <View style={CardStyles.startTimecard}>
                            <TouchableOpacity onPress={() => showEndTimePicker(i)}>
                                <Text style={CardStyles.timerTxt}>{endTime}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }

        return cards;
    };

    return (
        <View style={WeekStyles.container}>
            <View style={WeekStyles.weekContainer}>
                {weekArr.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => handleOnPress(item)}>
                            <View style={[WeekStyles.weekDays, { backgroundColor: selectedTab === item ? 'green' : 'white' }]}>
                                <Text style={WeekStyles.weekDaysText}>{item.slice(0, 1)}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {selectedTab && (
                <View style={BtnStyles.btnContainer}>
                    <TouchableOpacity onPress={handleAddBtn} style={BtnStyles.addSubBtnContainer}>
                        <Text style={BtnStyles.addSubTxt}>ADD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={BtnStyles.addSubBtnContainer}>
                        <Text style={BtnStyles.addSubTxt}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            )}

            {renderCards()}

            <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleStartTimeConfirm}
                onCancel={hideTimePicker}
            />

            <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleEndTimeConfirm}
                onCancel={hideTimePicker}
            />
        </View>
    );
};

export default Homescreen;
