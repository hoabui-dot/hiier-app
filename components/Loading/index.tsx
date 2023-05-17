import { Center } from 'native-base';
import { ActivityIndicator } from 'react-native';

const Loading = () => (
    <Center style={{ flex: 1 }}>
      <ActivityIndicator />
    </Center>
);
export default Loading;
