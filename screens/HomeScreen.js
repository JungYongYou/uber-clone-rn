import React from 'react';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

const HomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image style={{ width: 100, height: 100, resizeMode: 'contain' }} source={{ uri: 'https://links.papareact.com/gzs' }} />

				<GooglePlacesAutocomplete
					placeholder="어디에서 출발할까요?"
					styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
					onPress={(data, details = null) => {
						console.log(details.geometry);
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							}),
						);
						dispatch(setDestination(null));
					}}
					fetchDetails={true}
					returnKeyType={'search'}
					enablePoweredByContainer={false}
					minLength={2}
					query={{ key: GOOGLE_MAPS_APIKEY, language: 'ko' }}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
				/>

				<NavOptions />
				<NavFavourites type={'origin'} />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	text: {
		color: 'blue',
	},
});
