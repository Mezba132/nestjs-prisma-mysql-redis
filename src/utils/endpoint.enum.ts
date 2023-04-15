export enum EndpointName {
  CATEGORY_CREATE = 'category/create/new',
  CATEGORY_GET_ALL = 'category/get/all',
  CATEGORY_GET_BY_ID = 'category/get/:id',
  CATEGORY_UPDATE = 'category/update/:id',
  CATEGORY_DELETE = 'category/delete/:id',
  CATEGORY_DEACTIVATE = 'category/deactivate/:id',

  ATTRIBUTE_CREATE = 'attribute/create/new',
  ATTRIBUTE_GET_ALL = 'attribute/get/all',
  ATTRIBUTE_GET_BY_ID = 'attribute/get/:id',
  ATTRIBUTE_UPDATE = 'attribute/update/:id',
  ATTRIBUTE_DELETE = 'attribute/delete/:id',

  PRODUCT_CREATE = 'product/create/new',
  PRODUCT_GET_BY_SEARCH = 'product/get',
  PRODUCT_GET_ALL = 'product/get/all',
  PRODUCT_GET_BY_CATEGORY = 'product/get/:categoryId',
  PRODUCT_GET_BY_ID = 'product/get/:id',
  PRODUCT_UPDATE = 'product/update/:id',
  PRODUCT_DELETE = 'product/delete/:id',
}
