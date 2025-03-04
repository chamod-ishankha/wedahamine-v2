import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useColorScheme } from "@/hooks/useColorScheme";
import Swiper from "react-native-swiper";
import { fetchProductCategories } from "../apis/Reference/ProductCategoryApis";
import { fetchProducts } from "../apis/Master/ProductApis";

const Home = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch product categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchProductCategories({});
      setCategories(response.result);
    };
    fetchCategories();
  }, []);


  const fetchProductList = async (page: number) => {
    if (loading || !hasMore) return; // Prevent duplicate calls
    setLoading(true);

    try {
      const response = await fetchProducts({ page, per_page: 5 });
      if (response.result?.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...response.result]);
      } else {
        setHasMore(false); // No more products to load
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products
  useEffect(() => {
    fetchProductList(page);
  }, [page]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached =
      layoutMeasurement.width + contentOffset.x >= contentSize.width - 20;

    if (isEndReached && !loading) {
      setPage((prevPage) => prevPage + 1); // Load next page
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Main Content Section */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Promotional Banner */}
        <View style={styles.bannerContainer}>
          <Swiper showsButtons={false} autoplay={true} height={180}>
            <View>
              <Image
                source={require("@/assets/app-images/home-banners/banner1.jpg")}
                style={styles.bannerImage}
              />
            </View>
            <View>
              <Image
                source={require("@/assets/app-images/home-banners/banner2.jpg")}
                style={styles.bannerImage}
              />
            </View>
            <View>
              <Image
                source={require("@/assets/app-images/home-banners/banner3.jpg")}
                style={styles.bannerImage}
              />
            </View>
          </Swiper>
          <Text style={[styles.bannerText, { color: colors.text }]}>
            Explore Ayurvedic Wellness
          </Text>
        </View>

        {/* Featured Products */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Featured Products
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd} // Detect scroll end
          >
            {products.map((product: any) => (
              <TouchableOpacity
                key={product.productId}
                style={[
                  styles.productCard,
                  { backgroundColor: colors.buttonBackground },
                ]}
              >
                <Image
                  source={require("@/assets/icons/item.png")}
                  style={styles.productImage}
                />
                <Text style={[styles.productTitle, { color: colors.text }]}>
                  {product.item}
                </Text>
              </TouchableOpacity>
            ))}
            {loading && <Text style={{ color: colors.text }}>Loading...</Text>}
          </ScrollView>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Categories
          </Text>
          <View style={styles.categoriesGridContainer}>
            {categories.map((category: any) => (
              <TouchableOpacity
                key={category.categoryId}
                style={[
                  styles.categoryCard,
                  { backgroundColor: colors.buttonBackground },
                ]}
              >
                <Text style={[styles.categoryText, { color: colors.text }]}>
                  {category.categoryName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  headerText: {
    fontFamily: Fonts.primary.title,
    fontSize: 24,
  },
  logoutButton: {
    padding: 8,
  },
  contentContainer: {
    padding: 16,
  },
  bannerContainer: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  bannerText: {
    fontFamily: Fonts.primary.body,
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: Fonts.secondary.title,
    fontSize: 20,
    marginBottom: 8,
  },
  productCard: {
    width: 120,
    marginRight: 12,
    borderRadius: 10,
    padding: 8,
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  productTitle: {
    marginTop: 8,
    fontFamily: Fonts.primary.body,
    fontSize: 14,
    textAlign: "center",
  },
  categoriesGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    marginBottom: 16,
    padding: 16,
    alignItems: "center",
    borderRadius: 10,
  },
  categoryText: {
    fontFamily: Fonts.secondary.body,
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
    borderTopWidth: 1,
  },
  footerText: {
    fontFamily: Fonts.primary.body,
    fontSize: 14,
  },
});
