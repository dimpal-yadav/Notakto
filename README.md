## Debug Mode
# step 1
enable debug mode in phone 
# step 2
connect phone to computer
# step 3
open terminal and type `adb devices` to check if phone is connected
# step 4
open this folder in cmd with admin privelleges 
# step 5
npx react-native run-android in cli

## Release/Build Mode
# step 1
open this folder in cmd with admin privelleges
# step 2
add icons in android/app/src/main/res
# step 3
sign the app using react-native documentation 
# step 4
cd android
# step 5
gradlew assembleRelease for apk(s)
gradlew bundleRelease for aab
gradlew clean for reseting the changes made by assemble/bundle


visit linktr.ee/rakshitg600 for app
