/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProfileMenu from "@/components/ProfileMenu";

const Profile = () => {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  useEffect(() => {
    setProfileMenuVisible(true);
  }, []);

  return (
    <ProfileMenu
      visible={profileMenuVisible}
      onClose={() => setProfileMenuVisible(false)}
    />
  );
};

export default Profile;

const styles = StyleSheet.create({});
