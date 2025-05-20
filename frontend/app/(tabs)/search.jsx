import React, {useEffect, useState} from "react";
import {View, TextInput, Text, Pressable, ActivityIndicator, Modal} from "react-native";
import PostList from "@/features/feed/components/post/PostList";
import SourceList from "@/features/feed/components/source/SourceList";
import NoResults from "@/features/search/components/NoResults";
import UserList from "@/features/search/components/user/UserList";
import {Ionicons} from "@expo/vector-icons";

const FILTERS = ["Posts", "Sources", "Users"];

const Search = () => {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("Posts");
    const [isTyping, setIsTyping] = useState(false);

    const [sortBy, setSortBy] = useState("recent");
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const endpoint = filter === "Posts" ? "post" : filter === "Sources" ? "source" : "user";
    const url = `/api/${endpoint}?search=${encodeURIComponent(query)}&sort=${sortBy}`;
    const showResults = query.trim().length > 0;

    useEffect(() => {
        if (query.trim() === "") {
            setIsTyping(false);
            return;
        }

        setIsTyping(true);
        const timer = setTimeout(() => {
            setIsTyping(false);
        }, 300); // Typing delay

        return () => clearTimeout(timer);
    }, [query]);

    let sortOptions = [];

    if (filter === "Posts") {
        sortOptions = [
            {label: "Meest recent", value: "recent"},
            {label: "Meeste likes", value: "likes"},
        ];
    } else if (filter === "Sources") {
        sortOptions = [
            {label: "Meest recent", value: "recent"},
            {label: "Hoogste rating", value: "rating"},
        ];
    }

    return (
        <View className="flex-1 bg-gray-100">
            <View className="bg-white px-4 pt-4 pb-0">
                <View className="relative mb-3">
                    <TextInput
                        placeholder="Zoeken..."
                        value={query}
                        onChangeText={setQuery}
                        className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 pr-10"
                    />
                    <Pressable
                        onPress={() => setFilterModalVisible(true)}
                        className="absolute right-2 top-2"
                    >
                        <Ionicons name="options-outline" size={21.5} color="#8e8e8f"/>
                    </Pressable>
                </View>

                <View className="flex-row mb-4">
                    {FILTERS.map((item) => {
                        const isActive = filter === item;
                        return (
                            <Pressable
                                key={item}
                                onPress={() => {
                                    setFilter(item);
                                }}
                                className={`px-3 py-2 rounded-md mr-2 ${isActive ? "bg-rac" : "bg-gray-200"}`}
                            >
                                <Text className={isActive ? "text-white" : "text-black"}>
                                    {item === "Posts" ? "Posts" : item === "Sources" ? "Bronnen" : "Gebruikers"}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

            </View>

            <View className="flex-1">
                {isTyping ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large"/>
                    </View>
                ) : showResults ? (
                    filter === "Posts" ? (
                        <PostList url={url}/>
                    ) : filter === "Sources" ? (
                        <SourceList url={url}/>
                    ) : (
                        <UserList url={url}/>
                    )
                ) : (
                    <NoResults/>
                )}
            </View>

            <Modal
                visible={filterModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View className="flex-1 justify-end bg-black bg-opacity-30">
                    <View className="bg-white p-6 rounded-t-2xl">
                        <Text className="text-lg font-semibold mb-4">Sorteer op</Text>

                        {sortOptions.map(option => (
                            <Pressable
                                key={option.value}
                                onPress={() => setSortBy(option.value)}
                                className={`py-3 px-4 rounded-md mb-2 ${
                                    sortBy === option.value ? "bg-rac" : "bg-gray-200"
                                }`}
                            >
                                <Text className={sortBy === option.value ? "text-white" : "text-black"}>
                                    {option.label}
                                </Text>
                            </Pressable>
                        ))}

                        <Pressable
                            onPress={() => setFilterModalVisible(false)}
                            className="mt-4 bg-rac py-3 rounded-md"
                        >
                            <Text className="text-white text-center font-semibold">Toepassen</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Search;
