import {
  IInputProps,
  Input as NBInput,
} from 'native-base';

interface InputProps extends IInputProps {}

const Input = (props: InputProps) => {

  return (
    <NBInput
      borderRadius={'base'}
      // backgroundColor={'white'}
      color={'gray.500'}
      fontSize={'md'}
      focusOutlineColor={'violet.500'}
      width={'full'}
      height={50}
      fontWeight={'semibold'}
      backgroundColor={'white'}
      {...props}
    />
  );
};

export default Input;
