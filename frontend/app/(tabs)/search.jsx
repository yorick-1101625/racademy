import React, {useState} from "react";
import {View, TextInput, Text, Pressable, SafeAreaView} from "react-native";
import PostList from "@/features/content/components/post/PostList";
import SourceList from "@/features/content/components/source/SourceList";
import NoResults from "@/features/search/components/NoResults";

const FILTERS = ["Posts", "Sources"];

const Search = () => {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("Posts");

    const endpoint = filter === "Posts" ? "post" : "source";
    const url = `/api/${endpoint}?search=${encodeURIComponent(query)}`;
    const showResults = query.trim().length > 0;

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="bg-white px-4 pt-4 pb-0">
                <TextInput
                    placeholder="Zoeken..."
                    value={query}
                    onChangeText={setQuery}
                    className="border border-gray-300 rounded-lg px-4 py-2 mb-3 bg-gray-50"
                />

                {/*<View className="flex-row border-b border-gray-200">*/}
                {/*    {FILTERS.map((item) => {*/}
                {/*        const isActive = filter === item;*/}
                {/*        return (*/}
                {/*            <Pressable*/}
                {/*                key={item}*/}
                {/*                onPress={() => setFilter(item)}*/}
                {/*                className="flex-1 items-center pb-0"*/}
                {/*            >*/}
                {/*                <Text*/}
                {/*                    className={`text-base ${*/}
                {/*                        isActive ? "text-rac font-semibold" : "text-gray-500"*/}
                {/*                    }`}*/}
                {/*                >*/}
                {/*                    {item === "Posts" ? "Posts" : "Bronnen"}*/}
                {/*                </Text>*/}
                {/*                {isActive && <View className="h-1 w-full bg-rac  mt-1"/>}*/}
                {/*            </Pressable>*/}
                {/*        );*/}
                {/*    })}*/}
                {/*</View>*/}

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
                                    {item === "Posts" ? "Posts" : "Bronnen"}
                                </Text>
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
                    <NoResults/>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Search;
