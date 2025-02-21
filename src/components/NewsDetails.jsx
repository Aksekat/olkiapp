import { View, Image } from 'react-native';
import Text from './Text';
import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const NewsDetails = ({ news }) => {
  const { width } = useWindowDimensions();
  news.body = news.body.replace(/<p><br><\/p>/g, '');
  news.body = news.body.replace(/<p><\/p>/g, '');
  news.body = news.body.replace('</span><br></p>', '</span></p>');

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingBottom: 15, height: 250 }}>
        <Image source={{ uri: news.image }} style={{ flex: 1 }} resizeMode='cover' />
      </View>
      <View style={{ paddingRight: 15, paddingLeft: 15 }}>
        <Text fontWeight='bold' style={{ fontSize: 24 }}>{news.title}</Text>
        <RenderHtml contentWidth={width} source={{ html: news.body }} />
      </View>
    </View>
  );
};

export default NewsDetails;