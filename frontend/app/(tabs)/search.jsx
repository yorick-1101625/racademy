import React, {useState} from "react";
import {View, TextInput, Text, Pressable} from "react-native";
import PostList from "@/features/feed/components/post/PostList";
import SourceList from "@/features/feed/components/source/SourceList";
import NoResults from "@/features/search/components/NoResults";
import UserList from "@/features/search/components/user/UserList";

const FILTERS = ["Posts", "Sources", "Users"];

const Search = () => {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("Posts");

    const endpoint = filter === "Posts" ? "post" : filter === "Sources" ? "source" : "user";
    const url = `/api/${endpoint}?search=${encodeURIComponent(query)}`;
    const showResults = query.trim().length > 0;

    return (
        <View className="flex-1 bg-gray-100">
            <View className="bg-white px-4 pt-4 pb-0">
                <TextInput
                    placeholder="Zoeken..."
                    value={query}
                    onChangeText={setQuery}
                    className="border border-gray-300 rounded-lg px-4 py-2 mb-3 bg-gray-50"
                />

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
                {showResults ? (
                    filter === "Posts" ? (
                        <PostList url={url} />
                    ) : filter === "Sources" ? (
                        <SourceList url={url} />
                    ) : (
                        <UserList url={url} />
                    )
                ) : (
                    <NoResults />
                )}
            </View>
        </View>
    );
};

export default Search;
