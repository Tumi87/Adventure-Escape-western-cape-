import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="about" options={{ title: "About Us" }} />
      <Tabs.Screen name="overview" options={{ title: "Overview" }} />
      <Tabs.Screen name="fees" options={{ title: "Fees" }} />
      <Tabs.Screen name="contact" options={{ title: "Contact Us" }} />
    </Tabs>
  );
}