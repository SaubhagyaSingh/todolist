import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Task from "./components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedTask = await AsyncStorage.getItem("task");
      const parsedTask = JSON.parse(storedTask) || [];
      setTaskItems(parsedTask);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("task", JSON.stringify(taskItems));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== "") {
      setTaskItems([...taskItems, task]);
      setTask("");
    }
  };

  const editTask = (index, newText) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index] = newText;
    setTaskItems(itemsCopy);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  useEffect(() => {
    saveData();
  }, [taskItems]);

  return (
    <ImageBackground
      source={require("./assets/bg1.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.heading}>My Tasks</Text>
        </View>
        <ScrollView style={styles.tasks}>
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              {/* Pass onEdit callback to Task component */}
              <Task text={item} index={index} onEdit={editTask} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Add another Task"}
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.button}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    paddingTop: 100,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  tasks: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  writeTaskWrapper: {
    flex: 1,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 700,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 0,
    marginLeft: 0,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  bg: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  addText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
