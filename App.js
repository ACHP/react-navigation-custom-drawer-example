import React, {useState, useContext} from 'react';
import {View, Dimensions} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import HomeScreen from './HomePage';
import OtherScreen from './OtherScreen';

const THEME_COLOR = '#0069fe';
const {width} = Dimensions.get('screen');
const AnimatedContext = React.createContext(void 0);

function withFancyDrawer(Component) {
  return props => (
    <Wrapper>
      <Component {...props} />
    </Wrapper>
  );
}
function Wrapper({children, ...props}) {
  const animated = useContext(AnimatedContext);
  const scale = interpolate(animated, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const translateX = interpolate(animated, {
    inputRange: [0, 1],
    outputRange: [0, (width / 5) * 4],
  });

  console.log(animated);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: THEME_COLOR,
      }}>
      <TransitionContainer style={{transform: [{scale, translateX}]}}>
        <TransparentCard
          style={{
            transform: [{translateX: -50}, {scale: 0.9}],
          }}
        />
        <Card>{children}</Card>
      </TransitionContainer>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <FakeDrawerHeader>
        <AppTitle>FancyDrawer</AppTitle>
      </FakeDrawerHeader>
      <DrawerItemList
        inactiveBackgroundColor={'transparent'}
        inactiveTintColor={'white'}
        activeBackgroundColor={'#FFFFFF88'}
        activeTintColor={'white'}
        {...props}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  return (
    <AnimatedContext.Provider value={animatedValue}>
      <View style={{backgroundColor: 'red', flex: 1}}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerStyle={{
              backgroundColor: 'transparent',
            }}
            initialRouteName="Home"
            overlayColor="transparent"
            drawerContent={props => {
              console.log(props);
              setAnimatedValue(props.progress);
              return <CustomDrawerContent {...props} />;
            }}>
            <Drawer.Screen
              name="Home"
              component={withFancyDrawer(HomeScreen)}
            />
            <Drawer.Screen
              name="OtherScreen"
              component={withFancyDrawer(OtherScreen)}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    </AnimatedContext.Provider>
  );
}
// <Drawer.Screen name="Notifications" component={NotificationsScreen} />

const FakeDrawerHeader = styled.View`
  width: 100%;
  aspect-ratio: 1.5;
  align-items: center;
  justify-content: center;
`;
const AppTitle = styled.Text`
  font-size: 22px;
  color: white;
  font-weight: bold;
`;

const TransitionContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
// background-color: white;
const TransparentCard = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.3;
  border-radius: 30px;
`;
const Card = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;
