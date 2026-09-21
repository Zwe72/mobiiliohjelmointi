import * as Location from "expo-location";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function Kartta() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [stations, setStations] = useState<any[]>([]);

  const geoJsonUrl = 
  "https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.geojson";
  
  const getStations = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if(status === "granted") {
        try {
            const currentLocation =
            await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Low,
            });

            setLocation(currentLocation);

            console.log(
                "Oma sijainti:",
                currentLocation.coords
            );
        } catch (locationError) {
            console.log(
                "Sijainnin hakeminen epäonnistui:",
                locationError
            );
        }
    } else{
        alert("Sijaintilupaa ei annettu");
    }

    const response = await fetch(geoJsonUrl);

    const data = await response.json();

    setStations(data.features);

    console.log("Asemia:", data.features.length);
  } catch (error) {
    console.log("Fetch error:", error);
  }
};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Oma sijainti
      </Text>

      <Button
        title="Hae pyöräasemat"
        onPress={getStations}
      />

      {location && (
        <View style={styles.location}>
          <Text>
            Latitude: {location.coords.latitude}
          </Text>

          <Text>
            Longitude: {location.coords.longitude}
          </Text>
        </View>
      )}

      <Text style={styles.subtitle}>
        Kaupunkipyöräasemat
      </Text>

      <FlatList
        data={stations}
        keyExtractor={(station) => station.properties.ID.toString()}
        renderItem={({ item }) => (
            <View style={styles.station}>
                <Text style={styles.stationName}>
                {item.properties.Nimi}
            </Text>

            <Text style={styles.address}>
                {item.properties.Osoite}
            </Text>
        </View>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 20,
},

  title: {
    fontSize: 24,
    marginBottom: 20,
  },

  location: {
    marginTop: 20,
  },
  subtitle: {
  fontSize: 20,
  marginTop: 30,
  marginBottom: 10,
},

station: {
  padding: 15,
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  marginBottom: 10,
  backgroundColor: "white",
},

stationName: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 5,
},

address: {
  fontSize: 14,
  color: "gray",
},
});