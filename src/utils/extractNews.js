const extractNews = (data) => {

  const dataArr = data.value;
  let extractedArticles = [];
  dataArr.forEach(dataobject => {
    let outerCounter = 0;
    if (dataobject.pageLayout === 'Article') {
      let wparts = dataobject.webParts;

      if ((wparts).length > 0 && (wparts[0].data.innerHTML).length > 0) {
        let extractedObject = {};
        let name = dataobject.name;
        let innerCounter = 0;
        let innerobj = {};
        wparts.forEach(element => {
          let innerhtml = element.data.innerHTML;
          let key = 'HTML' + innerCounter;
          innerobj[key] = innerhtml;
          extractedObject[name] = innerobj;
          innerCounter++;
        });
        extractedArticles.push(extractedObject);
      }
    }
  });

  return extractedArticles;
};

export default extractNews;