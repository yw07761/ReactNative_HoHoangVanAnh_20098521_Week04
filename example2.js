// Cac phan tu trong chuoi + them 1
import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'

 export default function App() {
     const [numbers, setNumbers] = useState([5,6,7])
     return (
        <View>
           <Button
               title="Increase number in array"
                  onPress={() => {
                     setNumbers(numbers.map(num => num + 1)) // Tang moi phan tu len 1
                  }}/>
        {numbers.map((numbers, index) => (
        <Text style={{ fontSize: 24 }} key={index}>
          {numbers}
        </Text>
      ))}
    </View>
   )
 }
