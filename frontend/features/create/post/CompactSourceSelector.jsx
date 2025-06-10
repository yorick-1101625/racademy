import {Pressable} from 'react-native';
import CompactSource from "@/features/create/post/CompactSource";
import InfiniteScrollList from "@/components/InfiniteScrollList";

function CompactSourceSelector({ query, setSource, selectedSource }) {



    return (
        <InfiniteScrollList
            url="/api/source"
            params={`search=${encodeURIComponent(query)}&sort=recent`}
            className="flex-1"
            noResultsMessage="Geen bronnen gevonden voor je zoekopdracht."
            renderItem={({item}) =>
                <Pressable
                    className={`transition-transform duration-150 ${item.id === selectedSource?.id ? 'translate-x-3 border-b border-rac' : 'hover:translate-x-1 border-b-0 ' } `}
                    onPress={() => {
                        if (selectedSource?.id === item.id) {
                            setSource(null);
                        }
                        else {
                            setSource(item);
                        }
                    }}
                >
                    <CompactSource title={item.title} username={item.user.username}/>
                </Pressable>
            }
        />
    );
}

export default CompactSourceSelector;