import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

function useGoBackHandler(onGoBackCallback, deps) {
    const navigation = useNavigation();
    useEffect(() => {
       const androidSwipeBack = BackHandler.addEventListener('hardwareBackPress', onGoBackCallback);
    const iosSwipeBack = navigation.addListener('gestureEnd', onGoBackCallback);
        return () => {
            androidSwipeBack
            iosSwipeBack
        };
    }, [navigation, onGoBackCallback, deps]);
}
export default useGoBackHandler;