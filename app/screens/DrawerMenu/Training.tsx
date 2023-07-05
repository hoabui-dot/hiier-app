import { ITheme, useTheme } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { DEFAULT_QUIZZES } from '../../../constants/ui';
import { TaskApi } from '../../../services/api/task';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { IQuizzes } from '../../../types/ui';
import { DEFAULT_CHARACTER } from '../../../constants/ui';
import cloneDeep from 'lodash/cloneDeep';
import { Checkbox } from 'native-base';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('screen');

interface IAnswer {
  questionId: number;
  answerId: number;
}

const TrainingHiier = () => {
  const [dataQuizzes, setDataQuizzes] = useState<IQuizzes>(DEFAULT_QUIZZES);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer[]>([]);
  console.log("🚀 ~ file: Training.tsx:33 ~ TrainingHiier ~ selectedAnswer:", selectedAnswer)

  useEffect(() => { 
    const getQuizzesList = async function () {
      setIsLoading(true);
      TaskApi.getQuizzesList()
        .then((response) => {
          setDataQuizzes(response.data.resource);
          setIsLoading(false);
        })
        .catch((err) => console.log('error quiz list', err));
    };

    getQuizzesList();
  }, []);

  const onSubmitAnswer = ({questionId, answerId}: IAnswer) => {
    setSelectedAnswer([...selectedAnswer, {questionId: questionId, answerId: answerId}]);
  }

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator style={styles.loadingIcon} size="large" />
        </View>
      ) : (
        <View>
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>{dataQuizzes.name}</Text>
          </View>
          <View style={styles.wrapContent}>
            {dataQuizzes.qadtoList.map((quiz, index) => (
              <View key={index}>
                <Text>{`${index + 1}. ${quiz.questionContent}`}</Text>
                <View style={styles.answerList}>
                  <Checkbox.Group>
                    {quiz.answerDTOList?.map((answer, idx) => (
                      <Checkbox key={idx} onChange={() => setSelectedAnswer([...selectedAnswer, {questionId: quiz.questionId, answerId: idx}])} value={idx.toString()}>
                        <Text>{answer.answerContent}</Text>
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default TrainingHiier;

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingIcon: {
      alignItems: 'center',
      color: colors.primary.gold,
    },
    loading: {
      height: height + Constants.statusBarHeight - 40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontWeight: '500',
      fontSize: 24,
    },
    wrapTitle: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.secondary[400],
      paddingVertical: 10,
    },
    wrapContent: {
      paddingHorizontal: 15,
      marginTop: 10,
    },
    answerList: {
      // marginLeft: 18,
      width: width,
      justifyContent: 'flex-start',
    },
  });
