import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileMenuProps = {
  visible: boolean;
  onClose: () => void;
};

export default function ProfileMenu({ visible, onClose }: ProfileMenuProps) {
  const menuItems: {
    id: number;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    {
      id: 1,
      title: "My Account",
      icon: "person",
    },
    {
      id: 2,
      title: "Subscriptions",
      icon: "card",
    },
    {
      id: 3,
      title: "Digital Services",
      icon: "grid",
    },
    {
      id: 4,
      title: "Offers",
      icon: "gift",
    },
    {
      id: 5,
      title: "Tax Certificate",
      icon: "document-text",
    },
    {
      id: 6,
      title: "Contact Us",
      icon: "call",
    },
    {
      id: 7,
      title: "Logout",
      icon: "log-out",
    },
  ];

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
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="menu" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Menu</Text>
          <TouchableOpacity style={styles.headerIcon} onPress={onClose}>
            <Ionicons name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileContainer}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={24} color="#ffffff" />
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>Muhammad Inam</Text>
                <Text style={styles.userPhone}>03455919179</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-circle-outline" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconContainer}>
                    <Ionicons
                      name={item.icon as keyof typeof Ionicons.glyphMap}
                      size={20}
                      color="#ffffff"
                    />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version: 1.0.34</Text>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    marginBottom: 24,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4b5563",
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9ca3af",
  },
  addButton: {
    padding: 8,
  },
  menuSection: {
    gap: 36,
  },
  menuItem: {
    paddingVertical: 4,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  versionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#fbbf24",
  },
});
