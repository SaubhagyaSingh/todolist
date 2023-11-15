import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const Task = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.text);

  const editTask = () => {
    setEditing(!isEditing);

    props.onEdit(props.index, editedText);

    if (!isEditing) {
      setEditedText(props.text);
    }
  };

  const handleTextChange = (text) => {
    setEditedText(text);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemsleft}>
        <TouchableOpacity
          onPress={editTask}
          style={styles.squaresymbol}
        ></TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            onChangeText={handleTextChange}
            value={editedText}
            autoFocus={true}
            onBlur={editTask}
          />
        ) : (
          <Text style={styles.textstyle}>{props.text}</Text>
        )}
      </View>
      <View style={styles.circleicon}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textstyle: {},
  itemsleft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  circleicon: {},
  squaresymbol: {
    marginRight: 10,
    borderRadius: 8,
    width: 24,
    height: 24,
    backgroundColor: "#00FFD2",
  },
});
export default Task;
