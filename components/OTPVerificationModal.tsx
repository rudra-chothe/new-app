import CustomIcon from "@/components/CustomIcon";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

interface OTPVerificationModalProps {
  visible: boolean;
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onClose: () => void;
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({
  visible,
  phoneNumber,
  onVerify,
  onClose,
}) => {
  const [otpValue, setOtpValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible]);

  useEffect(() => {
    if (visible && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [visible]);

  const handleOtpChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 6) {
      setOtpValue(cleaned);
    }
  };

  const handleVerify = () => {
    if (otpValue.length === 6) {
      Keyboard.dismiss();
      onVerify(otpValue);
      setOtpValue("");
      setTimeLeft(30);
      setCanResend(false);
    }
  };

  const handleResend = () => {
    setOtpValue("");
    setTimeLeft(30);
    setCanResend(false);
  };

  const handleClose = () => {
    Keyboard.dismiss();
    setOtpValue("");
    setTimeLeft(30);
    setCanResend(false);
    onClose();
  };

  const handleOtpBoxPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatTime = (seconds: number) => {
    return `00:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleClose}>
              <CustomIcon
                library="ionicons"
                name="arrow-back"
                size={24}
                color="#0F172A"
              />
            </TouchableOpacity>
            <View style={{ width: 40 }} />
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Title Section */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>Verification Code</Text>
              <Text style={styles.subtitle}>
                Please enter the 6-digit code sent to{"\n"}
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
              </Text>
            </View>

            {/* Hidden TextInput for keyboard */}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={otpValue}
              onChangeText={handleOtpChange}
              keyboardType="number-pad"
              maxLength={6}
              caretHidden={true}
              showSoftInputOnFocus={true}
            />

            {/* OTP Input Fields */}
            <TouchableOpacity activeOpacity={1} onPress={handleOtpBoxPress}>
              <View style={styles.otpContainer}>
                {[...Array(6)].map((_, index) => {
                  const digit = otpValue[index];
                  const isFilled = digit !== undefined;
                  const isActive = index === otpValue.length;

                  return (
                    <View
                      key={index}
                      style={[
                        styles.otpBox,
                        isFilled && styles.otpBoxFilled,
                        isActive && styles.otpBoxActive,
                      ]}
                    >
                      <Text style={styles.otpText}>{digit || ""}</Text>
                    </View>
                  );
                })}
              </View>
            </TouchableOpacity>

            {/* Resend Timer */}
            <View style={styles.timerContainer}>
              <CustomIcon
                library="ionicons"
                name="timer"
                size={20}
                color="#94A3B8"
              />
              {canResend ? (
                <TouchableOpacity onPress={handleResend}>
                  <Text style={styles.resendLink}>Resend code</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.timerText}>
                  Resend code in{" "}
                  <Text style={styles.timerValue}>{formatTime(timeLeft)}</Text>
                </Text>
              )}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[
                styles.verifyButton,
                otpValue.length < 6 && styles.verifyButtonDisabled,
              ]}
              onPress={handleVerify}
              disabled={otpValue.length < 6}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
              <CustomIcon
                library="ionicons"
                name="arrow-forward"
                size={20}
                color="#0F172A"
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default OTPVerificationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    backgroundColor: "#F8F8F5",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "95%",
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: "#0F172A",
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 26,
  },
  phoneNumber: {
    color: "#1E293B",
    fontWeight: "600",
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 8,
  },
  otpBox: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  otpBoxFilled: {
    borderColor: "#F9F506",
  },
  otpBoxActive: {
    borderColor: "#F9F506",
  },
  otpText: {
    fontSize: 24,
    color: "#0F172A",
    fontWeight: "700",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 32,
  },
  timerText: {
    fontSize: 16,
    color: "#94A3B8",
    fontWeight: "500",
  },
  timerValue: {
    color: "#1E293B",
    fontWeight: "500",
  },
  resendLink: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "600",
  },
  verifyButton: {
    height: 56,
    backgroundColor: "#F9F506",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
    shadowColor: "#F9F506",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  verifyButtonText: {
    fontSize: 18,
    color: "#0F172A",
    fontWeight: "700",
  },
  numberPadContainer: {
    backgroundColor: "#F1F5F9",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 12,
  },
  numberPadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  numberButton: {
    flex: 1,
    height: 48,
    borderRadius: 32,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  numberButtonPlaceholder: {
    flex: 1,
  },
  numberText: {
    fontSize: 24,
    color: "#0F172A",
    fontWeight: "500",
  },
});
