import CustomIcon from "@/components/CustomIcon";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

type TabBarIconProps = {
  library?: "ionicons" | "fontawesome5";
  focusedIcon: string;
  unfocusedIcon: string;
  color: string;
  focused: boolean;
};

function TabBarIcon({
  library = "ionicons",
  focusedIcon,
  unfocusedIcon,
  color,
  focused,
}: TabBarIconProps) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
      <CustomIcon
        library={library}
        name={focused ? focusedIcon : unfocusedIcon}
        size={24}
        color={color}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#374151",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.3,
          shadowRadius: 35.7,
          paddingTop: 0,
          paddingBottom: 10,
          paddingHorizontal: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 2,
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarItemStyle: {
          paddingVertical: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focusedIcon="home"
              unfocusedIcon="home-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Login"
        options={{
          title: "Login",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focusedIcon="chatbubble"
              unfocusedIcon="chatbubble-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              library="fontawesome5"
              focusedIcon="shopping-bag"
              unfocusedIcon="shopping-bag"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              library="fontawesome5"
              focusedIcon="cog"
              unfocusedIcon="cog"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focusedIcon="person-circle"
              unfocusedIcon="person-circle-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  iconContainerActive: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

// https://www.figma.com/design/gRr7umV2xdTem0KvOmHXog/Ai-Chat-MobileUI-Design--Community-?node-id=0-1&p=f&m=draw
