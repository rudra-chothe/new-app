import ProfileMenu from "@/components/ProfileMenu";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const chatItems = [
    {
      id: 1,
      title: "Who is Elon Musk...",
      subtitle: "Lorem ipsum dolor sit amet...",
      iconColor: "#6cc8fd",
    },
    {
      id: 2,
      title: "New Ai websites...",
      subtitle: "Lorem ipsum dolor sit amet...",
      iconColor: "#74f691",
    },
    {
      id: 3,
      title: "There is a new food",
      subtitle: "Lorem ipsum dolor sit amet...",
      iconColor: "#fda660",
    },
    {
      id: 4,
      title: "How many types of walle...",
      subtitle: "Lorem ipsum dolor sit amet...",
      iconColor: "#6cc8fd",
    },
  ];

  const featureCards = [
    {
      id: 1,
      title: "AI Voice Generator",
      subtitle: "Let's see what can I do for you?",
      backgroundColor: "#f59e0b",
      icon: "mic",
    },
    {
      id: 2,
      title: "Text-to-speech",
      backgroundColor: "#f97316",
      icon: "chatbubble-ellipses",
    },
    {
      id: 3,
      title: "Music Maker",
      backgroundColor: "#8b5cf6",
      icon: "musical-notes",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => setProfileMenuVisible(true)}
        >
          <Ionicons name="person-circle" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Good Morning! Inam 👋</Text>
          <Text style={styles.subtitleText}>
            Let&apos;s see what can I do for you?
          </Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.featureCardsContainer}>
          <View style={styles.featureCardLarge}>
            <View
              style={[
                styles.featureCard,
                { backgroundColor: featureCards[0].backgroundColor },
              ]}
            >
              <View style={styles.featureIconContainer}>
                <View style={styles.featureIcon}>
                  <Ionicons
                    name={featureCards[0].icon as any}
                    size={20}
                    color="#ffffff"
                  />
                </View>
              </View>
              <Text style={styles.featureTitle}>{featureCards[0].title}</Text>
              <Text style={styles.featureSubtitle}>
                {featureCards[0].subtitle}
              </Text>
            </View>
          </View>

          <View style={styles.featureCardsSmall}>
            {featureCards.slice(1).map((card) => (
              <View
                key={card.id}
                style={[
                  styles.featureCardSmall,
                  { backgroundColor: card.backgroundColor },
                ]}
              >
                <View style={styles.featureIconContainer}>
                  <View style={styles.featureIcon}>
                    <Ionicons
                      name={card.icon as any}
                      size={20}
                      color="#ffffff"
                    />
                  </View>
                </View>
                <Text style={styles.featureTitle}>{card.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* New Chats Section */}
        <View style={styles.chatsSection}>
          <View style={styles.chatsSectionHeader}>
            <Text style={styles.chatsTitle}>New Chats🔥</Text>
            <Text style={styles.seeAllText}>See all</Text>
          </View>

          <View style={styles.chatsList}>
            {chatItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.chatItem}>
                <View style={styles.chatContent}>
                  <View
                    style={[
                      styles.chatIcon,
                      { backgroundColor: item.iconColor },
                    ]}
                  >
                    <Ionicons name="document-text" size={24} color="#ffffff" />
                  </View>
                  <View style={styles.chatTextContainer}>
                    <Text style={styles.chatTitle}>{item.title}</Text>
                    <Text style={styles.chatSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#6b7280" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <ProfileMenu
        visible={profileMenuVisible}
        onClose={() => setProfileMenuVisible(false)}
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  greetingSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#9ca3af",
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
  featureCardsContainer: {
    flexDirection: "row",
    gap: 13,
    marginBottom: 24,
  },
  featureCardLarge: {
    flex: 1,
  },
  featureCard: {
    borderRadius: 18,
    padding: 16,
    height: 232,
    position: "relative",
  },
  featureCardsSmall: {
    flex: 1,
    gap: 12,
  },
  featureCardSmall: {
    borderRadius: 18,
    padding: 16,
    height: 110,
    position: "relative",
  },
  featureIconContainer: {
    marginBottom: 12,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    lineHeight: 22,
  },
  chatsSection: {
    marginBottom: 24,
  },
  chatsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chatsTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#ffffff",
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#9ca3af",
  },
  chatsList: {
    gap: 8,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#374151",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 0,
  },
  chatContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  chatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 17,
  },
  chatTextContainer: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  chatSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9ca3af",
    lineHeight: 20,
  },
});

// https://www.figma.com/design/gRr7umV2xdTem0KvOmHXog/Ai-Chat-MobileUI-Design--Community-?node-id=1-1998&m=draw
