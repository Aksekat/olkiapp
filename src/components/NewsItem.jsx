import { View, Image, StyleSheet } from 'react-native';
import { format, parseISO, isToday, formatRelative, isYesterday, isThisYear } from 'date-fns';
import { fi } from 'date-fns/locale';
import Text from './Text';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const itemBodyStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  imageContainer: {
    flexGrow: 0,
    paddingTop: 5,
    paddingRight: 15
  },
  textContainer: {
    flexGrow: 0,
    flexShrink: 1,
  }
});

const ItemBody = ({ news }) => {
  return (
    <View style={itemBodyStyles.container}>
      <View style={itemBodyStyles.imageContainer}>
        <Image style={itemBodyStyles.image} source={{ uri: news.image }} />
      </View>
      <View style={itemBodyStyles.textContainer}>
        <Text fontWeight='bold' fontSize='subheading'>{news.title}</Text>
        <Text numberOfLines={4} color='textSecondary'>{news.description}</Text>
      </View>
    </View>
  );
};

const itemFooterStyles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  text: {
    color: 'gray',
    fontSize: 12,
  }
});

const formatNewsDate = (date) => {
  switch (true) {
    case (isToday(date) || isYesterday(date)):
      return formatRelative(date, new Date(), { locale: fi });
    case (isThisYear(date)):
      // eslint-disable-next-line quotes
      return format(date, "dd.MM. 'klo' hh.mm", { locale: fi });
    default:
      return format(date, 'dd.MM.yyyy', { locale: fi });
  }
};

const ItemFooter = ({ news }) => {
  return (
    <View style={itemFooterStyles.container}>
      <Text style={itemFooterStyles.text}>{formatNewsDate(parseISO(news.createdAt))}</Text>
    </View>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
});

const NewsItem = ({ news }) => {
  return (
    <View style={itemStyles.container}>
      <ItemBody news={news} />
      <ItemFooter news={news} />
    </View>
  );
};

export default NewsItem;