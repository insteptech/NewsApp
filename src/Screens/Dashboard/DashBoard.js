import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ActivityIndicator, ScrollView, SectionList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as api from '../../Services/Api';
import { addHeadlines } from '../../Actions/index';
import Article from '../../Utils/utils';

import Panel from '../../Components/Panel';
import PanelItem from '../../Components/PanelItem';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = (props) => {
  const dispatch = useDispatch();
  const { navigate } = props.navigation;

  //1 - DECLARE VARIABLES
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  //Access Redux Store State
  const newsReducer = useSelector(({ newsReducer }) => newsReducer);
  const { business, entertainment, general, health, science, sports, technology } = newsReducer;
  //==================================================================================================
  //2 - MAIN CODE BEGINS HERE
  useEffect(() => {
    getData();
  }, []);

  //==================================================================================================

  //3 - GET DATA
  async function getData() {
    setIsFetching(true);

    try {
      let data = await api.getHeadlines();
      dispatch(addHeadlines(data));
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }

  //==================================================================================================

  //4 - RENDER NEWS ITEM - A function that returns a function
  const renderItem = (
    size = 'small',
    horizontal = false,
    grid = false,
    wrapper = true,
  ) => {
    return ({ item, index }) => {
      let article = new Article(item, navigate);
      return (
        <PanelItem
          {...article}
          size={size}
          horizontal={horizontal}
          grid={grid}
          wrapper={wrapper}
        />
      );
    };
  };

  //==================================================================================================

  //5 - ON CTA PRESS
  const onCTAPress = category => navigate('Articles', { category });

  //==================================================================================================

  //6 - RENDER
  if (isFetching) return <ActivityIndicator style={{ paddingVertical: 8 }} />;
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16 }}>{`${error.message}`}</Text>
        <Text
          style={{ color: 'blue', fontSize: 16, padding: 8 }}
          onPress={getData}>
          Tap to retry
        </Text>
      </View>
    );
  }

  let renderDefaultItem = renderItem();
  let renderHorizontalItem = renderItem(null, true, false, true);

  let renderGridItem = renderItem('small', false, true, false);
  let renderHorizontalGridItem = renderItem(null, true, true, false);

  let renderSportItem = renderItem('large');
  let renderTechItem = renderItem('large', false, true);


  const flatListRenderItem = (item) => {
    console.log(item, "hhhhhhh", item.index, item.item.articles);
    const title = ["business", "entertainment", "general", "health", "science", "sports", "technology"]
    const renderFunction = () => {
      if (title[item.index] === "business") {
        return renderDefaultItem
      }
      if (title[item.index] === "entertainment") {
        return renderHorizontalItem
      }
      if (title[item.index] === "general") {
        return renderHorizontalItem
      }
      if (title[item.index] === "health") {
        return renderHorizontalGridItem
      }
      if (title[item.index] === "science") {
        return renderGridItem
      }
      if (title[item.index] === "sports") {
        return renderSportItem
      }
      if (title[item.index] === "technology") {
        return renderTechItem
      }
    }

    return (
      <>
        <Panel
          title={title[item.index]}
          data={item.item.articles.slice(0, 6)}
          renderItem={renderFunction()}
          onCTAPress={() => onCTAPress(title[item.index])}
        />
      </>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[business, entertainment, general, health, science, sports, technology]}
        renderItem={flatListRenderItem}
        keyExtractor={(item, index) => item + index}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;