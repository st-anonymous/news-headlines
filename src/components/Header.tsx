/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import UserSettingsAtom from '../data/UserSettings';

const Header = () => {
  const [isSettingDelay, setIsSettingDelay] = useState(false);
  const [userSettingsAtom, setUserSettingsAtom] =
    useRecoilState(UserSettingsAtom);
  const [delay, setDelay] = useState(userSettingsAtom.delay.toString());

  const OnRefresh = () => {
    setUserSettingsAtom(prev => {
      return {
        ...prev,
        manualRefresh: true,
      };
    });
  };

  const OnSetDelay = () => {
    setIsSettingDelay(false);
    setUserSettingsAtom(prev => {
      return {
        ...prev,
        delay: parseInt(delay, 10),
      };
    });
  };

  const OnCancel = () => {
    setIsSettingDelay(false);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          setIsSettingDelay(true);
        }}>
        <Text style={styles.symbolText}>⏲</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>News</Text>
      <TouchableOpacity onPress={OnRefresh}>
        <Text style={styles.symbolText}>↻</Text>
      </TouchableOpacity>
      {isSettingDelay && (
        <View style={styles.settingDelayContainer}>
          <View style={styles.settingDelayInputView}>
            <TextInput
              keyboardType={'numeric'}
              placeholder={'delay'}
              value={delay}
              onChangeText={e => setDelay(e)}
              style={styles.settingDelayInput}
            />
            <Text>seconds</Text>
          </View>
          <TouchableOpacity
            onPress={OnCancel}
            style={{...styles.settingDelayButton, backgroundColor: 'red'}}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={OnSetDelay}
            style={{...styles.settingDelayButton, backgroundColor: 'green'}}>
            <Text>Set Delay</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: '10%',
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  headerText: {
    fontSize: 48,
    color: 'black',
  },
  symbolText: {
    fontSize: 40,
    color: 'blue',
  },
  settingDelayContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  settingDelayInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '40%',
  },
  settingDelayInput: {
    borderRadius: 10,
    borderWidth: 1,
    width: '40%',
    paddingHorizontal: 10,
  },
  settingDelayButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    height: '60%',
    width: '20%',
  },
});
