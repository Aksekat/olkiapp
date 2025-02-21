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
    marginBottom: -15,
    flexShrink: 1,
  }
});

const ItemBody = ({ event }) => {
  const { width } = useWindowDimensions();
  let html = event.body;
  html = html.replace('16px', '14px');
  html = html.replace('#212121', '#586069');
  const defaultTextProps = {
    numberOfLines: 4,
  };

  return (
    <View style={itemBodyStyles.container}>
      <View style={itemBodyStyles.imageContainer}>
        <Image style={itemBodyStyles.image} source={{ uri: event.image }} />
      </View>
      <View style={itemBodyStyles.textContainer}>
        <Text fontWeight='bold' fontSize='subheading'>{event.title}</Text>
        <RenderHtml defaultTextProps={defaultTextProps} contentWidth={width} source={{ html: html.substring(0, 473).concat('...') }} />
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

const formatDate = (date) => {
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

const ItemFooter = ({ event }) => {
  return (
    <View style={itemFooterStyles.container}>
      <Text style={itemFooterStyles.text}>{formatDate(parseISO(event.eventDate))}</Text>
      <Text style={itemFooterStyles.text}>{event.location}</Text>
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

const EventItem = ({ event }) => {
  return (
    <View style={itemStyles.container}>
      <ItemBody event={event} />
      <ItemFooter event={event} />
    </View>
  );
};

export default EventItem;