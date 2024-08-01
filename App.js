import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';

export default function App() {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const AgregarTarea = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null);
    }

    const TareaCompletada = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy)
    }

    return ( <
        View style = { styles.container } > { /* scroll por si la lista es larga*/ } <
        ScrollView contentContainerStyle = {
            {
                flexGrow: 1
            }
        }
        keyboardShouldPersistTaps = 'handled' >

        { /* To Do List */ } <
        View style = { styles.tasksContenedor } >
        <
        Text style = { styles.sectionTitulo } > To Do List < /Text> <
        View style = { styles.items } > { /* Items */ } {
            taskItems.map((item, index) => {
                return ( <
                    TouchableOpacity key = { index }
                    onPress = {
                        () => TareaCompletada(index) } >
                    <
                    Task text = { item }
                    />  <
                    /TouchableOpacity>
                )
            })
        } <
        /View> <
        /View>

        <
        /ScrollView>

        { /* Crear Item */ } { /* Que el teclado mueva todo para arriba, no que lo tape */ } <
        KeyboardAvoidingView behavior = { Platform.OS === "ios" ? "padding" : "height" }
        style = { styles.agregarTareacontenedor } >
        <
        TextInput style = { styles.input }
        placeholder = { 'Agregar Item...' }
        value = { task }
        onChangeText = { text => setTask(text) }
        /> <
        TouchableOpacity onPress = {
            () => AgregarTarea() } >
        <
        View style = { styles.addWrapper } >
        <
        Text style = { styles.addText } > + < /Text> <
        /View> <
        /TouchableOpacity> <
        /KeyboardAvoidingView>

        <
        /View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksContenedor: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitulo: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
    agregarTareacontenedor: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {},
});