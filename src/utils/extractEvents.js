import moment from 'moment';
import { fi } from 'date-fns/locale';

export function extractEvents(eventData) {
  const eventObj = {};
  const events = [];
  const data = eventData.d.results;
  let counter = 0;
  let counter1 = 0;
  var date = moment()
    .format(date, 'dd.MM. \'klo\' hh.mm', { locale: fi });

  const addEventItem = (eventItem) => {
    const eventObject = {
      id: counter1,
      title: eventItem.Title,
      location: eventItem.Location,
      body: eventItem.Description,
      image: 'https://sertifiointi.com/wp-content/uploads/2011/05/Koulutus.bmp',
      eventDate: eventItem.EventDate
    };
    counter1++;
    events.push(eventObject);
  };

  data.forEach(element => {
    if(element.EventDate < date){
      console.log('Event is in the past');
    }else {
      let test = element.Description.replace(/font-size&#58;16px/g, 'font-size&#58;14px');
      element.Description = test;
      let eventname = 'eventitem' + counter.toString();
      let eventstring = element;
      eventObj[eventname] = eventstring;
      counter++;
      addEventItem(eventObj[eventname]);
    }
  });
  events.reverse();
  return events;
}
