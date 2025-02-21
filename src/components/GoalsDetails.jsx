import { View, Image } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getDataSpAPI } from '../utils/getDataSpAPI';
import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const GoalsDetails = () => {
  const { authState } = useContext(AuthContext);
  const url = 'https://wh8d0.sharepoint.com/sites/TheLanding/_api/web/lists/GetByTitle(\'Site Pages\')/Items?$filter=startswith(Tyyppi, \'Tavoite\')&$Select=Title,Tyyppi,Teksti,Created,BannerImageUrl,Picture,CanvasContent1';
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
    <View style={{ flex: 1, padding: 15 }}>
      <View style={{ alignItems: 'center', paddingBottom: 15 }}>
        <Image source={{ uri: uri }} style={{ height: 350, width: 350 }} />
      </View>
      <RenderHtml contentWidth={width} source={{ html: text }} />
    </View>
  );
};

export default GoalsDetails;

