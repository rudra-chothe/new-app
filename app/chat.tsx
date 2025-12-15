import ChatModal from "@/components/ChatModal";
import ProfileMenu from "@/components/ProfileMenu";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
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

export default function Chat() {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [chatModalVisible, setChatModalVisible] = useState(false);

  const chatData: ChatItem[] = [
    {
      id: "1",
      name: "AI Assistant",
      lastMessage: "How can I help you today?",
      time: "2:30 PM",
      unreadCount: 3,
      avatar: "🤖",
      isOnline: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      lastMessage: "Thanks for the help with the project!",
      time: "1:45 PM",
      avatar: "👩‍💼",
      isOnline: true,
    },
    {
      id: "3",
      name: "Tech Support",
      lastMessage: "Your issue has been resolved",
      time: "12:20 PM",
      unreadCount: 1,
      avatar: "🛠️",
      isOnline: false,
    },
    {
      id: "4",
      name: "Marketing Team",
      lastMessage: "New campaign ideas are ready for review",
      time: "11:30 AM",
      avatar: "📈",
      isOnline: true,
    },
    {
      id: "5",
      name: "John Smith",
      lastMessage: "Let's schedule a meeting for tomorrow",
      time: "10:15 AM",
      unreadCount: 2,
      avatar: "👨‍💻",
      isOnline: false,
    },
    {
      id: "6",
      name: "Design Team",
      lastMessage: "New mockups are available",
      time: "Yesterday",
      avatar: "🎨",
      isOnline: true,
    },
    {
      id: "7",
      name: "Customer Service",
      lastMessage: "How was your experience with us?",
      time: "Yesterday",
      avatar: "💬",
      isOnline: false,
    },
    {
      id: "8",
      name: "Development Team",
      lastMessage: "Code review completed successfully",
      time: "2 days ago",
      avatar: "💻",
      isOnline: true,
    },
  ];

  const openChat = (chat: ChatItem) => {
    setSelectedChat(chat);
    setChatModalVisible(true);
  };

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => openChat(item)}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionButton}>
            <Ionicons name="search" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => setProfileMenuVisible(true)}
          >
            <Ionicons name="person-circle" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>

      <ProfileMenu
        visible={profileMenuVisible}
        onClose={() => setProfileMenuVisible(false)}
      />

      <ChatModal
        visible={chatModalVisible}
        chat={selectedChat}
        onClose={() => setChatModalVisible(false)}
      />
    </SafeAreaView>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#2c3e50",
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "400",
    color: "#ffffff",
    textAlign: "center",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#374151",
    textAlign: "center",
    lineHeight: 50,
    fontSize: 20,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#2c3e50",
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  chatTime: {
    fontSize: 12,
    fontWeight: "400",
    color: "#9ca3af",
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9ca3af",
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: "#22c55e",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
