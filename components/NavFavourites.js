import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const data = [
	{
		id: '123',
		icon: 'home',
		location: '집',
		destination: 'Code Street, London, UK',
		latlng: {
			lat: 51.5223932,
			lng: -0.07082999999999999,
		},
	},
	{
		id: '456',
		icon: 'briefcase',
		location: '회사',
		destination: 'London Eye, London, UK',
		latlng: {
			lat: 51.5032973,
			lng: -0.1195537,
		},
	},
];

const NavFavourites = (props) => {
	const { type } = props;
	const navigation = useNavigation();
	const dispatch = useDispatch();

	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => <View style={[tw`bg-gray-200`, { height: 0.5 }]} />}
			renderItem={({ item: { location, destination, latlng, icon } }) => (
				<TouchableOpacity
					style={tw`flex-row items-center p-5`}
					onPress={() => {
						if (type === 'origin') {
							dispatch(
								setOrigin({
									location: latlng,
									description: destination,
								}),
							);
							dispatch(setDestination(null));
							navigation.navigate('MapScreen');
						} else if (type === 'destination') {
							dispatch(
								setDestination({
									location: latlng,
									description: destination,
								}),
							);
							navigation.navigate('RideOptionsCard');
						}
					}}
				>
					<Icon style={tw`mr-4 rounded-full bg-gray-300 p-3`} name={icon} type="ionicon" color="white" size={18} />
					<View>
						<Text style={tw`font-semibold text-lg`}>{location}</Text>
						<Text style={tw`text-gray-500`}>{destination}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavFavourites;

const styles = StyleSheet.create({});
