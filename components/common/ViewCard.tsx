import { ReactNode, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { ITheme, useTheme } from 'native-base';
import ViewSection from '../../components/ViewSection';
import Heading from '../../components/Heading'

interface ViewCardProps extends ViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  title?: ReactNode;
}

const ViewCard = ({ containerStyle, title, ...props }: ViewCardProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <ViewSection style={containerStyle}>
      {title && typeof title === 'string' ? (
        <Heading mb={2}>{title}</Heading>
      ) : (
        title && title
      )}
      <View {...props} style={[styles.card, props.style]}>
        {props.children}
      </View>
    </ViewSection>
  );
};

const makeStyles = ({ colors, fontSizes, sizes, shadows }: ITheme) =>
  StyleSheet.create({
    card: {
      padding: sizes.padding * 2,
      paddingVertical: sizes.padding,
      borderRadius: sizes.radius * 2,
      backgroundColor: colors.white,
      ...shadows[1],
    },
  });

export default ViewCard;
