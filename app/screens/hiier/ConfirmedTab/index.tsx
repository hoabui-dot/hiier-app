import React, { useEffect, useMemo, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { Center } from 'native-base';
import Card from '../../../../components/Card';
import { TaskApi } from '../../../../services/api/task';
import { ITheme, useTheme, Icon, Modal } from 'native-base';
import Icons from '../../../../utils/Icon/Icons';
import { GRAY_COLOR, ROUTES, WHITE_COLOR } from '../../../../constants/ui';
import { IJobInformation } from '../../../../types/ui';
import ButtonBase from '../../../../components/Base/ButtonBase';
import { DEFAULT_JOB_INFORMATION } from '../../../../utils/defaultValue/common';
import { MessageApi } from '../../../../services/api/message';

export interface ConfirmedTabProps {
  navigation: any;
  route: any;
}

const { width, height } = Dimensions.get('screen');

const ConfirmedTab = ({ navigation, route }: ConfirmedTabProps) => {
  const [jobInformation, setJobInformation] = useState<
  IJobInformation | undefined
  >(route.params || DEFAULT_JOB_INFORMATION);
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  useEffect(() => {
    setJobInformation(route.params);
  }, [route.params]);

  const onFinishJob = () => {
    TaskApi.doneBooking(jobInformation?.id).then((res) => {
      if (res.status === 200) {
        setJobInformation(undefined);
      }
    }).catch(err => {
      console.log('lỡi: ', err);
      
    });
  };

  const onCancelJob = () => {
    TaskApi.cancelBooking(jobInformation?.id).then((res) => {
      if (res.status === 200) {
        setJobInformation(undefined);
        setIsConfirmModal(false);
      }
    }).catch(err => console.log('err', err)
    );
  };

  const ConfirmModal = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      avoidKeyboard
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <KeyboardAvoidingView behavior="position">
        <Center>
          <Modal.Content width={width - 50} height={height / 3}>
            <Modal.CloseButton />
            <Modal.Header>Xác nhận huỷ việc</Modal.Header>
            <Modal.Body style={styles.wrapModalContent}>
              <View style={styles.modal}>
                <Text style={{ textAlign: 'center' }}>
                  Huỷ việc sẽ giảm tỉ lệ nhân công việc sau này
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                  Xác nhận huỷ ?
                </Text>
              </View>
            </Modal.Body>
            <Modal.Footer style={styles.footerConfirmModal}>
              <ButtonBase title='Huỷ' onPress={() => setIsConfirmModal(false)} containerStyle={styles.buttonModal}/>
              <ButtonBase title='Xác nhận' onPress={onCancelJob} containerStyle={styles.buttonModal}/>
            </Modal.Footer>
          </Modal.Content>
        </Center>
      </KeyboardAvoidingView>
    </Modal>
  );

  const onChatMessage = async () => {
    await MessageApi.getChatGroupList().then((response) => {
      console.log("🚀 ~ file: index.tsx:106 ~ awaitMessageApi.getChatGroupList ~ response:", response)
      navigation.navigate(ROUTES.CHAT_MESSAGE, {
        customerName: jobInformation?.customerName,
        id: response.data.resource[0].groupId,
        avatar: response.data.resource[0].avatar
      })
    });
  }

  return (
    <SafeAreaView style={[styles.container, styles.wrapContent]}>
      {!jobInformation && (
        <View style={styles.noJob}>
          <Text>Bạn chưa nhận công việc nào</Text>
        </View>
      )}
      {jobInformation && (
        <Card cardStyle={{ flexDirection: 'column', margin: 10, padding: 20 }}>
          <View>
            <Text style={styles.title}>{jobInformation.taskName}</Text>
          </View>
          <Card
            cardStyle={{ width: '100%', flexDirection: 'row', marginTop: 20 }}
          >
            <View
              style={{
                minWidth: '50%',
                maxWidth: '50%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>Làm trong:</Text>
              <Text
                style={[styles.violetBoldText, { fontSize: 22 }]}
              >{`${jobInformation.duration} giờ`}</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                alignItems: 'center',
              }}
            >
              <Text style={{ marginRight: 8 }}>Số tiền(VNĐ):</Text>
              <Text style={[styles.violetBoldText, { fontSize: 22 }]}>
                {jobInformation.totalPrice}
              </Text>
            </View>
          </Card>
          <View style={styles.informationJob}>
            <Text style={{ marginRight: 8 }}>Hình thức thanh toán:</Text>
            <Text style={[styles.violetBoldText, styles.violetFontSize]}>
              {jobInformation.paymentMethod}
            </Text>
          </View>
          <View style={styles.informationJob}>
            <Text style={{ marginRight: 8 }}>Tại:</Text>
            <Text style={{ fontWeight: 'bold' }}>
              {jobInformation.address?.detail}
            </Text>
          </View>
          <View style={styles.informationJob}>
            <Text style={{ marginRight: 8 }}>Liên hệ:</Text>
            <Text
              style={{ fontWeight: 'bold' }}
            >{`${jobInformation.customerName} - ${jobInformation.customerPhone}`}</Text>
          </View>
          <View style={styles.footerCard}>
            <Text style={styles.confirmText}>
              Bạn đã nhận được công việc này, chúc bạn làm việc tốt !
            </Text>
            <View style={styles.featureCard}>
              <TouchableOpacity
                onPress={onChatMessage}
                style={{ flexDirection: 'column', alignItems: 'center' }}
              >
                <Icon as={Icons.Message} size={8} />
                <Text style={styles.descriptionTitle}>Gửi tin nhắn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      )}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => setIsConfirmModal(true)}
          style={[styles.button, styles.activeButton]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: WHITE_COLOR, fontWeight: '500' },
            ]}
          >
            xin huỷ việc
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onFinishJob}
          style={[styles.button, styles.disableButton]}
        >
          <Text style={[styles.buttonText, styles.descriptionTitle]}>
            hoàn tất
          </Text>
        </TouchableOpacity>
      </View>
      <ConfirmModal isOpen={isConfirmModal} onClose={setIsConfirmModal} />
    </SafeAreaView>
  );
};

export default ConfirmedTab;

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    title: {
      fontSize: 24,
      textTransform: 'uppercase',
      color: colors.violet[400],
      fontWeight: '500',
    },
    wrapContent: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    violetBoldText: {
      fontWeight: 'bold',
      color: colors.violet[400],
    },
    container: {
      flex: 1,
      position: 'relative',
    },
    noJob: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    informationJob: {
      flexDirection: 'row',
      marginTop: 10,
      flexWrap: 'wrap',
    },
    violetFontSize: {
      fontSize: 16,
    },
    footerCard: {
      marginTop: 20,
      borderTopColor: GRAY_COLOR,
      borderTopWidth: 1,
      paddingTop: 20,
    },
    confirmText: {
      color: 'green',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonText: {
      textTransform: 'uppercase',
    },
    button: {
      width: '50%',
      height: 64,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeButton: {
      backgroundColor: colors.violet[400],
    },
    disableButton: {
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    featureCard: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    descriptionTitle: { fontWeight: '500', color: 'rgba(0,0,0,0.3)' },
    modal: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    buttonModal: {
      maxWidth: 100,
      height: 45,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapModalContent: {
      height: '100%',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    footerConfirmModal: {
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: 26
    }
  });
