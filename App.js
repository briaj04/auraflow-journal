import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard, TouchableWithoutFeedback } from "react-native";




function HomeScreen() {
  return (
    <LinearGradient
      colors={["#0B1220", "#2DD4BF", "#A78BFA"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "600",
          color: "#E5E7EB",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        Welcome to AuraFlow
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#F0F0F0",
          textAlign: "center",
        }}
      >
        A gentle space to reflect, breathe, and grow.
      </Text>
    </LinearGradient>
  );
}

function JournalScreen() {
  const [text, setText] = React.useState("");
  const [savedMessage, setSavedMessage] = React.useState("");
  const [entries, setEntries] = React.useState([]);


  React.useEffect(() => {
  async function loadEntries() {
    const saved = await AsyncStorage.getItem("entries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }
  loadEntries();
}, []);



  async function handleSave() {
  try {
    const existing = await AsyncStorage.getItem("entries");
    let list = existing ? JSON.parse(existing) : [];

    const newEntry = {
      text: text,
      date: new Date().toISOString(),
    };

    list.push(newEntry);

    await AsyncStorage.setItem("entries", JSON.stringify(list));

    setEntries(list); // update the list on screen

    setSavedMessage("Entry saved!");
    setTimeout(() => setSavedMessage(""), 2000);

  } catch (error) {
    setSavedMessage("Error saving entry");
    setTimeout(() => setSavedMessage(""), 2000);
  }
}



  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <LinearGradient
      colors={["#0B1220", "#2DD4BF", "#A78BFA"]}
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          color: "#E5E7EB",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Journal Entry
      </Text>

      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: 12,
          padding: 12,
          height: 250,
          marginBottom: 16,
        }}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Write your thoughts here..."
          placeholderTextColor="#D1D5DB"
          multiline
          style={{
            color: "white",
            fontSize: 14,
            textAlignVertical: "top",
            height: "100%",
          }}
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: "rgba(255,255,255,0.25)",
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
          Save Entry
        </Text>
      </TouchableOpacity>

      {savedMessage !== "" && (
        <Text
          style={{
            color: "#E5E7EB",
            textAlign: "center",
            marginTop: 12,
            fontSize: 16,
          }}
        >
          {savedMessage}
        </Text>
      )}
    </LinearGradient>
  </TouchableWithoutFeedback>
);

}




function InsightsScreen() {
  return (
    <LinearGradient
      colors={["#0B1220", "#2DD4BF", "#A78BFA"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          color: "#E5E7EB",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        My Insights
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#F0F0F0",
          textAlign: "center",
        }}
      >
        Your emotional patterns and trends will appear here.
      </Text>
    </LinearGradient>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Journal" component={JournalScreen} />
        <Tab.Screen name="Insights" component={InsightsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
