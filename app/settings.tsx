import ProfileMenu from "@/components/ProfileMenu";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Todos = Todo[];

export default function Settings() {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [todos, setTodos] = useState<Todos>([]);

  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const data = await response.json();
    // Ensure data is always an array
    setTodos(Array.isArray(data) ? data : [data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();

    console.log("second");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settingssssss</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => setProfileMenuVisible(true)}
        >
          <Ionicons name="person-circle" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        style={{ flex: 1 }}
        // pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={todos}
        refreshing={loading}
        onRefresh={fetchTodos}
        renderItem={({ item }) => (
          <Text style={styles.todoText}>{item.title}</Text>
        )}
      />

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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#9ca3af",
    textAlign: "center",
  },
  todoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: "#8bbc37ff",
    padding: 16,
    borderRadius: 8,
  },
});
