import React, { useState, useEffect } from "react";
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B1E4DB",
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
    color: "black",
  },
  tasks: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  writeTaskWrapper: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
