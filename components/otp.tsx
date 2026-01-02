import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Reducers, apiPost, useDispatch, useSelector} from '../../module';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Modal, TextButton} from '../../Components';
import messaging from '@react-native-firebase/messaging';
import {hp} from '../../Functions';
import Register from './Register';
import MatrimonyUserRegister from './MatrimonyUserRegister';
interface OTP_INTERFACE {
  onClose: () => void;
  countryCode: any;
  mobileNumber: string;
  createNew: boolean;
}
const OtpScreen = ({
  countryCode,
  mobileNumber,
  onClose,
  createNew,
}: OTP_INTERFACE) => {
  console.log('OtpScreen: Component rendered with props:', {
    countryCode: countryCode?.value || countryCode,
    mobileNumber,
    createNew
  });
  
  const {Size, Color, Font} = useSelector(state => state.app);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(120);
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);
  const [label, setLabel] = useState({
    text: 'OTP will be sent from Puzzlexcel to your mentioned whatsapp number',
    button: 'Login',
  });
  const [code, setCode] = useState({
    value: '',
    loading: false,
    error: false,
    showOtp: false,
    password: '',
  });
  const [register, setRegister] = useState(false);
  const [matrimonyRegister, setMatrimonyRegister] = useState(false);
  const checkOTP = async (OTP: string) => {
    try {
      setCode({...code, loading: true});
      
      // Safely get Firebase token with error handling
      let CLOUD_ID = '';
      try {
        CLOUD_ID = await messaging().getToken();
      } catch (tokenError) {
        console.warn('Failed to get Firebase token:', tokenError);
        // Continue without token
      }
      
      const res = await apiPost('member/verifyOTP', {
        MOBILE_NUMBER: mobileNumber,
        OTP,
        CLOUD_ID,
      });
      
      console.log('OTP verification response:', res);
      
      if (res && res.code == 200) {
        // Add comprehensive null checks
        if (!res.data || !Array.isArray(res.data) || res.data.length === 0) {
          throw new Error('Invalid response data structure');
        }
        
        const responseData = res.data[0];
        if (!responseData) {
          throw new Error('No response data found');
        }
        
        // Check if UserData exists and has items
        if (!responseData.UserData || !Array.isArray(responseData.UserData) || responseData.UserData.length === 0) {
          throw new Error('No user data found in response');
        }
        
        const emp = responseData.UserData[0];
        const token = responseData.token;
        const type = responseData.type;
        
        console.log('OTP verification successful:', {
          emp: emp,
          token: token ? 'present' : 'missing',
          type: type
        });
        
        if (type == 1) {
          // Existing user login
          await AsyncStorage.setItem('USER_ID', String(emp.USER_ID || ''));
          await AsyncStorage.setItem('MEMBER_TYPE', String(emp.INVITATION_TYPE || ''));
          await AsyncStorage.setItem('MOBILE_NUMBER', String(mobileNumber));
          await AsyncStorage.setItem('token', String(token || ''));
          
          console.log('OTP: Stored user data, showing splash');
          dispatch(Reducers.setShowSplash(true));
        } else {
          // New user registration
          await AsyncStorage.setItem('INVITATION_USER_ID', String(emp.USER_ID || ''));
          await AsyncStorage.setItem('MEMBER_TYPE', String(emp.INVITATION_TYPE || ''));
          await AsyncStorage.setItem('MOBILE_NUMBER', String(mobileNumber));
          await AsyncStorage.setItem('token', String(token || ''));
          
          if (emp.INVITATION_TYPE == 'MM') {
            setMatrimonyRegister(true);
          } else {
            setRegister(true);
          }
        }
        
        setCode({...code, loading: false, error: false});
      } else {
        console.warn('OTP verification failed:', res);
        setCode({...code, loading: false, error: true});
        setLabel({...label, text: res?.message || 'OTP verification failed'});
      }
    } catch (e) {
      console.error('OTP verification error:', e);
      setCode({...code, loading: false, error: true});
      setLabel({...label, text: 'Verification failed: ' + (e instanceof Error ? e.message : String(e))});
    }
  };
  const onReSendOtp = async () => {
    try {
      setCode({...code, loading: false});
      const res = await apiPost('member/sendOTP', {
        COUNTRY_CODE: countryCode,
        MOBILE: mobileNumber,
      });
      if (res && res.code == 200) {
        setCode({...code, showOtp: true, error: false, loading: false});
      } else {
        setCode({...code, loading: false, error: true});
        setLabel({...label, text: res?.message});
      }
    } catch (e) {
      console.warn(e);
      setCode({...code, loading: false, error: true});
      setLabel({...label, text: 'error occupied ' + e});
    }
  };
  const hiddenInputRef: any = useRef(null);
  const [otpValue, setOtpValue] = useState();
  const [showDashboard, setShowDashboard] = useState(true);
  const openKeyboardAndInput = () => {
    hiddenInputRef.current.focus();
  };
  const handleHiddenInputChange = (text: any) => {
    setOtpValue(text);
  };
  useEffect(() => {
    if (showDashboard) {
      openKeyboardAndInput();
    }
  }, [showDashboard]);

  const onCloseReq = () => {
    Alert.alert(
      'Back',
      'Are you sure',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => onClose()},
      ],
      {cancelable: true},
    );
  };

  return (
    <View>
      <TextInput
        ref={hiddenInputRef}
        style={{position: 'absolute', top: -1000}}
        keyboardType="number-pad"
        onChangeText={txt => handleHiddenInputChange(txt)}
      />
      <Modal
        isVisible={true}
        onClose={onCloseReq}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        title="OTP Verification"
        containerStyle={{justifyContent: 'flex-end'}}>
        <View
          style={{
            height: hp(38),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.background,
            padding: Size.padding,
            paddingTop: -Size.padding * 2,
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                marginBottom: Size.screenPadding,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...Font.Regular3,
                  color: Color.Text,
                  textAlign: 'center',
                  paddingHorizontal: Size.screenPadding,
                }}>
                {label.text}
              </Text>
            </View>
            <OTPInputView
              keyboardType="number-pad"
              style={{height: 45}}
              pinCount={6}
              codeInputFieldStyle={{
                width: Size.header,
                height: Size.header,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: code.error ? Color.error : Color.background,
                backgroundColor: '#FFF',
                shadowColor: Color.Primary,
                elevation: 10,
                shadowRadius: 5,
                color: Color.Primary,
                ...Font.Medium3,
              }}
              onCodeFilled={value => {
                try {
                  console.log('OTP filled:', value);
                  setCode({...code, value, error: false});
                  checkOTP(value);
                } catch (error) {
                  console.error('Error in onCodeFilled:', error);
                }
              }}
              onCodeChanged={value => {
                try {
                  setShowDashboard(true);
                  setCode({...code, value, error: false});
                } catch (error) {
                  console.error('Error in onCodeChanged:', error);
                }
              }}
            />
          </View>
          <TextButton
            label={label.button}
            onPress={() => {
              checkOTP(code.value);
            }}
            loading={code.loading}
            style={{marginBottom: Size.radius}}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: Size.padding,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{flex: 1}}
              onPress={() => onClose()}>
              <Text
                style={{
                  ...Font.Medium3,
                  color: Color.Primary,
                }}>
                {'Change mobile number'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{flex: 1}}
              disabled={timer > 0}
              onPress={() => {
                setTimer(120);
                onReSendOtp();
              }}>
              <Text
                style={{
                  ...Font.Medium3,
                  color: Color.Primary,
                  alignSelf: 'flex-end',
                }}>
                {timer > 0 ? `Resend OTP(${timer})` : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {register && (
          <Register
            countryCode={countryCode.value}
            mobile={mobileNumber}
            onClose={onClose}
            type="C"
          />
        )}
        {matrimonyRegister && (
          <MatrimonyUserRegister
            countryCode={countryCode.label}
            mobile={mobileNumber}
            onClose={onClose}
          />
        )}
      </Modal>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({});
