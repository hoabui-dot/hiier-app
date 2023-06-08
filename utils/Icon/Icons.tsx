import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5
} from '@expo/vector-icons';

export default {
  ImageProfile: (
    <Ionicons name="person-circle-outline" size={40} color="black" />
  ),
  Search: <AntDesign name="search1" />,
  Smile: <FontAwesome name="smile-o" />,
  Right: <AntDesign name="right" />,
  Plus: <MaterialIcons name="add" color="black" />,
  Minus: <Entypo name="minus" size={24} color="black" />,
  Message: (
    <MaterialCommunityIcons
      name="message-reply-text-outline"
      size={24}
      color="black"
    />
  ),
  Send: <FontAwesome name='send' />,
  Visa: <FontAwesome name="cc-visa" size={24} color="black" />,
  Coin: <FontAwesome5 name="bitcoin" size={24} color="black" />,
  Left: <AntDesign name='left' />,
};
