import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	return (
		<SafeAreaView style={tw`bg-white flex-1`}>
			<Text style={tw`text-center py-5 text-xl`}>Good Morning, JYDEV</Text>
			<View style={tw`border-t border-gray-200 flex-shrink`}>
				<View>
					<GooglePlacesAutocomplete
						placeholder="어디로 갈까요?"
						styles={toInputBoxStyles}
						onPress={(data, details = null) => {
							dispatch(
								setDestination({
									location: details.geometry.location,
									description: data.description,
								}),
							);
							navigation.navigate('RideOptionsCard');
						}}
						fetchDetails={true}
						returnKeyType={'search'}
						enablePoweredByContainer={false}
						minLength={2}
						query={{ key: GOOGLE_MAPS_APIKEY, language: 'ko' }}
						nearbyPlacesAPI="GooglePlacesSearch"
						debounce={400}
					/>
				</View>

				<NavFavourites type={'destination'} />
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingTop: 20,
		flex: 0,
	},
	textInput: {
		backgroundColor: '#DDDDDF',
		borderRadius: 0,
		fontSize: 18,
	},
	textInputContainer: {
		paddingHorizontal: 20,
		paddingBottom: 0,
	},
});
