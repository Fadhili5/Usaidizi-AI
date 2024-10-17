import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Picker, CheckBox } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Button, Icon, ListItem, Overlay } from "react-native-elements";
import tw from "tailwind-rn";

// Dummy data for buildings in Nairobi
const dummyData = [
  {
    id: 1,
    title: "Building A",
    description: "Very Accessible",
    coord: { latitude: -1.28333, longitude: 36.82194 },
    address: "Address A",
    entryType: "Public",
    rating: 81,
  },
  {
    id: 2,
    title: "Building B",
    description: "Moderately Accessible",
    coord: { latitude: -1.2921, longitude: 36.8219 },
    address: "Address B",
    entryType: "Private",
    rating: 60,
  },
  // More buildings...
];

const initialRegion = {
  latitude: -1.286389,
  longitude: 36.817223,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={tw("flex-1")}>
      <ScrollView style={tw("p-4")}>
        <Text style={tw("text-xl font-bold")}>Mapability - By Ability Programme</Text>
        <Text>Accessibility mapping results for streets and buildings in different locations.</Text>
        <View style={tw("mt-4")}>
          <Text style={tw("font-bold text-base")}>Key:</Text>
          <Text>Accessibility Rating (%) and Level</Text>
          {/* Sample legend items */}
          <View style={tw("mt-2")}>
            <Text>(00-20%) NOT Accessible </Text>
            <Text>(20-40%) Somewhat Accessible</Text>
            <Text>(41-60%) Moderately Accessible</Text>
            <Text>(61-80%) Accessible</Text>
            <Text>(> 81%) Very Accessible</Text>
          </View>
        </View>
        <View style={tw("mt-4")}>
          <Text style={tw("font-bold text-base")}>Select Mapability Locations:</Text>
          <Text>Click on the location toggle to view specific locations mapped</Text>
          <Picker
            selectedValue={selectedLocation}
            onValueChange={(itemValue) => setSelectedLocation(itemValue)}
            style={tw("bg-gray-200 p-2 mt-2")}
          >
            <Picker.Item label="Select Location" value={null} />
            <Picker.Item label="Kenya" value={1} />
            <Picker.Item label="Nairobi" value={2} />
            <Picker.Item label="Nakuru" value={3} />
            <Picker.Item label="Malindi" value={4} />
          </Picker>
        </View>

        <Button
          title="Show/Hide Filter"
          onPress={toggleOverlay}
          buttonStyle={tw("bg-gray-300 mt-4")}
          titleStyle={tw("text-gray-800")}
          icon={<Icon name="filter" type="font-awesome" color="gray" />}
        />
      </ScrollView>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Advanced Filters</Text>
        <Text>Indoor Checks</Text>
        <CheckBox title="Are doors manual or automatic" checked={false} />
        <CheckBox title="Are doors more than 1m wide?" checked={false} />
        <CheckBox title="If the doors are manual, are doors push or pull?" checked={false} />
        <CheckBox title="Are there door knobs or levers on doors?" checked={false} />
        <CheckBox title="Is there clear signage?" checked={false} />
      </Overlay>

      <MapView
        style={tw("flex-1")}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {dummyData.map((building) => (
          <Marker key={building.id} coordinate={building.coord}>
            <Callout>
              <View style={tw("w-64")}>
                <Text style={tw("font-bold")}>{building.title}</Text>
                <Text>{building.description}</Text>
                <Text>Address: {building.address}</Text>
                <Text>Entry Type: {building.entryType}</Text>
                <Text>Rating: {building.rating}%</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  checkboxContainer: {
    marginBottom: 20,
    flexDirection: "row",
  },
});