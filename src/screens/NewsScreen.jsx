import NewsDetails from '../components/NewsDetails';
import { ScrollView } from 'react-native';

const NewsScreen = ({ route }) => {
  const news = route.params.news;
  return (
    <>
      <ScrollView>
        <NewsDetails news={news} />
      </ScrollView>
    </>
  );
};

export default NewsScreen;