import { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'

const InputForm = ({
  placeholderInput,
  valueInput,
  isSecure,
  handleChangeInput,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const focusStyle = isFocused ? styles.focusInput : styles.notFocusInput

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <>
      <TextInput
        style={[styles.inputLogin, focusStyle]}
        placeholder={placeholderInput}
        placeholderTextColor={'grey'}
        value={valueInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={isSecure}
        onChangeText={handleChangeInput}
      />
    </>
  )
}

export default InputForm

const styles = StyleSheet.create({
  inputLogin: {
    width: '70%',
    minWidth: '70%',
    height: 'auto',
    borderBottomWidth: 2,
    // outlineWidth: 0,
    padding: 10,
    marginBottom: 30,
    color: '#000000',
  },
  focusInput: {
    borderColor: '#007AFF',
  },
  notFocusInput: {
    borderColor: '#DDDDDD',
  },
})
