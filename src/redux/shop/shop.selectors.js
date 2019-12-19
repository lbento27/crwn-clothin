import { createSelector } from "reselect";
//old when using shop data as array
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// };

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);
//because of the shop data modification now our collection overview and other component think it still is an array so we need to convert it
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  );

//selector when shopData was an array, the problem of using data as array is that using find() on big arrays will take to long not good for performance so its better to use an object see hash tables
// export const selectCollection = collectionUrlParam =>
//   createSelector([selectCollections], collections =>
//     collections.find(
//       collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   );
