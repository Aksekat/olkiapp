import { View, Image } from 'react-native';
import Text from './Text';
import { format, parseISO, isToday, formatRelative, isYesterday, isThisYear } from 'date-fns';
import { fi } from 'date-fns/locale';
import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const EventDetails = ({ event }) => {

  const { width } = useWindowDimensions();

  let html = event.body;
  html = html.replace(/#58;#ffffff/g, '#e1e4e8');
  html = html.replace(/<p><br><\/p>/g, '');
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace('</span><br></p>', '</span></p>');

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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingBottom: 15, height: 200 }}>
        <Image source={{ uri: event.image }} style={{ flex: 1 }} resizeMode='contain' />
      </View>
      <View style={{ paddingRight: 15, paddingLeft: 15 }}>
        <Text fontWeight='bold' style={{ fontSize: 24 }}>{event.title}</Text>
        <Text fontWeight='bold' style={{ fontSize: 12, paddingBottom: 10 }}>{formatDate(parseISO(event.eventDate))}  {event.location}</Text>
        <RenderHtml contentWidth={width} source={{ html: html }} />
      </View>
    </View>
  );
};

export default EventDetails;