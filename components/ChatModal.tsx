import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  avatar: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
  status?: "sent" | "delivered" | "read";
}

interface ChatModalProps {
  visible: boolean;
  chat: ChatItem | null;
  onClose: () => void;
}

export default function ChatModal({ visible, chat, onClose }: ChatModalProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! How are you doing?",
      time: "2:25 PM",
      isMe: false,
    },
    {
      id: "2",
      text: "I'm doing great! Thanks for asking. How about you?",
      time: "2:26 PM",
      isMe: true,
      status: "read",
    },
    {
      id: "3",
      text: "I'm good too! Working on some exciting projects",
      time: "2:27 PM",
      isMe: false,
    },
    {
      id: "4",
      text: "That sounds awesome! Would love to hear more about it",
      time: "2:28 PM",
      isMe: true,
      status: "delivered",
    },
    {
      id: "5",
      text: "Sure! Let me tell you about this new AI chat app we're building",
      time: "2:29 PM",
      isMe: false,
    },
    {
      id: "6",
      text: "How can I help you today?",
      time: "2:30 PM",
      isMe: false,
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: true,
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate AI response after 1 second
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message! I'm here to help you with anything you need.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isMe: false,
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isMe ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.isMe ? styles.myMessageBubble : styles.otherMessageBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.isMe ? styles.myMessageText : styles.otherMessageText,
          ]}
        >
          {item.text}
        </Text>
        <View style={styles.messageFooter}>
          <Text
            style={[
              styles.messageTime,
              item.isMe ? styles.myMessageTime : styles.otherMessageTime,
            ]}
          >
            {item.time}
          </Text>
          {item.isMe && item.status && (
            <Ionicons
              name={
                item.status === "sent"
                  ? "checkmark"
                  : item.status === "delivered"
                    ? "checkmark-done"
                    : "checkmark-done"
              }
              size={16}
              color={item.status === "read" ? "#22c55e" : "#9ca3af"}
              style={styles.messageStatus}
            />
          )}
        </View>
      </View>
    </View>
  );

  if (!chat) return null;

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.chatInfo}>
            <Text style={styles.chatAvatar}>{chat.avatar}</Text>
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatStatus}>
                {chat.isOnline ? "Online" : "Last seen recently"}
              </Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="videocam" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="call" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="ellipsis-vertical" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          inverted={false}
        />

        {/* Input Area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="add" size={24} color="#9ca3af" />
            </TouchableOpacity>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor="#9ca3af"
                value={message}
                onChangeText={setMessage}
                multiline
                maxLength={1000}
              />
              <TouchableOpacity style={styles.emojiButton}>
                <Ionicons name="happy" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.sendButton,
                message.trim()
                  ? styles.sendButtonActive
                  : styles.sendButtonInactive,
              ]}
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <Ionicons
                name={message.trim() ? "send" : "mic"}
                size={20}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#2c3e50",
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  chatInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
    marginRight: 12,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 2,
  },
  chatStatus: {
    fontSize: 12,
    fontWeight: "400",
    color: "#9ca3af",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  messagesList: {
    flex: 1,
    backgroundColor: "#374151",
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageContainer: {
    paddingHorizontal: 16,
    marginVertical: 2,
  },
  myMessage: {
    alignItems: "flex-end",
  },
  otherMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  myMessageBubble: {
    backgroundColor: "#22c55e",
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: "#4b5563",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: "#ffffff",
  },
  otherMessageText: {
    color: "#ffffff",
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    justifyContent: "flex-end",
  },
  messageTime: {
    fontSize: 11,
    fontWeight: "400",
  },
  myMessageTime: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  otherMessageTime: {
    color: "#9ca3af",
  },
  messageStatus: {
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: "#2c3e50",
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#374151",
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#374151",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 40,
    maxHeight: 100,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
    paddingVertical: 4,
    textAlignVertical: "center",
  },
  emojiButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonActive: {
    backgroundColor: "#22c55e",
  },
  sendButtonInactive: {
    backgroundColor: "#374151",
  },
});
