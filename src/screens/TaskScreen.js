import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {TaskContext} from '../context/TaskContext';
import Loader from '../components/Loader';
import Error from '../components/Error';

export default function TaskScreen() {
  const route = useRoute();
  const {userId} = route.params;
  const {
    tasks,
    loading,
    error,
    removeTask,
    addTask,
    setNewTaskTitle,
    newTaskTitle,
  } = useContext(TaskContext);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <>
          <FlatList
            data={tasks}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={styles.title}>
                  {item.title.length > 30
                    ? item.title.slice(0, 30) + '...'
                    : item.title}
                </Text>
                <Button
                  onPress={() => removeTask(item.id)}
                  style={styles.button}
                  title="Remove"
                  color={'#af9'}
                />
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
              value={newTaskTitle}
              placeholder="New Task Title"
              style={styles.input}
              onChangeText={setNewTaskTitle}
            />
            <Button onPress={() => addTask(newTaskTitle)} title="Add Task" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#2f3645',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderWidth: 1,
    width: '75%',
    padding: 5,
    borderRadius: 5,
  },
  inputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
});
