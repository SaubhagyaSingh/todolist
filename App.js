import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  AsyncStorage,
} from "react-native";
import { StatusBar } from "expo-status-bar"; // Make sure you have the correct import for StatusBar.
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== "") {
      setTaskItems([...taskItems, task]);
      setTask(""); // Clear the input field
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.heading}>My Tasks</Text>
      </View>
      <View style={styles.tasks}>
        {taskItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => completeTask(index)}>
            <Task text={item} />
          </TouchableOpacity>
        ))}
      </View>
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
    paddingHorizontal: 94,
    justifyContent: "center",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
  },
  tasks: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  writeTaskWrapper: {
    height: 60,
    position: "absolute",
    bottom: 80,
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    width: 250,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderColor: "#B1E4DB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
  },
  addText: {},
});
