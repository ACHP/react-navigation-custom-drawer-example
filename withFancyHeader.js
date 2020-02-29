import React, {useContext} from 'react';
import Animated, {interpolate} from 'react-native-reanimated';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {AnimatedContext, THEME_COLOR} from './App';

export function withFancyDrawer(Component) {
  function Wrapper({children}) {
    const animated = useContext(AnimatedContext);
    const scale = interpolate(animated, {
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });
    const translateMainCard = interpolate(animated, {
      inputRange: [0, 1],
      outputRange: [0, 20],
    });
    const translateTransparentCard = interpolate(animated, {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, -50],
    });

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: THEME_COLOR,
        }}>
        <TransitionContainer
          style={{transform: [{scale, translateX: translateMainCard}]}}>
          <TransparentCard
            style={{
              transform: [{translateX: translateTransparentCard}, {scale: 0.9}],
            }}
          />
          <Card>{children}</Card>
        </TransitionContainer>
      </View>
    );
  }
  return props => (
    <Wrapper>
      <Component {...props} />
    </Wrapper>
  );
}

const TransitionContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TransparentCard = styled(Animated.View)`
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
