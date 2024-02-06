export const dict = {
  en: {
    pageHeader: "Products",
    newProductButton: "New Product",
  },

  ar: {
    pageHeader: "المنتجات",
    newProductButton: "منتج جديد",
  },
};

export const new_product_page_dict = {
  en: {
    pageHeader: "New Product",
    createButton: "Create",
    discardButton: "Discard",
    productInformation: {
      header: "Basic Information",
      description: "Section to config basic product information",
      productNameLabel: "Product Name",
      productDescriptionLabel: "Description",
    },

    productPricing: {
      header: "Pricing And Quanitity",
      description: "Section to config product sales information",
      priceLabel: "Price",
      salePriceLabel: "Sale Price",
      stockLabel: "Stock",
    },

    productOrganization: {
      header: "Organizations",
      description: "Section to config the product attributes",
      conditionLabel: "Condition",
      statusLabel: "Status",

      categoryLabel: "Category",
      categoryInputPlaceholder: "Type category name",
      categoryEmptyMessage: "No categories found",

      productAttributesLabel: "Product Attributes",
      newAttributeButton: "Add new attribute field",
      productAttributesLabelInputPlaceholder: "Enter attribute name",
      productAttributesValueInputPlaceholder:
        "Type attribute value then press Enter",
    },

    productImages: {
      header: "Product Images",
      description: "Add or change image for the product",
      imagesLabel: "Upload Product Images",
      thumbnailLabel: "Upload Product Thumbnail",
      thumbnailPreview: "Thumbnail Preview",
      imagesPreview: "Image Preview",
    },
  },

  ar: {
    pageHeader: "اضافة منتج جديد",
    createButton: "انشاء",
    discardButton: "الغاء",
    productInformation: {
      header: "المعلومات الاساسية",
      description: "قسم لتكوين معلومات المنتج الأساسية",
      productNameLabel: "اسم المنتج",
      productDescriptionLabel: "وصف المنتج",
    },

    productPricing: {
      header: "السعر والكميه",
      description: "قسم لتكوين معلومات المنتج للبيع",
      priceLabel: "السعر",
      salePriceLabel: "السعر المخفض",
      stockLabel: "الكميه",
    },

    productOrganization: {
      header: "التنظيمات",
      description: "قسم لتكوين السمات الأساسية للمنتج",
      conditionLabel: "النوع",
      statusLabel: "الحاله",

      categoryLabel: "التصنيف",
      categoryInputPlaceholder: "ادخل اسم التصنيف",
      categoryEmptyMessage: "لا يوجد تصنيفات موجوده",

      productAttributesLabel: "سمات المنتج",
      newAttributeButton: "اضافة حقل سمة جديد",
      productAttributesLabelInputPlaceholder: "اكتب اسم السمة",
      productAttributesValueInputPlaceholder:
        "اكتب قيمة السمة ثم اضغط على Enter",
    },

    productImages: {
      header: "صور المنتج",
      description: "اضافة او تغيير صورة للمنتج",
      imagesLabel: "رفع صور المنتج",
      thumbnailLabel: "رفع صورة الاساسية للمنتج",
      thumbnailPreview: "معاينة الصورة الاساسية",
      imagesPreview: "معاينة الصورة",
    },
  },
};

export const edit_product_page_dict = {
  en: {
    ...new_product_page_dict.en,
    pageHeader: "Edit Product",
    editButton: "Update",
  },
  ar: {
    ...new_product_page_dict.ar,
    pageHeader: "تعديل المنتج",
    editButton: "تحديث",
  },
};

export const delete_product_modal_dict = {
  en: {
    header: "Delete Product",
    description:
      "Are you sure you want to delete this product?, this action cannot be undone",
    submitButton: "Delete",
    cancelButton: "Cancel",
  },
  ar: {
    header: "حذف المنتج",
    description:
      "هل انت متاكد من حذف هذا المنتج؟، هذا الأمر لا يمكن التراجع عنه",
    submitButton: "حذف",
    cancelButton: "الغاء",
  },
};
