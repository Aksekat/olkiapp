import GoalsDetails from '../components/GoalsDetails';
import { ScrollView } from 'react-native';

const GoalsScreen = () => {
  return (
    <>
      <ScrollView>
        <GoalsDetails />
      </ScrollView>
    </>
  );
};

export default GoalsScreen;