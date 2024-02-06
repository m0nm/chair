export const dict = {
  en: {
    pageHeader: "Categories",
  },
  ar: {
    pageHeader: "التصنيفات",
  },
};

export const create_category_modal_dict = {
  en: {
    triggerButton: "Create Category",
    header: "Create New Category",
    inputLabel: "Name",
    inputPleaceholder: "Enter category name...",
    submitButton: "Create",
    cancelButton: "Cancel",
  },

  ar: {
    triggerButton: "إنشاء تصنيف",
    header: "إنشاء تصنيف جديد",
    inputLabel: "الاسم",
    inputPleaceholder: "ادخل اسم التصنيف...",
    submitButton: "إنشاء",
    cancelButton: "الغاء",
  },
};

export const edit_category_modal_dict = {
  en: {
    ...create_category_modal_dict.en,
    header: "Edit Category",
    submitButton: "Save",
  },

  ar: {
    ...create_category_modal_dict.ar,
    header: "تعديل التصنيف",
    submitButton: "حفظ",
  },
};

export const delete_category_modal_dict = {
  en: {
    ...create_category_modal_dict.en,
    header: "Delete Category",
    description:
      "Are you sure you want to delete this category?, This action cannot be undone.",
    submitButton: "Delete",
  },
  ar: {
    ...create_category_modal_dict.ar,
    header: "حذف التصنيف",
    description:
      "هل أنت متاكد من حذف هذا التصنيف؟ ، هذا الأمر لا يمكن التراجع عنه.",
    submitButton: "حذف",
  },
};
