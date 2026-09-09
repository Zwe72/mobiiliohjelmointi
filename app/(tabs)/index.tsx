import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { PropsWithChildren } from "react";


export default function HomeScreen() {

    return (
        <view style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>

            <Link href="/arvauspeli" style={styles.button}>
                <MyLink>Arvauspeli</MyLink>
            </Link>

            <Link href="/laskin" style={styles.button}>
                <MyLink>Laskin</MyLink>
            </Link>

            <Link href="/ostoslista" style={styles.button}>
                <MyLink>Ostoslista</MyLink>
            </Link>
        </view>
    );
}


function MyLink({ children }: PropsWithChildren) {
    return <Text style={styles.buttonText}>{children}</Text>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "white",
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
    },
    button: {
        color: "blue",
        padding: 15,
        borderColor: "black",
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 15,
        alignSelf: "stretch"
    },
    buttonText: {
        color: "black",
        alignSelf: "center",
        textAlign: "center",
        fontSize: 16
    }
});
