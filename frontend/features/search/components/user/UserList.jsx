import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import useFetch from "@/hooks/useFetch";
import NoResults from "@/features/search/components/NoResults";
import User from "@/features/search/components/user/User";

function UserList({url = `/api/user/`}) {

    const {data: users, isPending, error} = useFetch(url);

    if (isPending) return <ActivityIndicator/>;
    if (error) return <Text>Error!</Text>;

    if (!users || users.length === 0) {
        return (
            <NoResults message="Geen gebruikers gevonden voor je zoekopdracht."/>
        );
    }

    return (
        <FlatList
            data={users}
            renderItem={({item}) => <User user={item}/>}
            keyExtractor={(user) => user.id.toString()}
        />
    );
}

export default UserList;