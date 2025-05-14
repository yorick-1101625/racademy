import React, {useState} from "react";
import {View, TextInput, Text, Pressable} from "react-native";
import PostList from "@/features/feed/components/post/PostList";
import SourceList from "@/features/feed/components/source/SourceList";
import { BASE_URL } from "@/utils/url";

const URL = `${BASE_URL}/api`;
const FILTERS = ["Posts", "Sources"];

const Search = () => {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("Posts");

    const endpoint = filter === "Posts" ? "post" : "source";
    const url = `${URL}/${endpoint}?search=${encodeURIComponent(query)}`;
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

                <View className="flex-row border-b border-gray-200">
                    {FILTERS.map((item) => {
                        const isActive = filter === item;
                        return (
                            <Pressable
                                key={item}
                                onPress={() => setFilter(item)}
                                className="flex-1 items-center pb-0"
                            >
                                <Text
                                    className={`text-base ${
                                        isActive ? "text-rac font-semibold" : "text-gray-500"
                                    }`}
                                >
                                    {item === "Posts" ? "Posts" : "Bronnen"}
                                </Text>
                                {isActive && <View className="h-1 w-full bg-rac rounded-full mt-1"/>}
                            </Pressable>
                        );
                    })}
                </View>
            </View>

            <View className="flex-1">
                {showResults ? (
                    filter === "Posts" ? (
                        <PostList url={url}/>
                    ) : (
                        <SourceList url={url}/>
                    )
                ) : (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-lg font-semibold text-gray-800 mb-2">
                            Geen resultaten
                        </Text>
                        <Text className="text-gray-500 text-center px-6 mb-4">
                            Begin met zoeken om resultaten te vinden.
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Search;
