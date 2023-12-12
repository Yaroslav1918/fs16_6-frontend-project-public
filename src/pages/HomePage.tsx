import CategoriesList from "../components/categoriesList";
import CategoryPictureList from "../components/categoryPicturesList";
import HeroSection from "../components/heroSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CategoryPictureList />
      <CategoriesList />
    </>
  );
};

export default HomePage;
