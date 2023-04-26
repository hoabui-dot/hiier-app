import React, { useContext, useEffect, useState } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASEURL } from '../../../../services/api/urls';
import io from 'socket.io-client';
import { addAuthorizationHeader } from '../../../../services/token';
import { TaskApi } from '../../../../services/api/task';
import { IJobInformation } from '../../../../types/ui';
import { DEFAULT_JOB_INFORMATION } from '../../../../utils/defaultValue';
import SwipeButton from 'rn-swipe-button';

import { secretHashContext } from '../../DrawerMenu';
import { PURPLE_COLOR, WHITE_COLOR } from '../../../../constants/ui';

const { width, height } = Dimensions.get('screen');
const NewJobTab = () => {
  const [isJobModal, setIsJobModal] = useState<boolean>(false);
  const [jobInformation, setJobInformation] = useState<IJobInformation>(
    DEFAULT_JOB_INFORMATION
  );
  console.log(
    '🚀 ~ file: index.tsx:23 ~ NewJobTab ~ jobInformation:',
    jobInformation
  );

  const loginCode = useContext(secretHashContext);
  addAuthorizationHeader(loginCode.token);
  const socket = io(BASEURL);

  useEffect(() => {
    if (loginCode.secretHash) {
      socket.emit('subscribe', loginCode.secretHash);
      socket.on('subscribe/' + loginCode.secretHash, async (res) => {
        console.log('subscribe', res);
      });
      socket.on('private/' + loginCode.secretHash, async (res) => {
        console.log('private', res);
        setJobInformation(res);
        setIsJobModal(true);
      });

      return () => {
        socket.off('private/' + loginCode.secretHash);
        socket.off('subscribe/' + loginCode.secretHash);
      };
    }
    return () => {};
  }, [socket]);

  const InformationJob = ({
    title,
    description,
  }: {
    title: string;
    description: any;
  }) => {
    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`${title}:`}</Text>
        <Text style={{ fontSize: 16 }}>{description}</Text>
      </View>
    );
  };

  const JobModal = () => {
    return (
      <Modal transparent animationType="fade" visible={isJobModal}>
        <View style={styles.modal}>
          <View style={styles.modalBackground}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <View style={styles.content}>
                <InformationJob
                  title="Địa chỉ"
                  description={jobInformation.address}
                />
                <InformationJob
                  title="Tổng tiền"
                  description={jobInformation.totalPrice}
                />
                <InformationJob
                  title="Hình thức thanh toán"
                  description={jobInformation.paymentMethod}
                />
                <InformationJob
                  title="Tên khách hàng"
                  description={jobInformation.customerName}
                />
                <InformationJob
                  title="Số diện thoại"
                  description={jobInformation.phone}
                />
              </View>
              <SwipeButton
                disabled={false}
                swipeSuccessThreshold={70}
                height={70}
                width={313}
                title="Trượt để nhận việc"
                onSwipeSuccess={() => setIsJobModal(false)}
                titleStyles={{ color: 'black' }}
                railFillBackgroundColor={PURPLE_COLOR}
                railFillBorderColor={WHITE_COLOR}
                containerStyles={{
                  borderRadius: 15,
                  marginBottom: -1,
                  marginLeft: -1,
                }}
                railStyles={{ borderRadius: 15, opacity: 2 }}
                thumbIconStyles={{ borderRadius: 15 }}
                thumbIconBackgroundColor={PURPLE_COLOR}
                thumbIconBorderColor={WHITE_COLOR}
                railBackgroundColor={WHITE_COLOR}
                railBorderColor={PURPLE_COLOR}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: 'flex' }}>
        <Text>Hiện tại chưa có công việc mới, vui lòng quay lại sau</Text>
      </View>
      <TouchableOpacity onPress={() => setIsJobModal(true)}>
        <Text>Show Popup</Text>
      </TouchableOpacity>
      <JobModal />
    </SafeAreaView>
  );
};

export default NewJobTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBackground: {
    width: (width / 100) * 80,
    height: (height / 100) * 60,
    maxHeight: (height / 100) * 60,
    backgroundColor: WHITE_COLOR,
    borderRadius: 15,
  },
  content: {
    padding: 15,
  },
});
