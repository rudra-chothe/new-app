import CustomIcon from "@/components/CustomIcon";
import OTPVerificationModal from "@/components/OTPVerificationModal";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState("");

  const maskPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length >= 10) {
      const first = cleaned.slice(0, 1);
      const last = cleaned.slice(-2);
      return `+${first} ${cleaned.slice(1, 4)} *** **${last}`;
    }
    return phone;
  };

  const handleLoginPress = () => {
    if (phoneNumber.trim().length >= 10) {
      const masked = maskPhoneNumber(phoneNumber);
      setMaskedPhoneNumber(masked);
      setShowOTPModal(true);
    }
  };

  const handleOTPVerify = (otp: string) => {
    setShowOTPModal(false);
    router.replace("/(tabs)");
  };

  const handleOTPClose = () => {
    setShowOTPModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F5" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <CustomIcon
              library="ionicons"
              name="arrow-back"
              size={24}
              color="#0F172A"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>LOG IN</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBg}>
                <CustomIcon
                  library="ionicons"
                  name="scale"
                  size={36}
                  color="#1C1917"
                />
              </View>
            </View>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>
              Sign in to manage your smart scale{"\n"}and track your health
              progress.
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Mobile Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCodeSection}>
                  <CustomIcon
                    library="ionicons"
                    name="call"
                    size={16}
                    color="#A8A29E"
                  />
                  <Text style={styles.countryCode}>+1</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="(555) 000-0000"
                  placeholderTextColor="#A8A29E"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                phoneNumber.trim().length < 10 && styles.loginButtonDisabled,
              ]}
              onPress={handleLoginPress}
              disabled={phoneNumber.trim().length < 10}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* OTP Verification Modal */}
      <OTPVerificationModal
        visible={showOTPModal}
        phoneNumber={maskedPhoneNumber}
        onVerify={handleOTPVerify}
        onClose={handleOTPClose}
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 14,
    color: "#78716C",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.35,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F9F506",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 30,
    color: "#0F172A",
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#78716C",
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 280,
  },
  formSection: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: "#57534E",
    fontWeight: "500",
    marginLeft: 4,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    backgroundColor: "#ffffff",
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "#E7E5E4",
    paddingRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  countryCodeSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: "#E7E5E4",
    gap: 8,
  },
  countryCode: {
    fontSize: 16,
    color: "#57534E",
    fontWeight: "500",
  },
  phoneInput: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 18,
    color: "#0F172A",
    fontWeight: "500",
  },
  loginButton: {
    height: 56,
    backgroundColor: "#F9F506",
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F9F506",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "700",
    letterSpacing: 0.45,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E7E5E4",
  },
  dividerText: {
    fontSize: 12,
    color: "#A8A29E",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  socialButton: {
    flex: 1,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "#E7E5E4",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialButtonText: {
    fontSize: 14,
    color: "#44403C",
    fontWeight: "600",
  },
  footerSection: {
    gap: 32,
    paddingTop: 32,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#78716C",
    fontWeight: "400",
  },
  signupLink: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "700",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  footerLink: {
    fontSize: 12,
    color: "#A8A29E",
    fontWeight: "400",
  },
});
