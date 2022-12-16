import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (deviceWidth / guidelineBaseWidth) * size;

export const scaledWidth = wPx => {
  const x = wPx / guidelineBaseWidth;
  return deviceWidth * x;
};

export const scaledHeight = wPy => {
  const y = wPy / guidelineBaseHeight;
  return deviceHeight * y;
};

export const scaledFont = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};
