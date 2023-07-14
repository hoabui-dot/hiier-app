import React, { useMemo } from 'react';
import { ITheme, Modal, useTheme } from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { PURPLE_COLOR, WHITE_COLOR } from '../../constants/ui';

export interface ResetPasswordMessageModalProps {
  isOpen: boolean;
  description: string;
}

const { height, width } = Dimensions.get('window');

const SuccessNotificationModal = ({
  isOpen, description
}: ResetPasswordMessageModalProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <Modal
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isOpen={isOpen}
    >
      <View style={styles.modal}>
        <Image
          style={styles.image}
          source={require('../../assets/success.png')}
        />
        <Text style={styles.description}>{description}</Text>
        <ActivityIndicator color={PURPLE_COLOR} size="large" />
      </View>
    </Modal>
  );
};

export default SuccessNotificationModal;

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    modal: {
      backgroundColor: WHITE_COLOR,
      width: width / 1.2,
      paddingVertical: 40,
      borderRadius: 30,
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    image: {
      width: width / 1.8,
      height: width / 1.8,
    },
    description: {
      textAlign: 'center',
      fontSize: 16,
      marginBottom: 20,
    },
  });
