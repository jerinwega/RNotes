npm i
pod install
npm start



issues faced

version mismatches
react-navingation issues
interpolate to interpolateNode from lib reanimated 2+


find font name
install font 
all fonts -> find the font and see the info > PostScript name
npx react-native link





 to add / refresh build apks budle


 delete duplicates
 
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res


./gradlew clean

for apks
./gradlew assembleRelease

for bundle
./gradlew bundleRelease


versioning go to package.json change version
react-native-version --never-amend


iphone simulator 
xcrun simctl list

npx react-native run-ios --simulator 'iPhone SE (3rd generation)'