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

export default function Shop() {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const features = [
    "Tortor interdum condimentum nunc molestie quam lectus.",
    "Tortor interdum condimentum nunc molestie quam lectus.",
    "Tortor interdum condimentum nunc molestie quam lectus.",
    "Tortor interdum condimentum nunc molestie quam lectus.",
    "Tortor interdum condimentum nunc molestie quam lectus.",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop</Text>
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
        {/* Pricing Card */}
        <View style={styles.pricingCard}>
          <View style={styles.cardContent}>
            {/* Header Section */}
            <View style={styles.cardHeader}>
              <View style={styles.priceBlock}>
                <Text style={styles.planType}>Team</Text>
                <View style={styles.amountBlock}>
                  <Text style={styles.amount}>$39</Text>
                  <View style={styles.captionContainer}>
                    <Text style={styles.caption}>user / month</Text>
                  </View>
                </View>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🔥 Most popular</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>
              Aenean at lectus posuere enim id nec. Molestie neque, sed fusce
              faucibus.
            </Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Features List */}
            <View style={styles.featuresList}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.checkIcon}>
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#22c55e"
                    />
                  </View>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Purchase Button */}
          <TouchableOpacity style={styles.purchaseButton}>
            <Text style={styles.purchaseButtonText}>Purchase Now</Text>
          </TouchableOpacity>
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
    paddingTop: 24,
  },
  pricingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#19252b",
    shadowColor: "#0f1728",
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 25,
    marginBottom: 24,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  priceBlock: {
    flex: 1,
  },
  planType: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a262c",
    marginBottom: 8,
  },
  amountBlock: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#171717",
    lineHeight: 40,
    letterSpacing: -0.64,
  },
  captionContainer: {
    paddingBottom: 4,
  },
  caption: {
    fontSize: 14,
    fontWeight: "500",
    color: "#a3a3a3",
    lineHeight: 20,
  },
  badge: {
    backgroundColor: "#eef2ff",
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#19252b",
    textAlign: "center",
    lineHeight: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    color: "#737373",
    lineHeight: 24,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginBottom: 24,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  checkIcon: {
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: "#404040",
    lineHeight: 24,
  },
  purchaseButton: {
    backgroundColor: "#19252b",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    margin: 20,
    marginTop: 0,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    lineHeight: 18,
    textAlign: "center",
  },
});
