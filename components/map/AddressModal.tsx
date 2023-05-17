import {
  Center,
  HStack,
  ITheme,
  Modal,
  Switch,
  useTheme,
  VStack,
} from 'native-base';
import { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Address } from '../../types/ui';
import { Text } from 'react-native';
import ButtonBase from '../Base/ButtonBase';
import TextAreaBase from '../Base/TextAreaBase';
import HeadingBase from '../Base/HeadingBase';
import InputBase from '../Base/InputBase';

interface AddressModalProps {
  showModal: boolean;
  setShowModal: () => void;
  address: Address;
  setAddress: (value: Address) => void;
  submit: () => void;
}
const AddressModal = ({
  showModal,
  setShowModal,
  address,
  setAddress,
  submit,
}: AddressModalProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <Modal isOpen={showModal} onClose={setShowModal} avoidKeyboard={true}>
      <KeyboardAvoidingView behavior='position'>
        <Center>
          <Modal.Content maxWidth={400} bottom={5}>
            <Modal.CloseButton />
            <Modal.Header>Details</Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <View>
                  <HeadingBase mb={1}>Phone:</HeadingBase>
                  <HStack alignItems={'center'} space={3}>
                    <InputBase
                      flexShrink={1}
                      keyboardType='numeric'
                      value={address.phone}
                      onChangeText={(text) =>
                        setAddress({ ...address, phone: text })
                      }
                    />
                    <View>
                      <Text>Default</Text>
                      <Switch size='sm' />
                    </View>
                  </HStack>
                </View>
                <View>
                  <HeadingBase mb={1}>Name:</HeadingBase>
                  <InputBase
                    value={address.customerName}
                    onChangeText={(text) =>
                      setAddress({ ...address, customerName: text })
                    }
                  />
                </View>
                <View>
                  <HeadingBase mb={1}>Note:</HeadingBase>
                  <TextAreaBase
                    value={address.note}
                    onChangeText={(text) =>
                      setAddress({ ...address, note: text })
                    } // for android and ios
                  />
                </View>
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <HStack alignItems={'center'} space={3}>
                <ButtonBase
                  title={'Delete'}
                  onPress={() => {}}
                  containerStyle={styles.button}
                  textStyle={styles.buttonText}
                />
                <ButtonBase
                  title={'Save'}
                  onPress={submit}
                  variant={'solid'}
                  containerStyle={styles.button}
                  textStyle={styles.buttonText}
                />
              </HStack>
            </Modal.Footer>
          </Modal.Content>
        </Center>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    input: {
      flex: 1,
      marginRight: sizes.padding * 2,
    },
    button: {
      paddingVertical: sizes.padding / 2,
    },
    buttonText: {
      fontSize: fontSizes.sm,
    },
  });

export default AddressModal;
