import CustomIcon from "@/components/CustomIcon";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F5" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Profile */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              {/* <Image
                source={{ uri: "https://placehold.co/40x40" }}
                style={styles.avatar}
              /> */}
              <CustomIcon
                library="ionicons"
                name="person"
                size={30}
                color="#1C1C0D"
              />
              <View style={styles.onlineIndicator} />
            </View>
            <View style={styles.greetingContainer}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.username}>Alex Johnson</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <CustomIcon
              library="ionicons"
              name="notifications"
              size={24}
              color="#1C1C0D"
            />
          </TouchableOpacity>
        </View>

        {/* Dashboard Title */}
        <View style={styles.titleSection}>
          <Text style={styles.dashboardTitle}>Dashboard</Text>
          <Text style={styles.dateText}>{dateString}</Text>
        </View>

        {/* Main Device Card */}
        <View style={styles.deviceCard}>
          <View style={styles.deviceHeader}>
            <View>
              <View style={styles.connectedBadge}>
                <View style={styles.connectedDot} />
                <Text style={styles.connectedText}>CONNECTED</Text>
              </View>
              <Text style={styles.deviceName}>Smart Scale 3000</Text>
              <Text style={styles.syncText}>Last synced: 2 min ago</Text>
            </View>
            <View style={styles.batteryBadge}>
              <CustomIcon
                library="ionicons"
                name="battery-full"
                size={16}
                color="#16A34A"
              />
              <Text style={styles.batteryText}>94%</Text>
            </View>
          </View>

          <View style={styles.weightDisplay}>
            <View>
              <Text style={styles.weightValue}>72.4</Text>
              <Text style={styles.weightUnit}>kg</Text>
            </View>
            <TouchableOpacity style={styles.bluetoothButton}>
              <CustomIcon
                library="ionicons"
                name="bluetooth"
                size={20}
                color="#1C1C0D"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <CustomIcon
                library="ionicons"
                name="trending-down"
                size={20}
                color="#2563EB"
              />
            </View>
            <Text style={styles.statLabel}>Weight Change</Text>
            <Text style={styles.statValue}>-1.2 kg</Text>
          </View>
          <View style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#FFF7ED" }]}
            >
              <CustomIcon
                library="ionicons"
                name="flag"
                size={20}
                color="#EA580C"
              />
            </View>
            <Text style={styles.statLabel}>Goal Target</Text>
            <Text style={styles.statValue}>70.0 kg</Text>
          </View>
        </View>

        {/* Membership Card */}
        <View style={styles.membershipCard}>
          <View style={styles.membershipHeader}>
            <View style={styles.membershipInfo}>
              <View style={styles.membershipIconContainer}>
                <CustomIcon
                  library="ionicons"
                  name="star"
                  size={20}
                  color="#A16207"
                />
              </View>
              <View>
                <Text style={styles.membershipTitle}>Pro Membership</Text>
                <Text style={styles.membershipSubtitle}>Premium Features</Text>
              </View>
            </View>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.planDurationSection}>
            <View style={styles.planDurationRow}>
              <Text style={styles.planLabel}>Plan Duration</Text>
              <Text style={styles.planValue}>24 days remaining</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <TouchableOpacity style={styles.viewPlanButton}>
            <Text style={styles.viewPlanText}>View Plan Details</Text>
            <CustomIcon
              library="ionicons"
              name="chevron-forward"
              size={16}
              color="#1C1C0D"
            />
          </TouchableOpacity>
        </View>

        {/* CTA Button */}
        <TouchableOpacity style={styles.ctaButton}>
          <View>
            <Text style={styles.ctaTitle}>Manage Weighing Machine</Text>
            <Text style={styles.ctaSubtitle}>Configure BLE & Settings</Text>
          </View>
          <View style={styles.ctaIconContainer}>
            <CustomIcon
              library="ionicons"
              name="arrow-forward"
              size={20}
              color="#1C1C0D"
            />
          </View>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
    paddingTop: 48,
    paddingBottom: 24,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22C55E",
    borderWidth: 2,
    borderColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  greetingContainer: {
    gap: 2,
  },
  welcomeText: {
    fontSize: 12,
    color: "#9E9D47",
    fontWeight: "500",
  },
  username: {
    fontSize: 14,
    color: "#1C1C0D",
    fontWeight: "700",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  titleSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 4,
  },
  dashboardTitle: {
    fontSize: 30,
    color: "#1C1C0D",
    fontWeight: "700",
  },
  dateText: {
    fontSize: 14,
    color: "#9E9D47",
    fontWeight: "500",
  },
  deviceCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    gap: 24,
  },
  deviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  connectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  connectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },
  connectedText: {
    fontSize: 12,
    color: "#16A34A",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  deviceName: {
    fontSize: 20,
    color: "#1C1C0D",
    fontWeight: "700",
    marginBottom: 4,
  },
  syncText: {
    fontSize: 12,
    color: "#9E9D47",
    fontWeight: "400",
  },
  batteryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#F8F8F5",
    borderRadius: 20,
  },
  batteryText: {
    fontSize: 12,
    color: "#1C1C0D",
    fontWeight: "700",
  },
  weightDisplay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  weightValue: {
    fontSize: 36,
    color: "#1C1C0D",
    fontWeight: "700",
  },
  weightUnit: {
    fontSize: 18,
    color: "#9E9D47",
    fontWeight: "500",
  },
  bluetoothButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9F506",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F9F506",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 32,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8F8F5",
    justifyContent: "center",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#9E9D47",
    fontWeight: "500",
  },
  statValue: {
    fontSize: 18,
    color: "#1C1C0D",
    fontWeight: "700",
  },
  membershipCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    gap: 16,
  },
  membershipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  membershipInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  membershipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: "rgba(249, 245, 6, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  membershipTitle: {
    fontSize: 14,
    color: "#1C1C0D",
    fontWeight: "700",
  },
  membershipSubtitle: {
    fontSize: 12,
    color: "#9E9D47",
    fontWeight: "400",
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#DCFCE7",
    borderRadius: 20,
  },
  activeBadgeText: {
    fontSize: 10,
    color: "#15803D",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.25,
  },
  planDurationSection: {
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F8F8F5",
  },
  planDurationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planLabel: {
    fontSize: 12,
    color: "#9E9D47",
    fontWeight: "500",
  },
  planValue: {
    fontSize: 12,
    color: "#1C1C0D",
    fontWeight: "700",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#F8F8F5",
    borderRadius: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "88%",
    backgroundColor: "#F9F506",
    borderRadius: 20,
  },
  viewPlanButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#F8F8F5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  viewPlanText: {
    fontSize: 14,
    color: "#1C1C0D",
    fontWeight: "700",
  },
  ctaButton: {
    marginHorizontal: 24,
    marginBottom: 24,
    paddingLeft: 24,
    paddingRight: 8,
    paddingVertical: 16,
    backgroundColor: "#F9F506",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#F9F506",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  ctaTitle: {
    fontSize: 16,
    color: "#1C1C0D",
    fontWeight: "700",
  },
  ctaSubtitle: {
    fontSize: 12,
    color: "rgba(28, 28, 13, 0.7)",
    fontWeight: "400",
  },
  ctaIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSpacing: {
    height: 20,
  },
});
