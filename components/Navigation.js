import { NavigationContainer } from "@react-navigation/native";
import AuthMain from "./auth/AuthMain";

export default function Navigation() {
    return (
        <NavigationContainer>
            <AuthMain />
        </NavigationContainer>
    )
}