import { View, Image } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getDataSpAPI } from '../utils/getDataSpAPI';
import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const LunchMenuDetails = () => {
  const { authState } = useContext(AuthContext);
  const url = 'https://wh8d0.sharepoint.com/sites/TheLanding/_api/web/lists/GetByTitle(\'Site Pages\')/Items?$filter=startswith(Tyyppi, \'Ruokalista\')&$Select=Title,Tyyppi,Teksti,Created,BannerImageUrl,Picture,CanvasContent1';
  const [text, setText] = useState('');
  const [uri, setUri] = useState();
  const { width } = useWindowDimensions();

  useEffect(() => {
    getDataSpAPI(url, authState.sharepointToken)
      .then((response) => {
        let data = response.d.results;
        data.forEach(element => {
          setText(element.CanvasContent1);
          setUri(element.Picture.Url);
        });
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingBottom: 15, height: 250 }}>
        <Image source={{ uri: uri }} style={{ flex: 1 }} resizeMode='cover' />
      </View>
      <RenderHtml contentWidth={width} source={{ html: text }} />
    </View>
  );
};

export default LunchMenuDetails;

