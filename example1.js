import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
 export default function App() {
     const [counter, setCounter] = useState(0)
     const [numbers, setNumbers] = useState([])
     return (
        <View>
           <Button
               title="Add number!"
                  onPress={() => {
                     setCounter(counter + 1)
                     setNumbers([ counter + 1])
                  }}/>
     {numbers.map((numbers, index) => (
        <Text style={{ fontSize: 24 }} key={index}>
          {numbers}
        </Text>
      ))}
    </View>
   )
 }
